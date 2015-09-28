(function() {

    'use strict';

    presApp.service('UsersService', ['$q', 'baseUrl', '$http', '$location', '$resource', 'Restangular', 'localStorageService',
        function($q, baseUrl, http, $location, resource, Restangular, localStorageService) {
            var factory = {};

            factory.fetchCurrentUser = function() {
                return localStorageService.get('user');
            };

            factory.register = function(payload) {
                http.post("register", payload).then(function(result) {

                    if (result.errors) {
                        console.log(result.errors);
                    } else {
                        $location.path('/login');
                    }

                });
            };

            factory.updateUser = function(payload) {
                http.put("app/v1/user/" + payload._id, payload).then(function(result){
                    if (result.errors) {
                        console.log(result.errors);
                    } else {
                        $location.path('/login');
                    }
                    return;
                });
            };

            factory.fetchUser = function(payload) {
                http.put(payload).then(function(result) {

                    if (result.errors) {
                        console.log(result.errors);
                    } else {
                        $location.path('/login');
                    }

                });
            };

            /*factory.verifyLogin = function(payload) {
                var handle = resource('http://localhost:9000/user/login');
                var defer = $q.defer();
                handle.save(payload, function(result) {
                    console.log(result);
                    if (result && result.errors) {
                        console.log(result.errors);
                        defer.reject(result.errors);
                    } else {
                        defer.resolve(result);
                    }
                });

                return defer.promise;
            }*/
            
            factory.verifyLogin = function(payload) {
                var defer = $q.defer();
                http.post(payload).then(function(result) {
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