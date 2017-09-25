(function() {

	'use strict';

    var app = angular.module('app');

	var UsersService = function(GenericHTTPCallService) {
		var factory = {};
		var http = GenericHTTPCallService.genericFactory;

		factory.register = function(payload) {
			if (!payload) return null;
			return http('post', 'register', payload);
		};

		factory.updateUser = function(payload) {
			if (!payload._id) return null;
			if (payload.username) delete payload.username;
			if (payload.password) delete payload.password;
			return http('put', 'api/v1/user/' + payload._id, payload);
		};

		factory.fetchUser = function(payload) {
			if (!payload._id) return null;
			if (payload.username) delete payload.username;
			if (payload.password) delete payload.password;
			return http('get', 'api/v1/user/' + payload._id, payload);
		};

		factory.verifyLogin = function(payload) {
            return http('post', 'verifyLogin', payload);
		};

		return factory;
	}

	UsersService.$inject = ['GenericHTTPCallService'];

	app.service('UsersService', UsersService);

}());