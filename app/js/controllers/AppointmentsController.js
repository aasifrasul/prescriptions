(function() {

	'use strict';

	function AppointmentsController($scope, $location, $uibModal, AppointmentsService, SessionService, PrescriptionsService) {
		var modalInstance = null;
		var user = SessionService.getUser();
		$scope.displayType = SessionService.getSessionStorageByKey('displayType') || 'Today';
		$scope.displayTypes = ['Today', 'Yesterday', 'Last Week', 'Last Month', 'Last Year', 'All'];
		$scope.itemsPerPage = 5;
		$scope.currentPage = 1;
		$scope.appointments = [];
		$scope.totalAppointments = [];

		$scope.$watch("itemsPerPage", function(newValue, oldValue) {
			if (!newValue) {
				newValue = oldValue;
			}

			if (newValue !== oldValue) {
				$scope.currentPage = 1;
				setAppointments();
			}
		});

		$scope.fetchAppointments = function(displayType) {
			$scope.displayType = displayType;
			SessionService.setSessionStorageByKey('displayType', displayType);
			AppointmentsService.fetchAppointmentsFromByUserId(displayType, user._id).then(function(response) {
				if (response && response.appointments) {
					$scope.totalAppointments = response.appointments;
					setAppointments();
					$scope.currentPage = 1;
				}
			});
		}

		function setAppointments() {
			if ($scope.totalAppointments.length) $scope.appointments = $scope.totalAppointments.slice(0, $scope.itemsPerPage);
		}

		$scope.create = function(size) {
			closeModal();

			modalInstance = $uibModal.open({
				templateUrl: 'views/addeditappointment.html',
				controller: 'ModalInstanceController',
				windowClass: 'large-Modal',
				resolve: {
					data: function() {
						return null;
					}
				}
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

		$scope.editAppointment = function(index) {
			closeModal();

			modalInstance = $uibModal.open({
				templateUrl: 'views/addeditappointment.html',
				controller: 'ModalInstanceController',
				windowClass: 'large-Modal',
				resolve: {
					data: function() {
						return $scope.appointments[index];
					}
				}
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

		$scope.deleteAppointment = function(index) {
			AppointmentsService.delete($scope.appointments[index]._id).then(function(response) {
				if (response) {
					delete $scope.appointments[index];
				}
			});
		}

		$scope.createPrescription = function(index) {
			closeModal();

			modalInstance = $uibModal.open({
				templateUrl: 'views/addeditprescription.html',
				controller: 'ModalInstanceController',
				windowClass: 'large-Modal',
				resolve: {
					data: function() {
						return $scope.appointments[index];
					}
				}
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

		function closeModal() {
			modalInstance ? modalInstance.dismiss() : '';
		}

		$scope.setPage = function(pageNo) {
			$scope.currentPage = pageNo;
			console.log('Page changed to: ' + $scope.currentPage);
		};

		$scope.pageChanged = function() {
			$scope.appointments = $scope.totalAppointments.slice(($scope.currentPage - 1) * $scope.itemsPerPage, $scope.currentPage * $scope.itemsPerPage);
		};

		$scope.fetchAppointments($scope.displayType);

		$scope.showscope = function(e) {
			console.log(angular.element(e.srcElement).$scope());
		}

		console.log($scope);
	}

	AppointmentsController.$inject = ['$scope', '$location', '$uibModal', 'AppointmentsService', 'SessionService', 'PrescriptionsService'];

	presApp.controller('AppointmentsController', AppointmentsController);

}());