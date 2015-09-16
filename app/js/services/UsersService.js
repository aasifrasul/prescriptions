(function() {

    'use strict';

    presApp.service('UsersService', ['$q', 'baseUrl', '$http', '$location', '$resource', 'Restangular', 'localStorageService',
        function($q, baseUrl, http, $location, resource, Restangular, localStorageService) {
            var factory = {};
            var usersService = Restangular.service('users');
            var userService = Restangular.service('user');

            console.log(usersService);

            factory.fetchCurrentUser = function() {
                return localStorageService.get('user');
            };

            factory.addUser = function(payload) {
                usersService.post(payload).then(function(result) {

                    if (result.errors) {
                        console.log(result.errors);
                    } else {
                        $location.path('/login');
                    }

                });
            };

            factory.updateUser = function(payload) {
                http.put(baseUrl + 'user/' + payload._id, payload).then(function(result){
                    if (result.errors) {
                        console.log(result.errors);
                    } else {
                        $location.path('/login');
                    }
                    return;
                });
            };

            factory.fetchUser = function(payload) {
                usersService.put(payload).then(function(result) {

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
                var userLogin = Restangular.service('user/login');
                var defer = $q.defer();
                userLogin.post(payload).then(function(result) {
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