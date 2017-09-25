(function() {

	'use strict';

    var app = angular.module('app');

	var AppointmentsService = function(GenericHTTPCallService) {
		var factory = {};
		var http = GenericHTTPCallService.genericFactory;

		factory.create = function(payload) {
			return http('post', 'api/v1/appointment', payload);
		};

		factory.update = function(payload) {
			return http('put', 'api/v1/appointment' + payload._id, payload);
		};

		factory.delete = function(id) {
			return http('delete', 'api/v1/appointment' + payload._id, payload);
		};

		factory.fetchAppointmentsFromByUserId = function(from, userId) {
			return http('get', 'api/v1/appointments/' + userId + '/' + from);
		};

		return factory;
	}

	AppointmentsService.$inject = ['GenericHTTPCallService'];

	app.service('AppointmentsService', AppointmentsService);

}());