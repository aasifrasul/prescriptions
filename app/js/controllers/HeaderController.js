(function() {

	'use strict';

	var app = angular.module('app');

	var HeaderController = function($rootScope, $scope, $location, AuthenticationService) {
		var vm = this;
		var handleAuthSuccess = function(e, data) {
			vm.userIsAuthenticated = true;
			vm.user = data.user;
		};

		vm.userIsAuthenticated = false;

		vm.links = [{
			'name': 'Appointments',
			'link': 'appointments'
		}, {
			'name': 'Prescriptions',
			'link': 'prescriptions'
		}, {
			'name': 'My Profile',
			'link': 'profile'
		}, {
			'name': 'Contact',
			'link': 'misc'
		}];

		$rootScope.$on('authSuccess', handleAuthSuccess);

		if (AuthenticationService.isLoggedIn()) {
			vm.user = AuthenticationService.getAuthenticatedUser();
			vm.userIsAuthenticated = true;
		} else {
			vm.userIsAuthenticated = false;
			$location.path('/login');
		}

		vm.logout = function() {
			vm.userIsAuthenticated = false;
			vm.user = {};

			$scope.$emit('logoutEvent');
			$location.path('/login');
		};

		vm.redirect = function(route) {
			route = route || '/login';
			$location.path(route);
		}

		// vm.showscope = function(e) {
		// 	console.log(angular.element(e.srcElement).vm());
		// }

		console.log($scope);
	}

	HeaderController.$inject = ['$rootScope', '$scope', '$location', 'AuthenticationService'];

	app.controller('HeaderController', HeaderController);

}());