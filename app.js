var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var appConf = require('./src/config');
var routes = require('./routes/index');
var users = require('./routes/users');
var tags = require('./routes/tags');

var config = appConf.path(path.join(__dirname, './config/config_app.json'));
var dbConfig = appConf.path(path.join(__dirname, './config/config_redis.json'));
var app = express();

var theme = config.getItem('theme');
var staticDir = path.join(__dirname, 'themes', theme);

// view engine setup
app.set('views', path.join(staticDir, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(staticDir, 'static')));
app.use(session({
    store: new RedisStore({
        host: dbConfig.getItem('address'),
        port: dbConfig.getItem('port'),
        pass: dbConfig.getItem('password')
    }),
    secret: config.getItem('secret'),
    resave: false,
    cookie: {maxAge: 3600 * 24 * 30},
    saveUninitialized: true
}));

app.use(function (req, res, next) {
    if (!res.returnJson) {
        res.returnJson = function (val) {
            res.json(Object.assign({}, {
                errno: 0
            }, val));
        };
    }
    next();
});


app.use('/', routes);
app.use('/users', users);
app.use('/tags', tags);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
