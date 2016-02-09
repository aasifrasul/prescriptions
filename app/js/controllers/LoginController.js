(function() {

    'use strict';

    presApp.controller('LoginController', ['$rootScope', '$scope', '$location', 'AuthenticationService', 'SessionService', '$uibModal', 'UsersService',
        function($rootScope, $scope, $location, AuthenticationService, SessionService, $uibModal, UsersService) {
            var modalInstance;
            $scope.loginError = false;
            $scope.credentials = {
                username: '',
                password: ''
            };

            if (SessionService.getIsUserAuthenticated() == true) {
                $location.path('/appointments');
            }

            $scope.login = function() {
                var username = $scope.credentials.username;
                var password = $scope.credentials.password;

                if (!username || !password) {
                    if (!username) {
                        $scope.loginform.username.$dirty = true;
                        $scope.loginform.username.$invalid = true;
                    }

                    if (!password) {
                        $scope.loginform.password.$dirty = true;
                        $scope.loginform.password.$invalid = true;
                    }

                    return false;
                }

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

            $scope.register = function() {
                modalInstance ? modalInstance.dismiss() : '';

                modalInstance = $uibModal.open({
                    templateUrl: 'views/register.html',
                    controller: 'ModalInstanceController',
                    resolve: {
                        data: function() {
                            return null;
                        }
                    }
                });

                modalInstance.result.then(function(data) {
                    UsersService.register(data).then(function(response) {
                        if (response) {
                        }
                    });

                }, function() {
                    console.log('Modal dismissed at: ' + new Date());
                });
            };

            $scope.showscope = function(e) {
                console.log(angular.element(e.srcElement).$scope());
            };

            console.log($scope);
        }
    ]);

}());