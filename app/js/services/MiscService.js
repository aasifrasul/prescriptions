(function() {

	'use strict';

    var app = angular.module('app');

	var MiscService = function(GenericHTTPCallService) {
		var factory = {};

		factory.createContactUs = function(payload) {
			return http('post', 'createContactUs', payload);
		};

		return factory;
	}

	MiscService.$inject = ['GenericHTTPCallService'];

	app.service('MiscService', MiscService);

}());