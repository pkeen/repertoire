const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');

// Run db seed
require('./database-helpers/seedExerciseData');

require('dotenv').config();

require('./config/database');

require('./config/passport');

// Routers
const indexRouter = require('./routes/index');
const workoutsRouter = require('./routes/workouts');
const woExerciseRouter = require('./routes/woExercise');
const setsRouter = require('./routes/sets');
const exerciseDataRouter = require('./routes/exerciseData');
const usersRouter = require('./routes/users');
const preferencesRouter = require('./routes/preferences')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Add this middleware BELOW passport middleware
app.use(function (req, res, next) {
	res.locals.user = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/workouts', workoutsRouter);
app.use('/', woExerciseRouter);
app.use('/', setsRouter);
app.use('/exerciseData', exerciseDataRouter);
app.use('/users', usersRouter);
app.use('/', preferencesRouter);

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

module.exports = app;
