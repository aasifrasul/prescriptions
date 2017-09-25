(function() {

	'use strict';

    var app = angular.module('app');

	function paginationWrapper() {

		var ctrlFunction = function($scope) {
			var vm = this;
			var get = function() {
				return (vm.currentPage);
			};
			var set = function(v) {
				vm.currentPage = v || vm.currentPage;
				$scope.$emit("currentPage", vm.currentPage);
			};
			vm.currentPage = vm.currentPage || 1;
			vm.itemsPerPage = vm.itemsPerPage || 5;
			vm.totalItems = vm.totalItems || [];
			console.log(vm);
			$scope.$watch(get, set);
		};

		ctrlFunction.$inject = ['$scope'];

		return {
			restrict: "E",
			scope: {
				itemsPerPage: "=",
				totalItems: '='
			},
			controller: ctrlFunction,
			bindToController: true,
			controllerAs: "vm",
			template: [
				'<div ng-if="vm.totalItems.length > vm.itemsPerPage" class="text-center">' +
					'<uib-pagination ' +
						'total-items="vm.totalItems.length" ' +
						'items-per-page="vm.itemsPerPage" ' +
						'ng-model="currentPage" ' +
						'class="pagination-sm" ' +
						'boundary-links="true" ' +
						'next-text=">" ' +
						'last-text=">>" ' +
						'first-text="<<" ' +
						'previous-text="<" ' +
					'</uib-pagination>' +
				'</div>'
			].join('')
		}
	};

	paginationWrapper.$inject = [];

	app.directive('paginationWrapper', paginationWrapper);

})();