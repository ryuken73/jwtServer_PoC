var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var publicRouter = require('./routes/public');
var privateRouter = require('./routes/private');
var decodeTokenRouter = require('./routes/decodeToken');
var refreshTokenRouter = require('./routes/refreshToken');
var validateRefreshToken = require('./routes/validateRefreshToken');

var app = express();

app.locals.ACCESS_JWT_EXPIRE_SECONDS = 60;
app.locals.REFRESH_JWT_EXPIRE_SECONDS = 60 * 60;
app.locals.SECRET = 'WISE';
app.locals.REDIRECT_LOGIN_URL = '/pages/login';
app.locals.STATIC_FILE_PATH_PREFIX = '/static/';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const checkToken = require('./middleware/checkToken');
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/public', publicRouter);
app.use('/private', checkToken, privateRouter);
app.use('/private-auth-req', checkToken, privateRouter);
app.use('/decodeToken', decodeTokenRouter);
app.use('/refreshToken', refreshTokenRouter);
app.use('/validateRefreshToken', validateRefreshToken);

app.use('/*', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/index.html'));
})
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
