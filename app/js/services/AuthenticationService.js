(function() {

    'use strict';

    presApp.factory("AuthenticationService", ['$http', '$q', '$window', '$injector',
        function($http, $q, $window, $injector) {
            var userInfo = null,
                authenticatedUser = null,
                authService = {};

            authService.login = function(payload) {
                var deferred = $q.defer();

                $http.post("login", payload).then(function(result) {
                    deferred.resolve(result);
                }, function(error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            authService.verifyUsername = function(payload) {
                var deferred = $q.defer();

                $http.post("verifyUsername", payload).then(function(result) {
                    deferred.resolve(result);
                }, function(error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            authService.register = function(payload) {
                var deferred = $q.defer();

                http.post("register", payload).then(function(result) {
                    if (result.errors) {
                        deferred.reject(error);
                        console.log(result.errors);
                    } else {
                        deferred.resolve(result);
                        $location.path('/login');
                    }

                });

                return deferred.promise;
            };

            authService.getAuthenticatedUser = function() {
                if (!_.isObject(authenticatedUser)) {
                    authenticatedUser = $window.sessionStorage["authenticatedUser"];
                    authenticatedUser = (authenticatedUser) ? JSON.parse(authenticatedUser) : null;
                }

                return authenticatedUser;
            }

            authService.getUserInfo = function() {
                if (!_.isObject(userInfo)) {
                    userInfo = $window.sessionStorage["userInfo"];
                    userInfo = (userInfo) ? JSON.parse(userInfo) : null;
                }

                return userInfo;
            }

            authService.isLoggedIn = function() {
                var userInfo = authService.getUserInfo();
                return (userInfo && userInfo.authToken) ? true : false;
            };

            return authService;
        }
    ]);

}());