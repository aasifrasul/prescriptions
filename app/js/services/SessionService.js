(function() {

	'use strict';

    var app = angular.module('app');

	function SessionService($window, $rootScope, StorageService) {
		var self = this;
		var factory = {};
		var user = {};
		var session = {};

		$rootScope.$on('logoutEvent', function(e, data) {
			$rootScope.isLoggedIn = false;
			self.destroy();
		});

		$rootScope.$on('authSuccess', function(e, data) {
			user = data.user || {};
			factory.setUser(user);
			self.create(data.authToken, user.username, null);
			$rootScope.isLoggedIn = true;
		});

		factory.getUser = function() {
			if (!user.username) {
				user = StorageService.get("user");
				user = (user) ? JSON.parse(user) : {};
			}

			return user;
		};

		factory.setUser = function(user) {
			(user.username) ? StorageService.set("user", JSON.stringify(user)) : '';
		};

		factory.setLocalStorageByKey = function(key, value) {
			StorageService.set(key, value, 'local');
		};

		factory.getLocalStorageByKey = function(key) {
			return StorageService.get(key, 'local');
		};

		factory.setSessionStorageByKey = function(key, value) {
			StorageService.set(key, value, 'session');
		};

		factory.getSessionStorageByKey = function(key) {
			return StorageService.get(key, 'session');
		};

		factory.getIsUserAuthenticated = function() {
			factory.getSession();
			return session && session.id;
		};

		factory.getSession = function() {
			if (!session.id) {
				session = StorageService.get("session");
				session = (session) ? JSON.parse(session) : {};
			}

			return session;
		}

		this.create = function(sessionId, userId, userRole) {
			if (!sessionId || !userId) return;
			session.id = sessionId;
			session.userId = userId;
			session.userRole = userRole;

			StorageService.set("session", JSON.stringify(session));
		};

		this.destroy = function() {
			user = {};
			session = {};

			StorageService.del("session");
			StorageService.del("user");
			StorageService.del("rememberMe", "local");
		};

		return factory;
	}

	SessionService.$inject = ['$window', '$rootScope', 'StorageService'];

	app.service('SessionService', SessionService);

}());