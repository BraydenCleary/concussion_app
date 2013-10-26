//Compiles JS for browser

var fs = require('fs')
  , combinedStream = require('combined-stream')

var compile = module.exports = function() {
  var cs = combinedStream.create()
  jsFiles.forEach(function(path) { cs.append(fs.createReadStream(path)) })
  return cs
}

var jsFiles  = [
  'javascripts/third-party/jquery.min.js',
  'javascripts/third-party/angular.min.js',
  'javascripts/third-party/d3.min.js',
  'javascripts/third-party/jquery.nouislider.min.js',
  './node_modules/underscore/underscore.js',
  'javascripts/modules/concussion_data.js',
  'javascripts/services/concussion_service.js',
  'javascripts/controllers/graph_controller.js',
  'javascripts/directives/draw_graph.js',
  'javascripts/directives/filter_data.js',
  'javascripts/directives/slider.js',
  'javascripts/directives/week_slider.js',
  'javascripts/directives/season_slider.js'
]
