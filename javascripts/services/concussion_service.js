concussionData.service('concussionService', ['$http', function($http){
	this.fetch = function(scope){
    return $http({
      url: '/concussions/' + scope.activeFilter,
      method: 'GET',
      params: { weekStart: scope.weekStart, weekEnd: scope.weekEnd, seasonStart: scope.seasonStart, seasonEnd: scope.seasonEnd}
    })
	}
}]);
