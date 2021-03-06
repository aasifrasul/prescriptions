(function() {

	'use strict';

    var app = angular.module('app');

	app.factory('SessionInjector', ['$injector',
		function($injector) {
			var sessionInjector = {
				request: function(config) {
					AuthenticationService = $injector.get('AuthenticationService');

					if (angular.isObject(AuthenticationService.userInfo)) {
						config.headers['x-session-token'] = AuthenticationService.userInfo.authToken;
					}

					return config;
				}
			};
			return sessionInjector;
		}
	]);

}());