(function() {

	'use strict';

    var app = angular.module('app');

	var UtilityService = function($filter) {
		var factory = {};

		factory.applyFilter = function(filter, str) {
			return $filter(filter)(str);
		};

		return factory;
	}

	UtilityService.$inject = ['$filter'];

	app.service('UtilityService', UtilityService);

}());