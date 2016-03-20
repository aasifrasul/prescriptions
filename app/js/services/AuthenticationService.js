(function() {

	'use strict';

	function AuthenticationService($window, $injector, GenericHTTPCallService) {
		var userInfo = null,
			apiCall = GenericHTTPCallService.genericFactory,
			authenticatedUser = null,
			factory = {};

		factory.login = function(payload) {
			return apiCall('post', 'login', payload);
		}

		factory.verifyUsername = function(payload) {
			return apiCall('post', 'verifyUsername', payload);
		}

		factory.register = function(payload) {
			apiCall('post', 'register', payload);
			$location.path('/login');
		};

		factory.getAuthenticatedUser = function() {
			if (!_.isObject(authenticatedUser)) {
				authenticatedUser = $window.sessionStorage["authenticatedUser"];
				authenticatedUser = (authenticatedUser) ? JSON.parse(authenticatedUser) : null;
			}

			return authenticatedUser;
		}

		factory.getUserInfo = function() {
			if (!_.isObject(userInfo)) {
				userInfo = $window.sessionStorage["userInfo"];
				userInfo = (userInfo) ? JSON.parse(userInfo) : null;
			}

			return userInfo;
		}

		factory.isLoggedIn = function() {
			var userInfo = factory.getUserInfo();
			return (userInfo && userInfo.authToken) ? true : false;
		};

		return factory;
	}

	AuthenticationService.$inject = ['$window', '$injector', 'GenericHTTPCallService'];

	presApp.service('AuthenticationService', AuthenticationService);

}());