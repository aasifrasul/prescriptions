(function() {

    presApp.factory('middleware', function() {
        return {
            request: function(config) {
                config.url = "http://localhost:9000/" + config.url
                return config;
            }
        };
    });

}());