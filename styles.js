var fs = require('fs')
  , combinedStream = require('combined-stream')

var allStyles = module.exports = function() {
  var cs = combinedStream.create()
  cssFiles.forEach(function(path) { cs.append(stylesFor(path)) })
  return cs
}

var stylesFor = function(path) {
  return fs.createReadStream(path)
}

var cssFiles = [ 'normalize.css','foundation.min.css', 'main.css', 'foundation_overrides.css', 'jquery.nouislider.min.css'  ]
