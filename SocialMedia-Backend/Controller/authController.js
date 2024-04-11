
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const crypto = require('crypto');
const User = require('./../Models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Email = require('./../utils/email');


const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  };

  const createSendToken = (user, statusCode, req, res) => {
    
    const token = signToken(user._id);
  
    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: false,
      secure: false,
      sameSite: 'none'
    });

    
  
    // Remove password from output
    user.password = undefined;
  
    
    res.status(statusCode).json({
      status: 'success',
      token,
      user
      

    });
  };


  exports.signup = catchAsync(async (req, res, next) => {
    const { username, password, email, passwordConfirm,firstname, lastname } = req.body;
    
    const newUser = await User.create({
        username,
        email,
        password,
        passwordConfirm,
        firstname,
        lastname
    });
  
    const url = `https://social-space-atyt.onrender.com/profile/${newUser._id}`;
  
    
    //try to implement it later
    await new Email(newUser, url).sendWelcome();
  
    createSendToken(newUser, 201, req, res);
  });


  exports.login = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;
  
    // 1) Check if username and password exist
    if (!username || !password) {
      return next(new AppError('Please provide usernamel and password!', 400));
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ username }).select('+password');
  
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect Username or password', 401));
    }
  
    // 3) If everything ok, send token to client
    createSendToken(user, 200, req, res);
  });


  exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });
    res.status(200).json({ status: 'success' });
  };
  
  exports.protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check of it's there
    console.log(req.cookies)
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
  
    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }
  
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }
  
    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError('User recently changed password! Please log in again.', 401)
      );
    }
  
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  });
  
  // Only for rendered pages, no errors!
  exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.jwt) {
      try {
        // 1) verify token
        const decoded = await promisify(jwt.verify)(
          req.cookies.jwt,
          process.env.JWT_SECRET
        );
  
        // 2) Check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
          return next();
        }
  
        // 3) Check if user changed password after the token was issued
        if (currentUser.changedPasswordAfter(decoded.iat)) {
          return next();
        }
  
        // THERE IS A LOGGED IN USER
        res.locals.user = currentUser;
        return next();
      } catch (err) {
        return next();
      }
    }
    next();
  };
  
  exports.restrictTo = () => {
    return (req, res, next) => {
      console.log(req.user)
      if (!req.user.isAdmin) {
        return next(
          new AppError('You do not have permission to perform this action', 403)
        );
      }
  
      next();
    };
  };
  
  exports.forgotPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on POSTed email
    req.isActiveAccountRoute = true;
  
    const user = await User.findOne({ email: req.body.email }).setOptions({ isActiveAccountRoute: req.isActiveAccountRoute });
  
  
   
    if (!user) {
      return next(new AppError('There is no user with email address.', 404));
    }
  
    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
  
    // 3) Send it to user's email
    try {
      const resetURL = `http://localhost:/resetPassword/${resetToken}`;
      await new Email(user, resetURL).sendPasswordReset();
  
      res.status(200).json({
        status: 'success',
        message: 'Token sent to email!'
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
  
      return next(
        new AppError('There was an error sending the email. Try again later!'),
        500
      );
    }
  });
  
  exports.resetPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on the token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');
    
    req.isActiveAccountRoute = true;
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    }).setOptions({ isActiveAccountRoute: req.isActiveAccountRoute });
  
    
    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
      return next(new AppError('Token is invalid or has expired', 400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.active= true;
    await user.save();
  
    // 3) Update changedPasswordAt property for the user
    // 4) Log the user in, send JWT
    
    createSendToken(user, 200, req, res);
  });
  
  exports.updatePassword = catchAsync(async (req, res, next) => {
    // 1) Get user from collection
   
    if (!req.body.passwordCurrent || !req.body.password || !req.body.passwordConfirm) {
      return next(new AppError(' Please enter passwordCurrent , password & passwordConfirm', 403));
    }
    const user = await User.findById(req.user.id).select('+password');
  
    // 2) Check if POSTed current password is correct
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
      return next(new AppError('Your current password is wrong.', 403));
    }
  
    // 3) If so, update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    // User.findByIdAndUpdate will NOT work as intended!
  
    // 4) Log user in, send JWT
    createSendToken(user, 200, req, res);
  });