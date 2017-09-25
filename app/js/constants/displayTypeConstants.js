(function() {

	'use strict';

    var app = angular.module('app');

	/**
	 * @ngInject
	 */
	var displayTypes = function() {
		var data = ['Today', 'Yesterday', 'Last Week', 'Last Month', 'Last Year', 'All'];
		return data;
	};

	app.constant('displayTypes', displayTypes());

})();