(function() {

	'use strict';

    var app = angular.module('app');

	var AuthenticationService = function(SessionService, GenericHTTPCallService) {
		var userInfo = {},
			http = GenericHTTPCallService.genericFactory,
			authenticatedUser = null,
			factory = {};

		factory.login = function(payload) {
			return http('post', 'login', payload);
		}

		factory.verifyUsername = function(payload) {
			return http('post', 'verifyUsername', payload);
		}

		factory.register = function(payload) {
			return http('post', 'register', payload);
		};

		factory.getAuthenticatedUser = function() {
			if (!_.isObject(authenticatedUser)) {
				authenticatedUser = SessionService.getLocalStorageByKey('authenticatedUser');
				authenticatedUser = (authenticatedUser) ? JSON.parse(authenticatedUser) : null;
			}

			return authenticatedUser;
		}

		factory.getUserInfo = function() {
			if (!userInfo || !userInfo.authToken) {
				userInfo = SessionService.getSessionStorageByKey["userInfo"];
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

	AuthenticationService.$inject = ['SessionService', 'GenericHTTPCallService'];

	app.service('AuthenticationService', AuthenticationService);

}());