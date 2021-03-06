var fs          = require('fs')
  , http        = require('http')
  , dispatch    = require('dispatch')
  , concat      = require('concat-stream')
  , JSONStream  = require('JSONStream')
  , styles      = require('./styles')
  , db          = require('./db')
  , clientJS    = require('./client-js')
  , concussions = require('./concussions.js')
  , express     = require('express')
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

app.get('/app.css', function(req, res) {
  res.setHeader('Content-Type', 'text/css');
  styles().pipe(res);
});

app.get('/concussions', function(req, res){
  res.setHeader('Content-Type', 'text/html');
  var week = req.query.week;
  var season = req.query.season;
  concussions.index(week,season).pipe(JSONStream.stringify()).pipe(res);
});

app.get('/concussions/:filter', function(req, res){
  res.setHeader('Content-Type', 'text/json');
  var weekStart = req.query.weekStart;
  var weekEnd = req.query.weekEnd;
  var seasonStart = req.query.seasonStart;
  var seasonEnd = req.query.seasonEnd;
  var filter = req.params.filter
  if (filter == 'number'){
    filter = 'uniform_number'
  }
  concussions.getBy(filter,weekStart, weekEnd, seasonStart, seasonEnd).pipe(JSONStream.stringify()).pipe(res);
});

app.get('/*.jpg', function(req,res) {
  var filename = req.params[0];
  res.sendfile('images/' + filename + '.jpg');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});


var port   = process.env.PORT || 4000
var start  = function() {
  app.listen(port, function() {
    console.log("app running on port: " + port)
  })
}

start();
