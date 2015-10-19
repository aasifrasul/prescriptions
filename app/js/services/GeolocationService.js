(function() {

    'use strict';

    presApp.service('GeolocationService', ['$q', '$http',
        function($q, $http) {
            var factory = {};
            var locality = ["locality", "political"];
            factory.position = null;

            factory.fetchGeolocation = function() {
                var deferred = $q.defer();

                if (navigator.geolocation) {
                    /* geolocation is available */
                    navigator.geolocation.getCurrentPosition(
                        function(position) { // success callback  
                            //alert(position.coords.latitude + "," + position.coords.longitude);
                            deferred.resolve(position);
                        },
                        function() { // failure callback
                            // error handling
                            deferred.reject(error);
                        }, {
                            // other options
                            timeout: 30000
                        }
                    );
                } else {
                    // browser does not support Geolocation API
                }

                return deferred.promise;
            }

            function successCallback(position) {
                // By using the 'maximumAge' option above, the position
                // object is guaranteed to be at most 10 minutes old.
                // By using a 'timeout' of 0 milliseconds, if there is
                // no suitable cached position available, the user agent 
                // will asynchronously invoke the error callback with code
                // TIMEOUT and will not initiate a new position
                // acquisition process.
                factory.position = position;
            }

            function errorCallback(error) {
                switch (error.code) {
                    case error.TIMEOUT:
                        // Quick fallback when no suitable cached position exists.
                        doFallback();
                        // Acquire a new position object.
                        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
                        break;
                };
            }

            function doFallback() {
                // No fresh enough cached position available.
                // Fallback to a default position.
            }

            factory.fetchAddressFromLatLong = function(latitude, longitude) {
                var deferred = $q.defer();

                if (!latitude || !longitude) {
                    factory.fetchGeolocation().then(function(result) {
                        console.log(result);
                        if (!latitude) latitude = result.coords.latitude;
                        if (!longitude) longitude = result.coords.longitude;

                        var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude;

                        $http.get(url).then(function(result) {
                            console.log(result);
                            deferred.resolve(result);
                        }, function(error) {
                            deferred.reject(error);
                        });
                    });
                }

                return deferred.promise;
            }

            factory.fetchCity = function(callback) {
                factory.fetchAddressFromLatLong().then(function(result) {
                    if(result && result.results && result.results.length > 0) {
                        var results = result.results;
                        var address = null;
                        for (var i = results.length - 1; i >= 0; i--) {
                            address = results[i];
                            if(address && address.types && _.isEqual(address.types, locality)) {
                                callback(address.formatted_address.split(",").shift());
                            }
                        };
                    }
                })
            }

            return factory;
        }
    ]);
}());