(function() {

    'use strict';

    presApp.controller('RegisterController', ['$scope', 'UsersService',
        function(scope, UsersService) {

        	scope.submitForm = function() {
        		UsersService.addUser(scope.reg);
        	}

        }
    ]);

}());