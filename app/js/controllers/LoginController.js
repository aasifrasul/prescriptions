(function() {

    'use strict';

    presApp.controller('LoginController', ['$scope', '$location', 'AuthenticationService', 'localStorageService',
        function(scope, $location, AuthenticationService, localStorageService) {
            var user = {};
            scope.loginError = false;
            scope.credentials = {
                username: '',
                password: ''
            };

            scope.login = function(credentials) {
                AuthenticationService.login(credentials).then(function(loginObj) {

                    if (!loginObj || !loginObj.isSuccess) {
                        scope.loginError = true;
                    } else {
                        user = loginObj.user;
                        $location.path('/myProfile');
                    }
                });
            }
        }
    ]);

}());