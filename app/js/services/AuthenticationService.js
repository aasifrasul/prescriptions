presApp.factory("AuthenticationService", function($http, $q, $window) {
    var userInfo ={},
        currentUser,
        authService = {};

    authService.login = function(payload) {
        var deferred = $q.defer();

        $http.post("user/login", payload).then(function(result) {
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
});