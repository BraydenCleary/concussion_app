concussionData.directive('feed', ['concussionService', function(concussionService){
	return {
		restrict: 'C',
		controller: ["$scope", "$http", function($scope, $http){
			$scope.getConcussions = function(){
				$http.get('/concussions').then(function(res, error){
					$scope.concussions = res.data
				});
			}
		}],
		link: function(scope, el, attrs){
			scope.getConcussions();
		}
	};
}]);
