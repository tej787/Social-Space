const User = require('./../Models/userModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError(
                'This route is not for password updates. Please use /updateMyPassword.',
                400
            )
        );
    }

    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email', 'firstname', 'lastname', 'profilePicture', 'coverPicture', 'about', 'livesin', 'worksAt', 'relationship' ,'country');
    // if (req.file) filteredBody.photo = req.file.filename;

    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    });

    if (!updatedUser) {
        return next(
          new AppError(
            'The user Id does not exist',
            401
          )
        );
      }

    res.status(200).json({
        status: 'success',
        user: updatedUser
        
    });
});

exports.deactivateMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });
  
    res.status(204).json({
      status: 'success',
      data: null
    });
  });

exports.followUser = catchAsync(async (req, res,next) => {
    const id = req.params.id;
    const userID  = req.user.id;
    // console.log('Which Curent user want to follow '+id, 'Current User'+userID)
    if (userID == id) {
        return next(
        new AppError(
            'Action Forbidden',
            403
        ));
    }
    const followUser = await User.findById(id);
    const followingUser = await User.findById(userID);

    if (!followUser) {
        return next(
          new AppError(
            'The user Id does not exist',
            401
          )
        );
      }

    if (!followUser.followers.includes(userID)) {
        await followUser.updateOne({ $push: { followers: userID } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json({
            status: 'success',
            message:"User followed!"
        });
        
        
    } else {
        res.status(403).json({
            status: 'fail',
            message:"You are already following this id !!"
        });
        
    }


});

// Unfollow a User
// changed
exports.unfollowUser = catchAsync(async (req, res,next) => {
    const id = req.params.id;
    const userID  = req.user.id;
    // console.log('Which Curent user want to Unfollow '+id, 'Current User'+userID)

    if (userID === id) {
        return next(
        new AppError(
            'Action Forbidden',
            403
        ));
    }
    
            const unFollowUser = await User.findById(id)
            const unFollowingUser = await User.findById(userID)

            if (!unFollowUser) {
                return next(
                  new AppError(
                    'The user Id does not exist',
                    401
                  )
                );
              }

            if (unFollowUser.followers.includes(userID)) {
                await unFollowUser.updateOne({ $pull: { followers: userID } })
                await unFollowingUser.updateOne({ $pull: { following: id } })
                res.status(200).json({
                    status: 'success',
                    message:"Unfollowed Successfully!"
                });
            }
            else {
                res.status(403).json({
                    status: 'fail',
                    message:"You are not following this User!"
                });
            }
        
});

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);
exports.deleteUser = factory.deleteOne(User);
exports.updateUser = factory.updateOne(User);