(function() {

	'use strict';

    var app = angular.module('app');

	var ModalFactory = function($uibModal) {
		var open = function(view, data, size) {
			return $uibModal.open({
				controller: 'ModalInstanceController',
				controllerAs: 'vm',
				templateUrl: 'views/' + view + '.html',
				size: size,
				resolve: data
			});
		};

		return {
			open: open
		};
	}

	ModalFactory.$inject = ['$uibModalInstance', 'data'];

	app.controller('ModalFactory', ModalFactory);

}());