angular.module('app', []);

angular.module('app').controller('mainCtrl', function($scope) {
  $scope.users = [
    {name: 'Luke', planet: 'Tatooine', job: 'Jedi'  },
    {name: 'Han', planet: 'Nowhere', job: 'Jedi'  },
    {name: 'Chewbacca', planet: 'Kashyyyk', job: 'CoPilot'  }
  ]
  
  
});

angular.module('app').directive('masterUsers', function() {
  return {
    scope: {
      users: '=data',
      selectedUser: '='
    },
    templateUrl: 'masterUsers.html',
    controller: function($scope) {
      $scope.selectedUser = $scope.users[0];
      
      $scope.selectUser = function(user) {
        $scope.selectedUser = user;
      }
    }
  } 
});

angular.module('app').directive('detailUsers', function() {
  return {
    scope: {
      users: '=data',
      selectedUser: '='
    },
    templateUrl: 'detailUsers.html'
  }
});