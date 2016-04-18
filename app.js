var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var linecheck = require('./routes/linecheck');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);
app.use('/linecheck', linecheck);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(
    {
        errorCode: err.status,
        errorMessage: err.message
     }
  ));
});

/*app.listen(3000, function (err) {
      if (err) {
         console.log(err);
      } else {
         console.log("App started at port 3000");
      }
});*/

module.exports = app;
