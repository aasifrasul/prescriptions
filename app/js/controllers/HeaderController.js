(function() {

    'use strict';

    presApp.controller('HeaderController', ['$rootScope', '$scope', '$location', 'SessionService',
        function($rootScope, $scope, $location, SessionService) {
            $scope.userIsAuthenticated = false;

            $rootScope.$on('authSuccess', function(e, data) {
                $scope.userIsAuthenticated = true;
                $scope.user = data.user;
            });

            if (!SessionService.getIsUserAuthenticated()) {
                $scope.userIsAuthenticated = false;
                $location.path('/login');
            } else {
                $scope.user = SessionService.getUser();
                $scope.userIsAuthenticated = true;
            }

            $scope.logout = function() {
                $scope.$emit('logoutEvent');
                $location.path('/login');
                $scope.userIsAuthenticated = false;
            };

            console.log($scope);
        }
    ]);

}());