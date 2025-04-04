var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var pool = require('./routes/pool')
pool()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var companyRouter = require('./routes/companys')
var categoryRouter = require('./routes/category')
var couponRouter = require('./routes/coupon')
var subcategoryRouter = require("./routes/subCategory")
var adminloginRouter = require("./routes/adminlogin")
var slideRouter = require("./routes/slides")
var bankRouter = require("./routes/bank")
var walletRouter = require("./routes/wallet")
var userInterfaceRouter = require("./routes/userinterface")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/company', companyRouter);
app.use('/category', categoryRouter);
app.use('/coupon', couponRouter);
app.use('/subcategory', subcategoryRouter);
app.use("/adminlogin", adminloginRouter);
app.use("/slide",slideRouter)
app.use("/bank",bankRouter)
app.use("/wallet",walletRouter)
app.use("/userinterface",userInterfaceRouter)

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
