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
            scope.isLoginPage = true;

            scope.login = function() {
                AuthenticationService.login(scope.credentials).then(function(loginObj) {
                    if (!loginObj || !loginObj.authToken) {
                        scope.loginError = true;
                    } else {
                        user = loginObj.user;
                        console.log(user);
                        $location.path('/myProfile');
                    }
                });
            }
        }
    ]);

}());