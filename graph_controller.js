concussionData.controller('graphController', ['$scope', '$http', 'concussionService', function($scope, $http, concussionService){

  $scope.weeks = _.range(1,18);
  $scope.activeFilter = 'team';
  $scope.activeSeason = '';
  $scope.activeWeek = '';

  $scope.switchFilter = function(e){
    $scope.activeFilter = e.currentTarget.getAttribute('data-value');
    fetchNewData($scope);
  }

  $scope.switchSeason = function(e){
    $scope.activeSeason = e.currentTarget.getAttribute('data-value');
    fetchNewData($scope);
  }

  $scope.switchWeek = function(e){
    $scope.activeWeek = e.currentTarget.getAttribute('data-value');
    fetchNewData($scope);
  }

  fetchNewData = function(scope){
    concussionService.fetch(scope).then(function(data){
      $scope.data = data.data;
    });
  }

  fetchNewData($scope);
}]);
