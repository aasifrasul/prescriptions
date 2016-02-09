(function() {

    'use strict';

    presApp.controller('RegisterController', ['$scope', 'UsersService', 'AuthenticationService',
        function($scope, UsersService, AuthenticationService) {
            $scope.dupUsernameError = false;

            $scope.register = function() {
                $scope.$broadcast('show-errors-check-validity');

                if ($scope.userRegistration.$invalid) {
                    return;
                }

                UsersService.register($scope.reg);
            }

            $scope.verifyUsername = function() {
                //AuthenticationService = injector.get('AuthenticationService');
                AuthenticationService.verifyUsername({
                    "username": $scope.reg.username
                }).then(function(result) {
                    if (!result.message) {
                        $scope.dupUsernameError = true;
                    } else {
                        $scope.dupUsernameError = false;
                    }
                })
            }

            $scope.show$scope = function(e) {
                console.log(angular.element(e.srcElement).$scope());
            };

            console.log($scope);
        }
    ]);

}());