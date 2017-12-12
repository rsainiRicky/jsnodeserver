var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();
var appLogger = require('./utilities/appLogger');
var models = require('./models');
var config = require('./utilities/configurations');

//Include Route Files
var users = require('./routes/apis/users');
var logOption = config.get('log:logOption');


console.log('Logger :', logOption);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,authorization');
  res.header('Access-Control-Expose-Headers', 'authorization');
  // Use appLogger at all relevant points - Do not log Passwords.
  appLogger.logger[logOption.toString()]('Incoming Request : ', req.method, ' | ', req.url, ' | ', req.headers);
  next();
});

app.use('/api/users', users);

// catch 404 and forward to error handler
app.use(function(req, res) {
  appLogger.logger[logOption.toString()]('Invalid Request : ', req.method, ' | ', req.url, ' | ', req.headers);
  res.sendStatus(404);
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  appLogger.logger[logOption.toString()]('WTF, I dont know how I reached here :( ', req.method, ' | ', req.url, ' | ', req.headers);
});

app.use('/api', router);
models.sequelize.sync().then(function() {
  app.listen(config.get('http:_appPort'), () =>
  console.log('Application Started - Listening on port', config.get('http:_appPort'), '!'));
  appLogger.logger[logOption.toString()]('Application Started - Listening on port', config.get('http:_appPort'), '!');
}).
catch(function(err) {
  console.log('****** Database Error - Please Check Connection ******  : ', err);
  appLogger.logger[logOption.toString()]('****** Database Error - Please Check Connection ******  : ', err);
});
