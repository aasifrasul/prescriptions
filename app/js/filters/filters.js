presApp.filter('to_trusted', ['$sce',
    function($sce) {
        return function(html) {
            return $sce.trustAsHtml(html);
        };
    }
]);