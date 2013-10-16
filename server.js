var fs          = require('fs')
  , http        = require('http')
  , dispatch    = require('dispatch')
  , concat      = require('concat-stream')
  , JSONStream  = require('JSONStream')
  , db          = require('./db')
  , clientJS    = require('./client-js')
  , concussions = require('./concussions.js')
  , express     = require('express')
  , wach        = require('wach')
  , __          = require('underscore')

var app = express();


//Global error handling
process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});

app.use(app.router);

//request error handling
app.use(function(err, req, res, next) {
  if(!err) return next();
  console.log(err);
  res.send(err);
});

app.get('/', function(req, res){
  res.setHeader('Content-Type', 'text/html');
  var template = 'home.html';
  fs.createReadStream(template).pipe(res);
});

app.get('/app.js', function(req, res){
  res.setHeader('Content-Type', 'text/javascript');
  clientJS().pipe(res);
});

app.get('/concussions', function(req, res){
  res.setHeader('Content-Type', 'text/html');
  var week = req.query.week;
  var season = req.query.season;
  concussions.index(week,season).pipe(JSONStream.stringify()).pipe(res);
});

app.get('/concussions/:filter', function(req, res){
  res.setHeader('Content-Type', 'text/json');
  var week = req.query.week;
  var season = req.query.season;
  var filter = req.params.filter
  console.log(filter)
  concussions.getBy(filter,week,season).pipe(JSONStream.stringify()).pipe(res);
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});


var port   = 4000
var start  = function() {
  app.listen(port, function() {
    console.log("app running on port: " + port)
  })
}

start();
