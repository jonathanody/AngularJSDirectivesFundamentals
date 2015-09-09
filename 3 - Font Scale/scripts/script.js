angular.module('app', []);

angular.module('app').controller('mainCtrl', function($scope) {
    $scope.size = 150;
});

angular.module('app').directive('fontScale', function() {
    return {
        restrict: "A", // This is the default value so can be ommited
        link: function(scope, el, attrs) {
            scope.$watch(
                attrs['fontScale'],
                function(newValue) {
                    el.css('font-size', newValue + '%');
                }
            );
        }
    }
});