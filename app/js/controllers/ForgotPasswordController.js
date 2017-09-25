(function() {

	'use strict';

    var app = angular.module('app');

	var ForgotPasswordController = function($scope) {

		$scope.showscope = function(e) {
			console.log(angular.element(e.srcElement).$scope());
		};

		console.log($scope);
	}

	ForgotPasswordController.$inject = ['$scope'];

	app.controller('ForgotPasswordController', ForgotPasswordController);

}());