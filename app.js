const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const initGlobal = require('./global');
const mongodb = require('./core/mongodb');
const initModel = require('./models/index');
const initRouter = require('./routes/index');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 初始化全局变量
initGlobal();

// 初始化数据库 mongodb
mongodb.connect();

// 初始化 model
initModel();

// 初始化路由 route
initRouter(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  LOG.error(`[出参]-[${UTIL.getTimeString()}]-[${req.method}]-[${req.url}]: 404 not found`);
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  LOG.error(`[出参]-[${UTIL.getTimeString()}]-[${req.method}]-[${req.url}]: ${err}`);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;