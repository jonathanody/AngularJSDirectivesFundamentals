angular.module('app', []);

angular.module('app').controller('mainCtrl', function($scope) {
    
});

angular.module('app').directive('emperor', function() {
    var name = 'The Emperor';
    return {
        scope: true,
        // By default the link function is post-link. You can explicitly declare if you want it to be pre or post link.
        controller: function($scope) {
            this.name = name;  
        },
        link: function($scope, el, attrs) {
            el.data('name', name);
            $scope.master = 'The Emperor';
        }
    }
});

angular.module('app').directive('vader', function() {
    var name = 'Vader';
    return {
        scope: true,
        require: '^emperor', // Get the controller on the parent emporer directive
        controller: function($scope) {
            this.name = name;
        },
        link: function($scope, el, attrs, emperorCtrl) { //emperorCtrl is the ctrl passed in via the require property
            el.data('name', name);
            el.data('master', emperorCtrl.name);
            console.log('Vader\'s master is ' + emperorCtrl.name);
        }
    } 
});

angular.module('app').directive('starkiller', function() {
    return {
        scope: true,
        require: ['^vader', '^emperor'], // multiple controllers can be required
        link: {
            post: function($scope, el, attrs, ctrls) {
                el.data('name', 'Starkiller');
                el.data('master', ctrls[0].name);
                console.log('Starkiller\'s master is ' + ctrls[0].name);
                console.log('Starkiller\'s master\'s master is ' + ctrls[1].name);
            }
        }
    } 
});