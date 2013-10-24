concussionData.directive("weekSlider", ['concussionService', function(concussionService){
  return {
    restrict: 'C',
    controller: ['$scope', function($scope){
      $('.slider').on('change', function(){
        $scope.activeWeek = Math.floor($('.slider').val());
        $scope.$apply();
        $scope.fetchNewData($scope);
      })

    }],
    link: function(scope, el, attrs){
    }
  }
}]);
