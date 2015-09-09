angular.module('app', []);

angular.module('app').controller('mainCtrl', function($scope) {
    $scope.user1 = {
        name: 'Luke',
        selected: false
    }
});

angular.module('app').directive('userTile', function() {
    return {
        restrict: 'E',
        scope: {
            user: '='
        },
        templateUrl: 'userTile.html'        
    } 
});

angular.module('app').directive('userClickSelect', function() {
    return {
        link: function(scope, el, attrs) {
            el.on('click', function() {
                // Insert business specific logic here instead of in the userTile component directive. You have extended the userTile component by decorating it.
                scope.user.selected = !scope.user.selected;
                scope.$apply();
            })
        }
    }
});