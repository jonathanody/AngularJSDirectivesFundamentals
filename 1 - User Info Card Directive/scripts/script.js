angular.module('app', []);

angular.module('app').controller('mainCtrl', function($scope) {
    $scope.user1 = {
        name: 'Luke Skywalker',
        address: {
            street: 'PO Box 123',
            city: 'Secret Rebel Base',
            planet: 'Yavin 4'
        },
        friends: [
            'Han',
            'Leia',
            'Chewbacca'
        ]
    };  
    
    $scope.user2 = {
        name: 'Han Solo',
        address: {
            street: 'PO Box 123',
            city: 'Mo Eisley',
            planet: 'Tattoine'
        },
        friends: [
            'Han',
            'Leia',
            'Chewbacca'
        ]
    };   
});

angular.module('app').directive('userInfoCard', function() {
    return {
        templateUrl: "userInfoCard.html",
        restrict: "E",
        scope: {
            user: '=', // uses the user attribute contents to dictate what goes into $scope.user on the isolated scope
            initialCollapsed: '@collapsed' // uses the value passed in from the collapsed attribute. Data can only be passed in as a string            
        }, // isolated scope
        controller: function($scope) {
            $scope.collapsed = ($scope.initialCollapsed === 'true');
            
            $scope.knightMe = function(user) {
                user.rank = "knight";
            };
            
            $scope.collapse = function() {
                $scope.collapsed = !$scope.collapsed;
            };    
            
            $scope.removeFriend = function(friend) {
                var idx = $scope.user.friends.indexOf(friend);
                if (idx > -1) {
                    $scope.user.friends.splice(idx, 1);
                }
            };
        }
    } 
});

angular.module('app').directive('removeFriend', function() {
    return {
        restrict: "E",
        templateUrl: "removeFriend.html",
        scope: {
            notifyParent: '&method' // uses the function name passed in via the method attribute
        },
        controller: function($scope) {
            $scope.removing = false;
            $scope.startRemove = function() {
                $scope.removing = true;
            };
            $scope.cancelRemove = function() {
                $scope.removing  = false;
            };    
            $scope.confirmRemove = function() {
                $scope.notifyParent();
            };
        }
    }
});

angular.module('app').directive('address', function() {
    return {
        restrict: "E",
        templateUrl: 'address.html',
        scope: true, // inherited scope, by default this is shared scope
        controller: function($scope) {
            $scope.collapsed = true;
            
            $scope.collapseAddress = function() {
                $scope.collapsed = true;
            };
            
            $scope.expandAddress = function() {
                $scope.collapsed = false;  
            };
        }
    } 
});