concussionData.directive("weekSlider", ['concussionService', '$timeout', function(concussionService, $timeout){
  return {
    restrict: 'C',
    controller: ['$scope', function($scope){
      $('.week-slider').on('change', function(){
        $scope.weekStart = Math.floor($('.week-slider').val()[0]);
        $scope.weekEnd = Math.floor($('.week-slider').val()[1]);
        $scope.fetchNewData($scope);
      })
    }],
    link: function(scope, el, attrs){
    }
  }
}]);
