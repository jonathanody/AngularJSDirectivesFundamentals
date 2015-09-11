angular.module('app', []);

angular.module('app').controller('mainCtrl', function($scope) {
    
});

angular.module('app').directive('simpleDirective',function() {
    return {
        // controller etc...
        compile: function (el, attrs) {
            // do some work before the link function is run
            // rarely used now and returns a link function
            return function(scope, el, attrs, ctrl, transclude) {
                // implementation
            }
        }
    } 
});