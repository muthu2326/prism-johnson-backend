var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const log = require('./utils/logger').get();
const nodemailer = require("nodemailer");
var allowlist = ['http://localhost:3000', 'http://prism-johnson.digiapt.com']

// var indexRouter = require('./routes-old/index');
// var authRouter = require('./routes-old/auth');
// var usersRouter = require('./routes-old/users');
// var pagesRouter = require('./routes-old/pages');
// var constructionTipsRouter = require('./routes-old/construction_tips');
// var dealersRouter = require('./routes-old/dealers');
// var articlesRouter = require('./routes-old/articles');
// var productsRouter = require('./routes-old/products');
// var ordersRouter = require('./routes-old/orders');
// var enquiriesRouter = require('./routes-old/enquiries');
// var mediaAssetRouter = require('./routes-old/media_asset');

var contentRouter = require('./routes/content.server.routes')
var userRouter = require('./routes/user.server.routes')
var dealersRouter = require('./routes/dealer.server.routes')
var bannerRouter = require('./routes/banner.server.routes')
var articlesRouter = require('./routes/articles.server.routes')
var authRouter = require('./routes/auth.server.routes')
var queryRouter = require('./routes/queries.server.routes')
var stateRouter = require('./routes/state.server.routes')
var cityRouter = require('./routes/city.server.routes')
var productRouter = require('./routes/product.server.routes')
var orderRouter = require('./routes/orders.server.routes')
var testimonialRouter = require('./routes/testimonial.server.routes')
var credentialsRouter = require('./routes/credentials.server.routes')

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
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('X-Total-Count', 5000);
    
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

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/auth', authRouter);
// app.use('/pages', pagesRouter);
// app.use('/construction-tips', constructionTipsRouter);
// app.use('/dealers', dealersRouter);
// app.use('/articles', articlesRouter);
// app.use('/products', productsRouter);
// app.use('/orders', ordersRouter);
// app.use('/enquiries', enquiriesRouter);
// app.use('/media-assets', mediaAssetRouter);

app.use('/api/v1/pages', contentRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/content', bannerRouter);
app.use('/api/v1/dealers', dealersRouter);
app.use('/api/v1/articles', articlesRouter);
app.use('/api/v1/queries', queryRouter);
app.use('/api/v1/state', stateRouter);
app.use('/api/v1/city', cityRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/testimonials', testimonialRouter);
app.use('/api/v1/credentials', credentialsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  if(err) {
    log.error(`\n\nError in API request, below is the details of error \n`);
    log.error(err);
  }
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
