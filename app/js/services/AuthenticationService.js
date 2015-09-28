(function() {

    presApp.factory("AuthenticationService", ['$http', '$q', '$window', '$injector',
        function($http, $q, $window, $injector) {
            var userInfo = {},
                currentUser,
                authService = {},
                baseUrl = $injector.get('baseUrl');

            authService.login = function(payload) {
                var deferred = $q.defer();

                $http.post("login", payload).then(function(result) {
                    userInfo = {
                        authToken: result.authToken,
                        username: result.username
                    };

                    currentUser = result.user;
                    $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                    $window.sessionStorage["currentUser"] = JSON.stringify(currentUser);
                    deferred.resolve(userInfo);
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
                http.post("register", payload).then(function(result) {
                    console.log(result);

                    if (result.errors) {
                        console.log(result.errors);
                    } else {
                        $location.path('/login');
                    }

                });
            };

            authService.getCurrentUser = function() {

                if (angular.isUndefined(currentUser)) {
                    currentUser = $window.sessionStorage["currentUser"];
                }

                return currentUser;
            }

            authService.isAuthenticated = function() {
                return !!authService.userInfo.authToken;
            };

            return authService;
        }
    ]);

}());