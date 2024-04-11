const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const app = express();

const AppError = require('./utils/appError');
const globalErrorHandler = require('./Controller/errorController');
const authRouter = require('./Routes/authRoutes');
const userRouter = require('./Routes/userRoutes');
const postRouter = require('./Routes/postRoutes');
const chatRouter = require('./Routes/chatRoutes');
const messageRouter = require('./Routes//messageRoutes');


const uploadPostImagRouter = require('./Routes/uploadPostImage');
const uploadUserImagRouter = require('./Routes/uploadUsersImage');




app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
// Middleware
app.use(express.static('public'))
app.use('/images', express.static("images"))


var allowedOrigins = [process.env.FrontEndURL, 'http://localhost:3000'];

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));



// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Limit requests from same API
// const limiter = rateLimit({
//     max: 100,
//     windowMs: 60 * 60 * 1000,
//     message: 'Too many requests from this IP, please try again in an hour!'
//   });
//   app.use('/api', limiter);
  
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    
  }
// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

app.use(compression());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

// Routes

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);

app.use('/api/uploadPostImage', uploadPostImagRouter);
app.use('/api/uploadUserImage', uploadUserImagRouter);



app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);


module.exports = app;