(function() {

	'use strict';

    var app = angular.module('app');

	var MiscController = function($scope, $location, MiscService, SessionService) {

		$scope.createContactUs = function() {
			console.log($scope.data);
			MiscService.createContactUs($scope.data).then(function(response) {
				console.log(response);
			});
		}

		$scope.showscope = function(e) {
			console.log(angular.element(e.srcElement).$scope());
		};

		console.log($scope);
	}

	MiscController.$inject = ['$scope', '$location', 'MiscService', 'SessionService'];

	app.controller('MiscController', MiscController);

}());