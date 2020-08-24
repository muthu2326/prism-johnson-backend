var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const log = require('./utils/logger').get();
var cors = require('cors')
var allowlist = ['http://localhost:3000', 'http://prism-johnson.digiapt.com']

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pagesRouter = require('./routes/pages');
var constructionTipsRouter = require('./routes/construction_tips');
var dealersRouter = require('./routes/dealers');

var config = require('config');
var app = express();

log.trace("trace");
log.debug("debug");
log.info("info");

// Enable All CORS Requests
app.use(cors());

// TODO:: for production launch
/**
  Remove "app.use(cors())"
  Permit only for allowed origins
  Refer: https://expressjs.com/en/resources/middleware/cors.html
 */

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
app.use('/pages', pagesRouter);
app.use('/construction-tips', constructionTipsRouter);
app.use('/dealers', dealersRouter);

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
