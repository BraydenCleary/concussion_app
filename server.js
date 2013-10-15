var fs          = require('fs')
  , http        = require('http')
  , connect     = require('connect')
  , app         = connect()
  , dispatch    = require('dispatch')
  , concat      = require('concat-stream')
  , JSONStream  = require('JSONStream')
  , db          = require('./db')
  , clientJS    = require('./client-js')
  , concussions = require('./nfl_data.js')

app.use(connect.bodyParser())

var routes = {}

routes[ 'GET /' ] = function(req, res) {
  res.setHeader('Content-Type', 'text/html')
  var template = 'home.html'
  fs.createReadStream(template).pipe(res)
}

routes[ 'GET /app.js' ] = function(req, res) {
  res.setHeader('Content-Type', 'text/javascript')
  clientJS().pipe(res)
}

routes[ 'GET /concussions'] = function(req, res) {
  res.setHeader('Content-Type', 'text/html')
  db.readQuery('select * from concussions;').pipe(JSONStream.stringify()).pipe(res)
}

app.use(dispatch(routes))

var port   = 4000
var server = http.createServer(app)
var start  = function() {
  server.listen(port, function() {
    console.log("app running on port: " + port)
  })
}

start();
