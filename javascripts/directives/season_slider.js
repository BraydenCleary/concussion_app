concussionData.directive("seasonSlider", ['concussionService', function(concussionService){
  return {
    restrict: 'C',
    controller: ['$scope', function($scope){
      $('.season-slider').on('change', function(){
        $scope.seasonStart = Math.floor($('.season-slider').val()[0]);
        $scope.seasonEnd = Math.floor($('.season-slider').val()[1]);
        $scope.fetchNewData($scope);
      })
    }],
    link: function(scope, el, attrs){
    }
  }
}]);
