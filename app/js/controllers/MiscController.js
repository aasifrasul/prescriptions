(function() {

    'use strict';

    presApp.controller('MiscController', ['$scope', '$location', 'MiscService', 'SessionService',
        function($scope, $location, MiscService, SessionService) {

            $scope.createContactUs = function() {
                console.log($scope.data);
                MiscService.createContactUs($scope.data).then(function(response) {
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