concussionData.controller('graphController', ['$scope', '$http', function($scope, $http){

  $scope.weeks = _.range(1,18);
  $scope.activeFilter = 'team';
  $scope.activeSeason = '';
  $scope.activeWeek = '';

  $scope.switchFilter = function(e){
    $scope.activeFilter = e.currentTarget.getAttribute('data-value');
  }

  $scope.switchSeason = function(e){
    $scope.activeSeason = e.currentTarget.getAttribute('data-value');
  }

  $scope.switchWeek = function(e){
    $scope.activeWeek = e.currentTarget.getAttribute('data-value');
  }

}]);
