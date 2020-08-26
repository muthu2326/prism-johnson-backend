var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const log = require('./utils/logger').get();
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

app.use(function(req, res, next) {
    var allowedOrigins = ['https://192.168.0.38:3000', 'http://192.168.43.37:4200', 'http://localhost:4200'];
    var origin = req.headers.origin;
    origin = "*";
    // Commented temporarily for any frotend with IP address can point to remote backend
    //if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    //}
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, Accept,Content-Length, X-Requested-With, X-PINGOTHER');
    res.header('Access-Control-Expose-Headers', 'Content-Range');
    
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});

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
