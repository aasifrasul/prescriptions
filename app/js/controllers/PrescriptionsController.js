(function() {

	'use strict';

    var app = angular.module('app');

	var PrescriptionsController = function($rootScope, $uibModal, PrescriptionsService, SessionService) {
        var vm = this;
		var modalInstance = null;
		var user = SessionService.getUser();

        var resolve = function(data) {
            return {
                data: function() {
                    return data;
                }
            }
        };

		var closeModal = function() {
			modalInstance ? modalInstance.dismiss() : '';
		};

        var modalClosed = function() {
            console.log('Modal dismissed at: ' + new Date());
        };

		var fetchPrescriptions = function(displayType) {
			PrescriptionsService.fetchPrescriptionsFromByUserId(user._id, displayType).then(function(response) {
				if (response && response.prescriptions) {
                    vm.currentPage = 1;
					vm.totalPrescriptions = response.prescriptions;
                    setPrescriptions();
				}
			});
		};

        var setPrescriptions = function() {
            vm.prescriptions = vm.totalPrescriptions.slice(0, vm.itemsPerPage);
        };

        vm.displayType = SessionService.getSessionStorageByKey('displayType') || 'Today';
        vm.displayTypes = ['Today', 'Yesterday', 'Last Week', 'Last Month', 'Last Year', 'All'];
        vm.itemsPerPage = 5;
        vm.currentPage = 1;
        vm.prescriptions = [];
        vm.totalPrescriptions = [];

        $rootScope.$on("itemsPerPage", function(e, data) {
            vm.itemsPerPage = data;
            setPrescriptions();
        });

        $rootScope.$on("currentPage", function(e, data) {
            vm.setPage(data);
            vm.pageChanged();
        });

        vm.setPage = function(pageNo) {
            vm.currentPage = pageNo;
            console.log('Page changed to: ' + vm.currentPage);
        };

        vm.pageChanged = function() {
            vm.prescriptions = vm.totalPrescriptions.slice((vm.currentPage - 1) * vm.itemsPerPage, vm.currentPage * vm.itemsPerPage);
        };

		vm.create = function(size) {
			closeModal();

			modalInstance = $uibModal.open({
				templateUrl: 'views/addeditprescription.html',
				controller: 'ModalInstanceController',
				windowClass: 'large-Modal',
				resolve: resolve(vm.appointments[index])
			});

			modalInstance.result.then(function(data) {
				PrescriptionsService.create(data).then(function(response) {
					if (response) {
						fetchPrescriptions(vm.displayType);
						document.location.reload();
					}
				})

			},
            modalClosed);
		};

		vm.edit = function(index) {
			closeModal();

			modalInstance = $uibModal.open({
				templateUrl: 'views/addeditprescription.html',
				controller: 'ModalInstanceController',
				windowClass: 'large-Modal',
                resolve: resolve(vm.prescriptions[index])
			});

			modalInstance.result.then(function(data) {
				PrescriptionsService.update(data).then(function(response) {
					if (response) {
						document.location.reload();
					}
				})

			},
            modalClosed);
		};

		vm.delete = function(index) {
			PrescriptionsService.delete(vm.prescriptions[index]._id).then(function(response) {
				if (response) {
					delete vm.prescriptions[index];
				}
			});
		}

		vm.detail = function(index) {
			closeModal();

			modalInstance = $uibModal.open({
				templateUrl: 'views/prescriptiondetail.html',
				controller: 'ModalInstanceController',
                controllerAs: 'vm',
				windowClass: 'large-Modal',
				resolve: resolve(vm.prescriptions[index])
			});
		};

        fetchPrescriptions(vm.displayType);

        vm.fetchPrescriptions = fetchPrescriptions;

		vm.showscope = function(e) {
			console.log(angular.element(e.srcElement).vm());
		}

        console.log(vm);
	}

	PrescriptionsController.$inject = ['$rootScope', '$uibModal', 'PrescriptionsService', 'SessionService'];

	app.controller('PrescriptionsController', PrescriptionsController);

}());