(function() {

	'use strict';

	function LoginController($rootScope, $scope, $location, $uibModal, AuthenticationService, SessionService, UsersService) {
		var modalInstance;
		$scope.loginError = true;
		$scope.credentials = {
			username: null,
			password: null,
			remember: SessionService.getLocalStorageByKey('rememberMe')
		};

		$scope.init = function() {
			if (SessionService.getSession().id) {
				$location.path('/appointments');
			}
		}

		$scope.login = function() {
			var username = $scope.credentials.username;
			var password = $scope.credentials.password;
			var remember = $scope.credentials.remember;

			if (!username || !password) {
				if (!username) {
					$scope.loginform.username.$dirty = true;
					$scope.loginform.username.$invalid = true;
				}

				if (!password) {
					$scope.loginform.password.$dirty = true;
					$scope.loginform.password.$invalid = true;
				}

				return false;
			}

			remember && SessionService.setLocalStorageByKey('rememberMe', true);

			AuthenticationService.login($scope.credentials).then(function(response) {
				if (response && response.authToken) {
					$scope.$emit('authSuccess', response);
					$scope.loginError = false;
					$location.path('/appointments');
				} else {
					$scope.$emit('authFailure', response);
				}
			});
		}

		$scope.register = function() {
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

		$scope.init();
		console.log($scope);
	}

	LoginController.$inject = ['$rootScope', '$scope', '$location', '$uibModal', 'AuthenticationService', 'SessionService', '$uibModal', 'UsersService'];

	presApp.controller('LoginController', LoginController);

}());