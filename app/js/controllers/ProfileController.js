(function() {

	'use strict';

    var app = angular.module('app');

	var ProfileController = function($scope, UsersService, SessionService) {
		$scope.user = SessionService.getUser();

		$scope.updateProfile = function() {
			UsersService.updateUser($scope.user).then(function(response) {
				SessionService.setUser(response.user);
			});
		}

		$scope.showscope = function(e) {
			console.log(angular.element(e.srcElement).$scope());
		};

		console.log($scope);
	}

	ProfileController.$inject = ['$scope', 'UsersService', 'SessionService'];

	app.controller('ProfileController', ProfileController);

}());