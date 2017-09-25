(function() {

	app.factory('myHttp', ['$injector',
	    function($injector) {
	        $http = $injector.get('$http');

	        this.http = function(params) {
	            params.url = 'http://localhost:9000/' + params.url;
	            return $http(params);
	        }

	    }
	]);

}());