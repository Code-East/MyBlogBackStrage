var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var backRouter = require('./routes/back');
var classRouter = require('./routes/classify');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 可跨域获取数据中间件
app.use((req, res, next) => {
    // 设置允许不同源，也就是域名不同，也可以请求数据
    res.append('Access-Control-Allow-Origin', '*');
    // 设置允许所有类型的请求都可以获取数据
    res.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
    next()
})
app.use((req, res, next) => {
    res.cookie('app', 'lxd');
    next();
})
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/back', backRouter);
app.use('/classify', classRouter);

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