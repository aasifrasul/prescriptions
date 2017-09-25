(function() {

	'use strict';

    var app = angular.module('app');

	var PrescriptionsService = function(SessionService, GenericHTTPCallService) {
		var factory = {};
		var http = GenericHTTPCallService.genericFactory;

		factory.create = function(payload) {
			payload.doctor_name = SessionService.getUser().name;
			payload.doctor_id = SessionService.getUser()._id;
			delete payload._id;

			return http('post', 'api/v1/prescription', payload);
		};

		factory.update = function(payload) {
			return http('put', 'api/v1/prescription/' + payload._id, payload);
		};

		factory.delete = function(id) {
			return http('delete', 'api/v1/prescription/' + id);
		};

		factory.fetchPrescriptionsFromByUserId = function(userId, displayType) {
			return http('get', 'api/v1/prescriptions/' + userId + '/' + displayType);
		};

		return factory;
	}

	PrescriptionsService.$inject = ['SessionService', 'GenericHTTPCallService'];

	app.service('PrescriptionsService', PrescriptionsService);

}());