concussionData.directive('slider', function(){
  return{
    restrict: 'C',
    link: function(scope, el, attrs){
      el.noUiSlider({
         start: [attrs.min, attrs.max]
        ,range: [attrs.min, attrs.max]
        ,handles: 2
        ,step: 1
        ,orientation: 'horizontal'
      });
    }
  }
})
