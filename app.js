var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var venkatrouter = require('./routes/venkat');
require('dotenv').config();
const mongoose = require('mongoose');
const registeration = require('./routes/registerusers');
const login = require('./routes/login');
const forgotPasswordRouter = require('./routes/forgotPassword');
const resetPasswordRouter = require('./routes/resetPassword');
const wishlistRoutes = require('./routes/wishlist');
const cors = require('cors'); // ✅ Require CORS
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/venkat', venkatrouter);
app.use('/register', registeration);
app.use('/login', login);
app.use('/forgot-password', forgotPasswordRouter);
app.use('/reset-password', resetPasswordRouter);
app.use('/wishlist', wishlistRoutes);
app.use('/api/seed', require('./routes/itemsSeed'));
app.use(cors({
  origin: 'http://localhost:5173/',// 👈 Allow this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true  
})); // ✅ Enable CORS

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ Error connecting to MongoDB:', err));


module.exports = app;

