(function() {

    'use strict';

    presApp.controller('PrescriptionsController', ['$scope', '$location', '$uibModal', 'PrescriptionsService', 'SessionService',
        function($scope, $location, $uibModal, PrescriptionsService, SessionService) {
            var modalInstance = null;

            function fetchPrescriptions(userId) {
                PrescriptionsService.fetchPrescriptionsByUserId(userId).then(function(response) {
                    if (response && response.prescriptions) {
                        $scope.prescriptions = response.prescriptions;
                    }
                });
            }

            fetchPrescriptions(SessionService.getUser()._id);

            $scope.create = function(size) {
                modalInstance ? modalInstance.dismiss() : '';

                modalInstance = $uibModal.open({
                    templateUrl: 'views/addeditprescription.html',
                    controller: 'ModalInstanceController',
                    resolve: {
                        data: function() {
                            return null;
                        }
                    }
                });

                modalInstance.result.then(function(data) {
                    PrescriptionsService.create(data).then(function(response) {
                        if (response) {
                            fetchPrescriptions(SessionService.getUser()._id);
                            document.location.reload();
                        }
                    })

                }, function() {
                    console.log('Modal dismissed at: ' + new Date());
                });
            };

            $scope.editPrescription = function(index) {
                modalInstance ? modalInstance.dismiss() : '';

                modalInstance = $uibModal.open({
                    templateUrl: 'views/addeditprescription.html',
                    controller: 'ModalInstanceController',
                    resolve: {
                        data: function() {
                            return $scope.prescriptions[index];
                        }
                    }
                });

                modalInstance.result.then(function(data) {
                    PrescriptionsService.update(data).then(function(response) {
                        if (response) {
                            fetchPrescriptions(SessionService.getUser()._id);
                            document.location.reload();
                        }
                    })

                }, function() {
                    console.log('Modal dismissed at: ' + new Date());
                });
            };

            $scope.deletePrescription = function(index) {
                PrescriptionsService.delete($scope.prescriptions[index]._id).then(function(response) {
                    if (response) {
                        delete $scope.prescriptions[index];
                    }
                });
            }

            $scope.detail = function(index) {
                modalInstance ? modalInstance.dismiss() : '';

                modalInstance = $uibModal.open({
                    templateUrl: 'views/prescriptiondetail.html',
                    controller: 'ModalInstanceController',
                    resolve: {
                        data: function() {
                            return $scope.prescriptions[index];
                        }
                    }
                });
            };

            $scope.showscope = function(e) {
                console.log(angular.element(e.srcElement).$scope());
            }

            console.log($scope);
        }
    ]);

}());