concussionData.service('concussionService', ['$http', function($http){
	this.fetch = function(scope){
    return $http({
      url: '/concussions/' + scope.activeFilter,
      method: 'GET',
      params: { week: scope.activeWeek, season: scope.activeSeason}
    })
	}
}]);
