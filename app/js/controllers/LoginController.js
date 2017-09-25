(function() {

	'use strict';

    var app = angular.module('app');
    var injector = angular.injector(['ng', 'app']);

	var LoginController = function($scope, $location, $uibModal, AuthenticationService, SessionService, UsersService) {
		var vm = this;
		var modalInstance;
		vm.loginError = false;
		vm.credentials = {
			username: null,
			password: null,
			remember: SessionService.getLocalStorageByKey('rememberMe')
		};

		vm.init = function() {
			if (SessionService.getSession().id) {
				$location.path('/appointments');
			}
		}

		vm.login = function() {
			var credentials = vm.credentials;
			var username = credentials.username;
			var password = credentials.password;
			var remember = credentials.remember;

			if (!username || !password) {
				var loginform = $scope.loginForm;
				vm.loginError = true;

				if (!username) {
					username = loginform.username;
					username.$dirty = true;
					username.$invalid = true;
				}

				if (!password) {
					password = loginform.password;
					password.$dirty = true;
					password.$invalid = true;
				}

				return false;
			}

			remember && SessionService.setLocalStorageByKey('rememberMe', true);

			AuthenticationService.login(credentials).then(function(response) {
				if (response && response.authToken) {
					$scope.$emit('authSuccess', response);
					vm.loginError = false;
					$location.path('/appointments');
				} else {
					$scope.$emit('authFailure', response);
				}
			});
		}

		vm.register = function() {
			modalInstance ? modalInstance.dismiss() : '';

			modalInstance = $uibModal.open({
				templateUrl: 'views/register.html',
				controller: 'ModalInstanceController',
				resolve: {
					data: function() {
						return null;
					}
				}
			});

			modalInstance.result.then(function(data) {
				UsersService.register(data).then(function(response) {
					if (response) {
						$location.path('/login');
					}
				});

			}, function() {
				console.log('Modal dismissed at: ' + new Date());
			});
		};

		vm.init();
		console.log(vm);
	}

	LoginController.$inject = ['$scope', '$location', '$uibModal', 'AuthenticationService', 'SessionService', 'UsersService'];

	app.controller('LoginController', LoginController);

}());