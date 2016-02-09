(function() {

    'use strict';

    function ProfileController($scope, $location, UsersService, SessionService) {
        $scope.user = SessionService.getUser();

        $scope.updateProfile = function() {
            UsersService.updateUser($scope.user).then(function(response) {
                SessionService.setUser(response.user);
            });
        }

        $scope.showscope = function(e) {
            console.log(angular.element(e.srcElement).$scope());
        };

        console.log($scope);
    }

    ProfileController.$inject = ['$scope', '$location', 'UsersService', 'SessionService'];

    presApp.controller('ProfileController', ProfileController);

}());