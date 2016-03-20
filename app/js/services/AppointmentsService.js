(function() {

    'use strict';

    presApp.service('AppointmentsService', ['$q', '$http', 'SessionService',
        function($q, $http, SessionService) {
            var factory = {};

            factory.create = function(payload) {
                var defer = $q.defer();

                $http.post("api/v1/appointment", payload).then(function(result) {

                    if (result.errors) {
                        defer.reject(result.errors);
                        console.log(result.errors);
                    } else {
                        defer.resolve(result);
                    }

                });

                return defer.promise;
            };

            factory.update = function(payload) {
                var defer = $q.defer();

                $http.put("api/v1/appointment/" + payload._id, payload).then(function(result) {
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

            factory.delete = function(id) {
                var defer = $q.defer();

                $http.delete("api/v1/appointment/" + id).then(function(result) {
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

            factory.fetchAppointmentsFromByUserId = function(from, userId) {
                var defer = $q.defer();

                $http.get("api/v1/appointments/" + userId + "/" + from).then(function(result) {

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

            return factory;
        }
    ]);

}());