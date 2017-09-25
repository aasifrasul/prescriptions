(function() {

	'use strict';

    var app = angular.module('app');

	var updatePattern = function() {

		var linkFunction = function(scope, element, attrs, ctrl) {

			var get = function() {
				// Evaluate the ngPattern attribute against the current scope
				return scope.$eval(attrs.ngPattern);
			};

			var set = function(newval, oldval) {
				//Get the value from `ngModel`
				value = ctrl.$viewValue;

				// And set validity on the model to true if the element 
				// is empty  or passes the regex test
				if (ctrl.$isEmpty(value) || newval.test(value)) {
					ctrl.$setValidity('pattern', true);
					return value;
				} else {
					ctrl.$setValidity('pattern', false);
					return undefined;
				}
			};

			scope.$watch(get, set);
		};

		return {
			require: "^ngModel",
			link: linkFunction
		}
	}

	app.directive('updatePattern', updatePattern);

})();