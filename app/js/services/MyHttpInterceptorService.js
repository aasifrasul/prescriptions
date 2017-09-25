(function() {

	'use strict';

    var app = angular.module('app');

	// Intercept http calls.
	var MyHttpInterceptor = function($q, SessionService) {
		return {
			// On request success
			request: function(config) {
				//var injector = angular.injector(['ng', 'app']);
				//var SessionService = injector.get('SessionService');
				var session = SessionService.getSession() || {};

				if (session.id) {
					config.headers['x-session-token'] = session.id;
					config.headers['x-key'] = session.userId;
				}

				if (-1 != config.url.indexOf("templates/datetimepicker.html")) {
					config.url = "lib/angular-bootstrap-datetimepicker/src/" + config.url;
				} else if (-1 == config.url.indexOf(".html") && -1 == config.url.indexOf("http")) {
					config.url = "http://localhost:9000/" + config.url;
				}

				// Return the config or wrap it in a promise if blank.
				return config || $q.when(config);
			},

			// On request failure
			requestError: function(rejection) {
				console.log(rejection); // Contains the data about the error on the request.

				// Return the promise rejection.
				return rejection;
			},

			// On response success
			response: function(response) {
				// Return the response or promise.
				if (response) {
					if (angular.isObject(response.data)) {
						return response.data;
					}
					return response;
				}
				return $q.when(response);
			},

			// On response failture
			responseError: function(rejection) {
				console.log(rejection); // Contains the data about the error.

				// Return the promise rejection.
				return rejection;
			}
		};
	}

	MyHttpInterceptor.$inject = ["$q", "SessionService"];

	app.service('MyHttpInterceptor', MyHttpInterceptor);

}());