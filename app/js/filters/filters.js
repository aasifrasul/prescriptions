(function() {

	'use strict';

	var app = angular.module('app');

	var trustHtml = function($sce) {
		return function(html) {
			return $sce.trustAsHtml(html);
		};
	}

	trustHtml.$inject = ['$sce'];

	app.filter('trustHtml', trustHtml);

	var trustUrl = function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	}

	trustUrl.$inject = ['$sce'];

	app.filter('trustUrl', trustUrl);

	var capitalize = function() {
		return function(str) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		};
	}

	capitalize.$inject = [];

	app.filter('capitalize', capitalize);

}());