concussionData.controller('graphController', ['$scope', '$http', function($scope, $http){

  $scope.weeks = _.range(1,18);
  $scope.filter = 'team';
  $scope.season = null;
  $scope.week = null;

  $scope.switchFilter = function(e){
    $scope.filter = e.currentTarget.className;
  }

  $scope.switchSeason = function(e){
    $scope.season = e.currentTarget.getAttribute('data-value');
  }

  $scope.switchWeek = function(e){
    $scope.week = e.currentTarget.getAttribute('data-value');
  }

}]);
