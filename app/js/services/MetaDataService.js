(function() {

	'use strict';

    var app = angular.module('app');

	var MetaDataService = function($rootScope) {
		var self = this;
		var newRouteCallBack = function (event, newRoute) {
			self.loadMetadata(newRoute.metadata);
		};

		// Set custom options or use provided fallback (default) options
		self.loadMetadata = function(metadata) {
			self.title = document.title = metadata.title || 'Fallback Title';
			self.description = metadata.description || 'Fallback Description';
			self.url = metadata.url || $location.absUrl();
			self.image = metadata.image || 'fallbackimage.jpg';
			self.ogpType = metadata.ogpType || 'website';
			self.twitterCard = metadata.twitterCard || 'summary_large_image';
			self.twitterSite = metadata.twitterSite || '@fallback_handle';
		};

		// Route change handler, sets the route's defined metadata
		$rootScope.$on('$routeChangeSuccess', newRouteCallBack);
	}

	MetaDataService.$inject = ['$rootScope'];

	app.service('MetaDataService', MetaDataService);

}());