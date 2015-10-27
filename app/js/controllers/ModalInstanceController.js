(function() {

    'use strict';

    presApp.controller('ModalInstanceController', ['$scope', '$modalInstance', 'data',
        function($scope, $modalInstance, data) {

            $scope.data = data;

            $scope.ok = function() {
                $modalInstance.close($scope.data);
            };

            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };

            $scope.showscope = function(e) {
                console.log(angular.element(e.srcElement).$scope());
            };

            console.log($scope);
        }
    ]);

}());