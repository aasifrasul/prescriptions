(function() {

    'use strict';

    function ModalInstanceController($scope, $uibModalInstance, data) {

        $scope.data = data;

        $scope.ok = function() {
            $uibModalInstance.close($scope.data);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showscope = function(e) {
            console.log(angular.element(e.srcElement).$scope());
        };

        console.log($scope);
    }

    ModalInstanceController.$inject = ['$scope', '$uibModalInstance', 'data'];

    presApp.controller('ModalInstanceController', ModalInstanceController);

}());