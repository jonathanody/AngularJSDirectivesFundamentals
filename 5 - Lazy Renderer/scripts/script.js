angular.module('app', []);

angular.module('app').controller('mainCtrl', function($scope) {
    $scope.items = [2, 5, 23, 253];
});

angular.module('app').directive('myLazyRender', function() {
    return {
        restrict: "A",
        transclude: "element",
        priority: 1200,
        link: function(scope, el, attr, ctrl, transclude) {
            var hasBeenShown = false;
            
            var unwatchFn = scope.$watch(attr.myLazyRender, function(newValue) {
                if(newValue && !hasBeenShown) {
                    hasBeenShown = true;
                    transclude(scope, function(clone) {
                        el.after(clone);                        
                    });
                    
                    unwatchFn();
                }
            });
        }
    }
})