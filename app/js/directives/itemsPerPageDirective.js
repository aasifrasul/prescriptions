(function() {

	'use strict';

    var app = angular.module('app');

	var itemsPerPage = function() {

		var ctrlFunction = function($scope) {
			var vm = this;
			var get = function() {
				return (vm.itemsPerPage);
			};
			var set = function(v) {
				vm.itemsPerPage = v || vm.itemsPerPage;
				$scope.$emit("itemsPerPage", vm.itemsPerPage);
			};
			vm.itemsPerPage = vm.itemsPerPage || 5;
			$scope.$watch(get, set);
		};

		ctrlFunction.$inject = ['$scope'];

		return {
			restrict: "E",
			scope: {
				itemsPerPage: "@"
			},
			controller: ctrlFunction,
			bindToController: true,
			controllerAs: "vm",
			template: 'Set Items per Page : <input type="text" ng-model="vm.itemsPerPage" size="5">'
		}
	};

	itemsPerPage.$inject = [];

	app.directive('itemsPerPage', itemsPerPage);

})();