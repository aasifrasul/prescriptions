s//<div class="error-container" ng-show="signup_form.name.$dirty && signup_form.name.$invalid && !signup_form.name.$focused">
(function() {

	'use strict';

    var app = angular.module('app');

	app.directive('ngFocus', [

		function() {
			var FOCUS_CLASS = "ng-focused";
			var linkFunction = function(scope, element, attrs, ctrl) {
				ctrl.$focused = false;
				element.bind('focus', function(evt) {
					element.addClass(FOCUS_CLASS);
					scope.$apply(function() {
						ctrl.$focused = true;
					});
				}).bind('blur', function(evt) {
					element.removeClass(FOCUS_CLASS);
					scope.$apply(function() {
						ctrl.$focused = false;
					});
				});
			};

			return {
				restrict: 'A',
				require: 'ngModel',
				link: linkFunction
			}
		}
	]);

})();