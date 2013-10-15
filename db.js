var pg = require('pg')
  , conString = "postgres://braydencleary@localhost/concussion_tracker"
  , ReadableStream = require('stream').Readable
  , WritableStream = require('stream').Writable

module.exports = db = {}

db.url = "postgres://braydencleary@localhost/concussion_tracker"

db.readQuery = function(query) {
  var rs = new ReadableStream({objectMode:true})
  rs._read = function(){}

  pg.connect(this.url, function(err, client, done){
    if (err) { rs.emit('error', err) ; return }

    client.query(query)
      .on('error', function(err) { rs.emit('error', err) })
      .on('row', function(row) { rs.push(row) })
      .on('end', function(row) { rs.push(null) })
      .on('end', done)
  })

  return rs
}

db.writeQuery = function(cb) {
  var ws = new WritableStream()
  ws._write = function(buf, encoding, done){
    pg.connect(this.url, function(err, client, connectDone){
      if (err) { ws.emit('error', err) ; return }

      client.query(buf.toString())
        .on('error', function(err) { ws.emit('error', err) })
        .on('end',   function() { done() })
        .on('end',   function() { connectDone() })
    })
  }.bind(this)

  ws.on('finish', cb)
  return ws
}

db.logIt = function(resultOrErr) { console.log(resultOrErr) }

// var runTests = !module.parent

// if (runTests) {

//   var JSONStream = require('JSONStream')
//   db.readQuery('select * from concussions').pipe(JSONStream.stringify()).pipe(process.stdout)

// }
