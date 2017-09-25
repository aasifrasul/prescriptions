(function() {

	'use strict';

    var app = angular.module('app');

	function StorageService($window) {
		var self = this;
		var factory = {};
		var storage;
		var dStorage;
		var sStorage = $window.sessionStorage;
		var lStorage = $window.localStorage;

		factory.get = function(key, storeageType) {
			self.getContextStorage(storeageType);
			return storage[key] || null;
		};

		factory.set = function(key, value, storeageType) {
			if (key == 'rememberMe') self.setDefaultStorage(value);
			self.getContextStorage(storeageType);
			storage[key] = value;
		};

		factory.del = function(key, storeageType) {
			self.getContextStorage(storeageType);
			storage.removeItem(key);
		};

		this.getContextStorage = function(storeageType) {
			storage = dStorage;
			if (storeageType == 'local') storage = lStorage;
			if (storeageType == 'session') storage = sStorage;

			return storage;
		}

		this.setDefaultStorage = function(rememberMe) {
			dStorage = (rememberMe) ? lStorage : sStorage;
		}

		this.setDefaultStorage(factory.get('rememberMe', 'local'));

		return factory;
	}

	StorageService.$inject = ['$window'];

	app.service('StorageService', StorageService);

}());