(function() {

    'use strict';

    presApp.controller('HomeController', ['$scope', '$location', '$uibModal', 'UsersService', 'SessionService',
        function($scope, $location, $uibModal, UsersService, SessionService) {
console.log($uibModal);
            $scope.create = function(size) {

                var modalInstance = $uibModal.open({
                    templateUrl: 'views/createappointment.html',
                    controller: 'AppointmentController',
                    size: size
                });

                modalInstance.result.then(function(selectedItem) {
                    $scope.selected = selectedItem;
                }, function() {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };

            $scope.showscope = function(e) {
                console.log(angular.element(e.srcElement).$scope());
            };

            console.log($scope);
        }
    ]);

}());