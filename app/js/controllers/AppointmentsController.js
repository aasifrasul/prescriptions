(function() {

    'use strict';

    function AppointmentsController($scope, $location, $uibModal, AppointmentsService, SessionService, PrescriptionsService) {
        var modalInstance = null;
        $scope.user = SessionService.getUser();

        function fetchAppointments(from, userId) {
            AppointmentsService.fetchAppointmentsByUserId(userId).then(function(response) {
                if (response && response.appointments) {
                    $scope.appointments = response.appointments;
                }
            });
        }

        fetchAppointments('Today', $scope.user._id);

        $scope.create = function(size) {
            modalInstance ? modalInstance.dismiss() : '';

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
                AppointmentsService.create(data).then(function(response) {
                    if (response) {
                        fetchAppointments($scope.user._id);
                        document.location.reload();
                    }
                })

            }, function() {
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        $scope.editAppointment = function(index) {
            modalInstance ? modalInstance.dismiss() : '';

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
                        fetchAppointments($scope.user._id);
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
            modalInstance ? modalInstance.dismiss() : '';

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

        $scope.showscope = function(e) {
            console.log(angular.element(e.srcElement).$scope());
        }

        console.log($scope);
    }

    AppointmentsController.$inject = ['$scope', '$location', '$uibModal', 'AppointmentsService', 'SessionService', 'PrescriptionsService'];

    presApp.controller('AppointmentsController', AppointmentsController);

}());