(function() {

    'use strict';

    var app = angular.module('app');

    function ModalInstanceController($uibModalInstance, data) {
        var vm = this;

        vm.data = data;

        vm.ok = function() {
            $uibModalInstance.close(vm.data);
        };

        vm.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        console.log(vm);
    }

    ModalInstanceController.$inject = ['$uibModalInstance', 'data'];

    app.controller('ModalInstanceController', ModalInstanceController);

}());