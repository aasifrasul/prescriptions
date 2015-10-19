module.directive('numberValidator', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            ctrl.$parsers.push(function(value) {
                if (ctrl.$isEmpty(value)) {
                    ctrl.$setValidity('number', true);
                    return null;
                }
                // http://stackoverflow.com/a/1830844/486979
                else if (!isNaN(parseFloat(value)) && isFinite(value)) {
                    ctrl.$setValidity('number', true);
                    return value;
                } else {
                    ctrl.$setValidity('number', false);
                }
            });
        }
    };
});