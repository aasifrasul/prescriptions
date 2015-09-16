(function() {

    'use strict';

    presApp.controller('ProfileController', ['$scope', '$location', 'UsersService',
        function(scope, location, UsersService) {

            scope.user = UsersService.fetchCurrentUser();
            console.log(scope.user);

            if (!scope.user) {
                location.path('/login');
            }

            scope.updateProfile = function() {
            	console.log(scope.user);
                UsersService.updateUser(scope.user);
            }

        }
    ]);

}());