concussionData.service('concussionService', ['$http', function($http){
	this.fetch = function(){
		$http.get('/concussions').then(function(res, error){
			return res.data
		});
	}
}]);
