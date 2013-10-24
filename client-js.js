//Compiles JS for browser

var fs = require('fs')
  , combinedStream = require('combined-stream')

var compile = module.exports = function() {
  var cs = combinedStream.create()
  jsFiles.forEach(function(path) { cs.append(fs.createReadStream(path)) })
  return cs
}

var jsFiles  = [
  'jquery.min.js',
  'angular.min.js',
  'd3.min.js',
  'jquery.nouislider.min.js',
  './node_modules/underscore/underscore.js',
  'concussion_data.js',
  'concussion_service.js',
  'graph_controller.js',
  'draw_graph.js',
  'filter_data.js',
  'week_slider.js'
]
