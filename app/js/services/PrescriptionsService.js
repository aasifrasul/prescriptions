(function() {

    'use strict';

    presApp.service('PrescriptionsService', ['$q', '$http', 'SessionService',
        function($q, $http, SessionService) {
            var factory = {};

            factory.create = function(payload) {
                var defer = $q.defer();
                payload.doctor_name = SessionService.getUser().name;
                payload.doctor_id = SessionService.getUser()._id;
                delete payload._id;

                $http.post("api/v1/prescription", payload).then(function(result) {
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

                $http.put("api/v1/prescription/" + payload._id, payload).then(function(result) {
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

                $http.delete("api/v1/prescription/" + id).then(function(result) {
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

            factory.fetchPrescriptionsByUserId = function(userId) {
                var defer = $q.defer();

                $http.get("api/v1/prescriptions/" + userId).then(function(result) {

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