(function() {

    'use strict';

    presApp.service('MiscService', ['$q', '$http', '$location', '$window',
        function($q, $http, $location, $window) {
            var factory = {};

            factory.createContactUs = function(payload) {
                var defer = $q.defer();

                $http.post("createContactUs", payload).then(function(result) {

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

            return factory;
        }
    ]);

}());