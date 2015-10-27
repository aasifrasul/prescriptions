(function() {

    'use strict';

    presApp.controller('LoginController', ['$rootScope', '$scope', '$location', 'AuthenticationService', 'SessionService',
        function($rootScope, $scope, $location, AuthenticationService, SessionService) {
            $scope.loginError = false;
            $scope.credentials = {
                username: '',
                password: ''
            };

            if(SessionService.getIsUserAuthenticated() == true) {
                $location.path('/appointments');
            }

            $scope.login = function() {
                $scope.$emit('loginEvent', $scope.credentials);

                AuthenticationService.login($scope.credentials).then(function(response) {
                    if (response && response.authToken) {
                        $scope.$emit('authSuccess', response);
                        $location.path('/appointments');
                    } else {
                        $scope.$emit('authFailure', response);
                        $scope.loginError = true;
                    }
                });
            }

            $scope.showscope = function(e) {
                console.log(angular.element(e.srcElement).$scope());
            };

            console.log($scope);
        }
    ]);

}());