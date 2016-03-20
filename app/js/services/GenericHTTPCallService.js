(function() {

	'use strict';

	function GenericHTTPCallService($http, $q) {
		var factory = {};

		factory.genericFactory = function(type, url, payload) {
			var deferred = $q.defer();
			var call = ('get' == type) ? $http.get(url) : $http.post(url, payload);

			call.success(function(data) {
				deferred.resolve(call.$$state.value);
			}).error(function(err) {
				console.log(err);
				deferred.reject(err);
			});

			return deferred.promise;
		}

		return factory;
	}

	GenericHTTPCallService.$inject = ['$http', '$q'];

	presApp.factory('GenericHTTPCallService', GenericHTTPCallService);

}());