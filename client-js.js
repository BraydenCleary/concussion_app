//Compiles JS for browser

var fs = require('fs')
  , combinedStream = require('combined-stream')

var compile = module.exports = function() {
  var cs = combinedStream.create()
  jsFiles.forEach(function(path) { cs.append(fs.createReadStream(path)) })
  return cs
}

var jsFiles  = [
  'angular.min.js',
  './node_modules/underscore/underscore.js',
  'concussion_data.js',
  'concussion_service.js',
  'feed.js'
]
