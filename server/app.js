var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bootable = require('bootable');
var debug = require('debug')('nodejs-github:server');
var http = require('http');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = bootable(express());

//app.configure 是以前的版本遗留下来的，完全可以用条件判断语法取代。

/*
  app.configure(function() {
    app.set('title', 'My Application');
  });
  和
  app.set('title', 'My Application');
  是等价的，都是对所有环境有效。而

  app.configure('development', function(){
    app.set('db uri', 'localhost/dev');
  })
  和
  if ('development' == app.get('env')) {
    app.set('db uri', 'localhost/dev');
  }
  是一个效果。
*/

// 设置views路径和模板
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/*
__dirname是node.js里面的全局变量，即取得执行的js所在的路径，另外__dirname是目前执行的js文件名。
所以，app.set(‘views’, __dirname + ‘/views’);是设置views的文件夹。 
而app.set(‘view engine’, ‘jade’);是设置express.js所使用的render engine。
除了Jade之外express.js还支持EJS(embedded JavaScript)、Haml、CoffeScript和jQuerytemplate等js模板
*/

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/user', usersRouter);

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

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


/**
 * Listen on provided port, on all network interfaces.
 */

app.boot(function (err) {
  if (err) { throw err; }
  app.listen(port);
  app.on('error', onError);
  app.on('listening', onListening);
});



module.exports = app;