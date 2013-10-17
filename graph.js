concussionData.directive('graph', ['$http', function($http){

  return{
    restrict: 'C',
    replace: true,
    controller:['$scope', '$http', function($scope, $http){
      $scope.$watch('[filter, week, season]', function(newVal, oldVal){
        var filter = newVal[0];
        var week = newVal[1];
        var season = newVal[2];
        $http({
          url: '/concussions/' + filter,
          method: 'GET',
          params: {
            week: week,
            season: season
          }
        }).success(function(data, status, headers, config){
          $('.chart').remove();
          var chart = d3.select(".data-graph").append("svg")
            .attr("class", "chart")
            .attr("width", 420)
            .attr("height", 20 * data.length);

          var maxCount = _.map(data, function(data){return data.count})

          var x = d3.scale.linear()
            .domain([0, d3.max(maxCount)])
            .range([0, 420]);

          var y = d3.scale.ordinal()
            .domain(data)
            .rangeBands([0, data.length * 20]);

          chart.selectAll("rect")
              .data(data)
            .enter().append("rect")
              .attr("y", function(d, i) { return i * 20; })
              .attr("x", 210)
              .attr("width", function(d){ return d.count * 2})
              .attr("height", 20)

          chart.selectAll("text")
              .data(data)
            .enter().append("text")
              .attr("x", 150)
              .attr("y", function(d, i) {
                return i * 20;
              })
              .attr("dy", 15) // vertical-align: middle
              .attr("text-anchor", "end") // text-align: right
              .text(function(d){return d.filter})
        });
      }, true);
    }],
    link: function(scope, el, attrs){
    }
  }
}]);


