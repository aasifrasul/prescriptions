(function() {

	'use strict';

    var app = angular.module('app');

	var RegisterController = function($scope, $injector, UsersService) {
		$scope.dupUsernameError = false;

		$scope.register = function() {
			$scope.$broadcast('show-errors-check-validity');

			if ($scope.userRegistration.$invalid) {
				return;
			}

			UsersService.register($scope.reg);
		}

		$scope.verifyUsername = function() {
            var AuthenticationService = $injector.get('AuthenticationService');
			AuthenticationService.verifyUsername({
				"username": $scope.reg.username
			}).then(function(result) {
				if (!result.message) {
					$scope.dupUsernameError = true;
				} else {
					$scope.dupUsernameError = false;
				}
			})
		}

		$scope.showscope = function(e) {
			console.log(angular.element(e.srcElement).$scope());
		};

		console.log($scope);
	}

	RegisterController.$inject = ['$scope', '$injector', 'UsersService'];

	app.controller('RegisterController', RegisterController);

}());