(function() {

    'use strict';

    presApp.service('UsersService', ['$q', '$http', '$location', '$window',
        function($q, $http, $location, $window) {
            var factory = {};

            factory.register = function(payload) {
                var defer = $q.defer();

                $http.post("register", payload).then(function(result) {

                    if (result.errors) {
                        defer.reject(result.errors);
                        console.log(result.errors);
                    } else {
                        defer.resolve(result);
                        $location.path('/login');
                    }

                });

                return defer.promise;
            };

            factory.updateUser = function(payload) {
                var defer = $q.defer();

                if(payload.username) delete payload.username;
                if(payload.password) delete payload.password;
                $http.put("api/v1/user/" + payload._id, payload).then(function(result) {
                    if (result.errors) {
                        defer.reject(result.errors);
                        console.log(result.errors);
                    } else {
                        defer.resolve(result);
                        console.log(result);
                    }
                });

                return defer.promise;
            };

            factory.fetchUser = function(payload) {
                var defer = $q.defer();

                $http.put(payload).then(function(result) {

                    if (result.errors) {
                        defer.reject(result.errors);
                        console.log(result.errors);
                    } else {
                        defer.resolve(result);
                        $location.path('/login');
                    }

                });

                return defer.promise;
            };

            factory.verifyLogin = function(payload) {
                var defer = $q.defer();
                $http.post(payload).then(function(result) {
                    console.log(result);

                    if (result && result.errors) {
                        defer.reject(result.errors);
                    } else {
                        defer.resolve(result);
                    }

                });

                return defer.promise;
            };

            return factory;
        }
    ]);

}());