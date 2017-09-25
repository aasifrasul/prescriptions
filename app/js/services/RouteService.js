(function() {

	'use strict';

	var app = angular.module('app');

	function RouteService() {
		var self = this;
		var factory = {};
		var routes = [];

		var buildRouteObject = function(comp) {
			return {
				templateUrl: 'views/' + comp + '.html',
				controller: comp.capitalize() + 'Controller',
				controllerAs: 'vm'
			}
		};

		var buildRoutes = function(r, routeProvider) {
			angular.forEach(r, function(route) {
				var routeObject = buildRouteObject(route);
				routeProvider.when('/' + route, routeObject);
			});
			routeProvider
				.otherwise({
					redirectTo: '/appointments'
				});
		};

		var getRoutes = function() {
			return routes;
		}

		var setRoutes = function(r) {
			routes = r;
		}

		factory.getRoutes = getRoutes;
		factory.setRoutes = setRoutes;
		factory.buildRoutes = buildRoutes;

		return factory;
	}

	RouteService.$inject = [];

	app.service('RouteService', RouteService);

}());