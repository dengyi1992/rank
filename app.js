var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
var routes = require('./routes/index');
var users = require('./routes/users');
var request = require('request');

var times = [];
rule.second = times;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
rule.hour = times;
times.push(0);
var optionsDay = {
    method: 'GET',
    encoding: null,
    url: 'http://120.27.94.166/ranknew/index.php/Home/CrawlerInfo/crawlerDayInfo'
};
var optionsMonth = {
    method: 'GET',
    encoding: null,
    url: 'http://120.27.94.166/ranknew/index.php/Home/CrawlerInfo/crawlerDayInfo'
};
var optionsMain = {
    method: 'GET',
    encoding: null,
    url: 'http://120.27.94.166/ranknew/index.php/Home/CrawlerInfo/mainInfo'
};
schedule.scheduleJob(rule, function () {
    console.log("----------------------------------");
    request(optionsDay, function (error, response, body) {
            if (error) {
                return console.log(error)
            }
        }
    );
    request(optionsMonth, function (error, response, body) {
            if (error) {
                return console.log(error)
            }
        }
    )
    request(optionsMain, function (error, response, body) {
            if (error) {
                return console.log(error)
            }
        }
    );
});

module.exports = app;
