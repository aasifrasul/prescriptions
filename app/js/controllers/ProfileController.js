(function() {

    'use strict';

    presApp.controller('ProfileController', ['$scope', '$location', 'UsersService', 'SessionService',
        function($scope, $location, UsersService, SessionService) {

            $scope.updateProfile = function() {
                console.log($scope.user);
                UsersService.updateUser($scope.user).then(function(response) {
                    SessionService.setUser(response.user);
                    console.log(response);
                });
            }

            $scope.showscope = function(e) {
                console.log(angular.element(e.srcElement).$scope());
            };

            console.log($scope);
        }
    ]);

}());