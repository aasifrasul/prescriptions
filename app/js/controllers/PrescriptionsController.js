(function() {

    'use strict';

    function PrescriptionsController($scope, $location, $uibModal, PrescriptionsService, SessionService) {
        var modalInstance = null;
        $scope.user = SessionService.getUser();

        function fetchPrescriptions(userId) {
            PrescriptionsService.fetchPrescriptionsByUserId(userId).then(function(response) {
                if (response && response.prescriptions) {
                    console.log(response);
                    $scope.prescriptions = response.prescriptions;
                }
            });
        }

        fetchPrescriptions($scope.user._id);

        $scope.create = function(size) {
            closeModal();

            modalInstance = $uibModal.open({
                templateUrl: 'views/addeditprescription.html',
                controller: 'ModalInstanceController',
                windowClass: 'large-Modal',
                resolve: {
                    data: function() {
                        return null;
                    }
                }
            });

            modalInstance.result.then(function(data) {
                PrescriptionsService.create(data).then(function(response) {
                    if (response) {
                        fetchPrescriptions($scope.user._id);
                        document.location.reload();
                    }
                })

            }, function() {
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        $scope.editPrescription = function(index) {
            closeModal();

            modalInstance = $uibModal.open({
                templateUrl: 'views/addeditprescription.html',
                controller: 'ModalInstanceController',
                windowClass: 'large-Modal',
                resolve: {
                    data: function() {
                        return $scope.prescriptions[index];
                    }
                }
            });

            modalInstance.result.then(function(data) {
                PrescriptionsService.update(data).then(function(response) {
                    if (response) {
                        fetchPrescriptions($scope.user._id);
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
            closeModal();

            modalInstance = $uibModal.open({
                templateUrl: 'views/prescriptiondetail.html',
                controller: 'ModalInstanceController',
                windowClass: 'large-Modal',
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

    }

    PrescriptionsController.$inject = ['$scope', '$location', '$uibModal', 'PrescriptionsService', 'SessionService'];

    presApp.controller('PrescriptionsController', PrescriptionsController);

}());