(function() {

	'use strict';

    var app = angular.module('app');

	function dateTime(DateTimeService) {

		var linkFunction = function(scope, element, attr) {
			var date = scope.data.date;
			date = (scope.data.type == 'integer') ? new Date(date) : date;
			scope.dateTimeStr = DateTimeService.buildDateTimeText(date);
		};

		return {
			restrict: 'EA',
			scope: {
				data: '='
			},
			template: '<span>{{dateTimeStr}}</span>',
			link: linkFunction
		}
	}

	dateTime.$inject = ['DateTimeService'];

	app.directive('dateTime', dateTime);

})();