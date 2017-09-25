(function() {

	'use strict';

    var app = angular.module('app');

	var loginDialog = function(AUTH_EVENTS) {
		var linkFunction = function(scope) {
			var showDialog = function() {
				scope.visible = true;
			};

			scope.visible = false;
			scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
			scope.$on(AUTH_EVENTS.sessionTimeout, showDialog)
		};

		return {
			restrict: 'A',
			template: '<div ng-if="visible" ng-include src="\'views/login.html\'">',
			link: linkFunction
		};
	}

	loginDialog.$inject = ['AUTH_EVENTS'];

	app.directive('loginDialog', loginDialog);

})();