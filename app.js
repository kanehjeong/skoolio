var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars')

var pg = require('pg');
var connectionString = process.env.DATABASE_URL;

/*pg.connect(connectionString, function(err, client) {

  if(err) {
    return console.error('Error fetching client from pool. Failed to connect with DB');
  }
    
  var query = client.query('SELECT * FROM Users');
});*/

// setup postgres
/*var pg = require('pg').native
  , connectionString = process.env.DATABASE_URL || 
        'postgres://nclwslgpysdhkd:-Q3QPebtF6youIEwDf1TEfGBig@ec2-23-21-235-249.compute-1.amazonaws.com:5432/d6ihltg24bu9n2'
  , client
  , query;

client = new pg.Client(connectionString);
client.connect();
query = client.query('SELECT * FROM Users');
query.on('end', function() { client.end(); });*/


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

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
