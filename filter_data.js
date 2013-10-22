concussionData.directive('filterData', ['concussionService', function(concussionService){
  return {
    restrict: 'A',
    controller: ['$scope', function($scope){
      startsWith = function(string, starts){
        if (starts === '') return true;
        if (string == null || starts == null) return false;
        string = String(string); starts = String(starts);
        return string.length >= starts.length && string.slice(0, starts.length) === starts;
      }

      $scope.$watch('search.filterText', function(newVal, oldVal, scope){
        concussionService.fetch(scope).then(function(data){
          var data = data.data
          if (newVal && newVal != ''){
            var matches = _.filter(data, function(data){
              return startsWith(data.filter.toLowerCase(), newVal.toLowerCase());
            });
            if (_.size(matches) > 0){
              $scope.data = matches
            }
          } else{
            $scope.data = data
          }
        });
      });
    }],
    link: function(scope, el, attrs){
    }
  }
}]);
