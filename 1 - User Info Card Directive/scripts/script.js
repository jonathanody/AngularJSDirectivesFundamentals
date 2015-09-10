angular.module('app', []);

angular.module('app').controller('mainCtrl', function($scope) {
    $scope.person1 = {
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
        ],
        level: 0
    };  
    
    $scope.person2 = {
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
        ],
        level: 1
    }; 
    
    $scope.droid1 = {
        name: 'R2-D2',
        specifications: {
            manufacturer: 'Industrial Automation',
            type: 'Astromech',
            productLine: 'R2 Series'
        },
        level: 0
    }
});

angular.module('app').directive('stateDisplay', function() {
    return {
        link: function(scope, el, attrs) {
            var params = attrs['stateDisplay'].split(' ');
            var linkVar = params[0];
            var classes = params.slice(1);
            
            
            scope.$watch(
                linkVar,
                function(newValue) {
                    el.removeClass(classes.join(' '));
                    el.addClass(classes[newValue]);
                }
            );                        
        }
    }
});

angular.module('app').directive('userPanel', function() {
    return {
        restrict: "E",
        transclude: true,
        templateUrl: "userPanel.html",
        scope: {
            name: "@",
            level: "=",
            initialCollapsed: "@collapsed"
        },
        controller: function($scope) {
            $scope.collapsed = ($scope.initialCollapsed === 'true');
            
            $scope.collapse = function() {
                $scope.collapsed = !$scope.collapsed;
            };    
            
            $scope.nextState = function(evt) {
                evt.stopPropagation();
                evt.preventDefault();
                
                $scope.level++;
                $scope.level = $scope.level % 4;                            
            };
        }
    } 
});

angular.module('app').directive('droidInfoCard', function() {
    return {
        templateUrl: "droidInfoCard.html",
        restrict: "E",
        scope: {
            droid: '=', // uses the person attribute contents to dictate what goes into $scope.user on the isolated scope
            initialCollapsed: '@collapsed' // uses the value passed in from the collapsed attribute. Data can only be passed in as a string            
        }, // isolated scope
        controller: function($scope) {
            
        }
    } 
});

angular.module('app').directive('personInfoCard', function() {
    return {
        templateUrl: "personInfoCard.html",
        restrict: "E",
        scope: {
            person: '=', // uses the person attribute contents to dictate what goes into $scope.user on the isolated scope
            initialCollapsed: '@collapsed' // uses the value passed in from the collapsed attribute. Data can only be passed in as a string            
        }, // isolated scope
        controller: function($scope) {            
            
            $scope.knightMe = function(person) {
                person.rank = "knight";
            };            
            
            $scope.removeFriend = function(friend) {
                var idx = $scope.person.friends.indexOf(friend);
                if (idx > -1) {
                    $scope.person.friends.splice(idx, 1);
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