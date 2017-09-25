(function() {

    app.factory('sessionRecoverer', ['$q', '$injector',
        function($q, $injector) {
            var sessionRecoverer = {
                responseError: function(response) {
                    // Session has expired
                    if (response.status == 419) {
                        var SessionService = $injector.get('SessionService');
                        var $http = $injector.get('$http');
                        var deferred = $q.defer();

                        // Create a new session (recover the session)
                        // We use login method that logs the user in using the current credentials and
                        // returns a promise
                        SessionService.login().then(deferred.resolve, deferred.reject);

                        // When the session recovered, make the same backend call again and chain the request
                        return deferred.promise.then(function() {
                            return $http(response.config);
                        });
                    }
                    return $q.reject(response);
                }
            };
            return sessionRecoverer;
        }
    ]);

}());