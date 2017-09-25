(function() {

	'use strict';

    var app = angular.module('app');

	function GenericHTTPCallService($http, $q) {
		var factory = {};

		factory.genericFactory = function(type, url, payload) {
			var deferred = $q.defer();
			var call;

			switch(type) {
				case 'get':
					call = $http.get(url);
					break;
				case 'post':
					call = $http.post(url, payload);
					break;
				case 'put':
					call = $http.put(url, payload);
					break;
				case 'delete':
					call = $http.delete(url);
					break;
			}

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

	app.factory('GenericHTTPCallService', GenericHTTPCallService);

}());