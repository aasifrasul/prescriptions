(function() {

    'use strict';

    presApp.controller('ForgotPasswordController', ['$scope',
        function(scope) {

            $scope.showscope = function(e) {
                console.log(angular.element(e.srcElement).$scope());
            };

            console.log($scope);
        }
    ]);

}());