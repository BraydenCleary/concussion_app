concussionData.controller('graphController', ['$scope', '$http', 'concussionService', function($scope, $http, concussionService){

  $scope.weeks = _.range(1,18);
  $scope.activeFilter = 'team';
  $scope.weekStart = "1";
  $scope.weekEnd = "17";
  $scope.seasonStart = "2011";
  $scope.seasonEnd = "2013";


  $scope.switchFilter = function(e){
    $scope.activeFilter = e.currentTarget.getAttribute('data-value');
    $scope.fetchNewData($scope);
  }

  $scope.switchSeason = function(e){
    $scope.activeSeason = e.currentTarget.getAttribute('data-value');
    $scope.fetchNewData($scope);
  }

  $scope.switchWeek = function(e){
    $scope.activeWeek = e.currentTarget.getAttribute('data-value');
    $scope.fetchNewData($scope);
  }

  $scope.fetchNewData = function(scope){
    concussionService.fetch(scope).then(function(data){
      $scope.data = data.data;
    });
  }

  $scope.fetchNewData($scope);
}]);
