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

var cssFiles = [ 'stylesheets/third-party/normalize.css','stylesheets/third-party/foundation.min.css', 'stylesheets/main.css', 'stylesheets/foundation_overrides.css', 'stylesheets/third-party/jquery.nouislider.min.css', 'stylesheets/noui_overrides.css'  ]
