(function() {

	'use strict';

    var app = angular.module('app');

	var AppointmentsController = function($rootScope, $uibModal, AppointmentsService, SessionService, PrescriptionsService) {
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
		}

		var setAppointments = function() {
			vm.appointments = vm.totalAppointments.slice(0, vm.itemsPerPage);
		}

		var fetchAppointments = function(displayType) {
			vm.displayType = displayType;
			SessionService.setSessionStorageByKey('displayType', displayType);
			AppointmentsService.fetchAppointmentsFromByUserId(displayType, user._id).then(function(response) {
				if (response && response.appointments) {
					vm.totalAppointments = response.appointments;
					setAppointments();
					vm.currentPage = 1;
				}
			});
		}

		vm.displayType = SessionService.getSessionStorageByKey('displayType') || 'Today';
		vm.displayTypes = ['Today', 'Yesterday', 'Last Week', 'Last Month', 'Last Year', 'All'];
		vm.itemsPerPage = 5;
		vm.currentPage = 1;
		vm.appointments = [];
		vm.totalAppointments = [];

		$rootScope.$on("itemsPerPage", function(e, data) {
			vm.itemsPerPage = data;
			setAppointments();
		});

		vm.create = function(size) {
			closeModal();

			modalInstance = $uibModal.open({
				templateUrl: 'views/addeditappointment.html',
				controller: 'ModalInstanceController',
				windowClass: 'large-Modal',
				resolve: resolve(null)
			});

			modalInstance.result.then(function(data) {
				data.doctor_name = user.name;
				data.doctor_id = user._id;
				data.date_time = Date.parse(data.date_time);

				AppointmentsService.create(data).then(function(response) {
					if (response) {
						document.location.reload();
					}
				})

			}, function() {
				console.log('Modal dismissed at: ' + new Date());
			});
		};

		vm.edit = function(index) {
			closeModal();

			modalInstance = $uibModal.open({
				templateUrl: 'views/addeditappointment.html',
				controller: 'ModalInstanceController',
				windowClass: 'large-Modal',
				resolve: resolve(vm.appointments[index])
			});

			modalInstance.result.then(function(data) {
				AppointmentsService.update(data).then(function(response) {
					if (response) {
						document.location.reload();
					}
				})

			}, function() {
				console.log('Modal dismissed at: ' + new Date());
			});
		};

		vm.delete = function(index) {
			AppointmentsService.delete(vm.appointments[index]._id).then(function(response) {
				if (response) {
					delete vm.appointments[index];
				}
			});
		}

		vm.createPrescription = function(index) {
			closeModal();

			modalInstance = $uibModal.open({
				templateUrl: 'views/addeditprescription.html',
				controller: 'ModalInstanceController',
				size: 'large',
				resolve: resolve(vm.appointments[index])
			});

			modalInstance.result.then(function(data) {
				PrescriptionsService.create(data).then(function(response) {
					if (response) {
						document.location.reload();
					}
				})

			}, function() {
				console.log('Modal dismissed at: ' + new Date());
			});
		};

		vm.setPage = function(pageNo) {
			vm.currentPage = pageNo;
			console.log('Page changed to: ' + vm.currentPage);
		};

		vm.pageChanged = function() {
			vm.appointments = vm.totalAppointments.slice((vm.currentPage - 1) * vm.itemsPerPage, vm.currentPage * vm.itemsPerPage);
		};

		fetchAppointments(vm.displayType);

		vm.fetchAppointments = fetchAppointments;

		vm.showscope = function(e) {
			console.log(angular.element(e.srcElement).vm());
		}

		console.log(vm);
	}

	AppointmentsController.$inject = ['$rootScope', '$uibModal', 'AppointmentsService', 'SessionService', 'PrescriptionsService'];

	app.controller('AppointmentsController', AppointmentsController);

}());