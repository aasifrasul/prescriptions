//<textarea my-maxlength="15" ng-model="result"></textarea>
presApp.directive('myMaxlength', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
            var maxlength = Number(attrs.myMaxlength);

            function fromUser(text) {
                if (text.length > maxlength) {
                    var transformedInput = text.substring(0, maxlength);
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                    return transformedInput;
                }
                return text;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});

/*
link: function(scope, element, attrs, ngModelCtrl) {
    var maxlength = Number(attrs.myMaxlength);

    function fromUser(text) {
        ngModelCtrl.$setValidity('unique', text.length <= maxlength);
        return text;
    }
    ngModelCtrl.$parsers.push(fromUser);
}
*/

/*
$scope.$watch('comment.Comment.body', function(newValue) {
    if (newValue && newValue.length > 1000) {
        $scope.comment.Comment.body = newValue.substring(0, 1000);
    }
    // Must be checked against undefined or you get problems when removing text
    if (newValue != undefined) {
        $scope.commentLength = 1000 - newValue.length;
    }
});
*/