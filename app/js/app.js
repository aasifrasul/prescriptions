(function() {

	'use strict';

	var baseUrl = '';

	var app = angular.module('app', [
		'ngRoute',
		'ui.bootstrap',
		'ui.bootstrap.modal',
		'ui.bootstrap.datetimepicker',
		'ui.bootstrap.showErrors',
		'jcs-autoValidate'
	]);

	app.value('apiBaseUrl', 'http://localhost:9000/');

	String.prototype.capitalize = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	}

	app.constant('AUTH_EVENTS', {
		loginSuccess: 'auth-login-success',
		loginFailed: 'auth-login-failed',
		logoutSuccess: 'auth-logout-success',
		sessionTimeout: 'auth-session-timeout',
		notAuthenticated: 'auth-not-authenticated',
		notAuthorized: 'auth-not-authorized'
	});

/*
	app.service('modHttp', ['$http',
        function($http) {

            this.http = function(params) {
                params.url = 'http://localhost:9000/' + params.url;
                return $http(params);
            }

        }
    ]);

    app.config(['$routeProvider',
        function($routeProvider) {
            var injector = angular.injector(['ng', 'app']);
            $rootScope = injector.get('$rootScope');
            location = injector.get('$location');

            $rootScope.$on("$routeChangeStart", function(event, next, current) {
                if (next.requireLogin) {
                    var AuthenticationService = injector.get('AuthenticationService');

                    if (!AuthenticationService.isLoggedIn()) {
                        console.log('DENY');
                        event.preventDefault();
                        $location.path('/login');
                    } else {
                        console.log('ALLOW');
                        $location.path('/home');
                    }
                }
            });
        }
    ]);
	
	app.config(['localStorageServiceProvider',
        function(localStorageServiceProvider) {
            localStorageServiceProvider
                .setPrefix('pres')
                .setStorageType('localStorage')
                .setNotify(false, false);
        }
    ]);
*/

	var routes = ['home', 'appointments', 'prescriptions', 'login', 'register', 'misc', 'forgotPassword', 'profile'];

	var buildRouteObject = function(comp) {
		return {
			templateUrl: 'views/' + comp + '.html',
			controller: comp.capitalize() + 'Controller',
			controllerAs: 'vm'
		}
	};

	var routeDefs = function(routeProvider) {
		angular.forEach(routes, function(route) {
			var routeObject = buildRouteObject(route);
			routeProvider.when('/' + route, routeObject);
		});
		routeProvider
			.otherwise({
				redirectTo: '/appointments'
			});
	};

	// Intercept http calls.
	var MyHttpInterceptor = function($q, SessionService, apiBaseUrl) {
		return {
			// On request success
			request: function(config) {
				//var injector = angular.injector(['ng', 'app']);
				//var SessionService = injector.get('SessionService');
				var session = SessionService.getSession() || {};

				if (session.id) {
					config.headers['x-session-token'] = session.id;
					config.headers['x-key'] = session.userId;
				}

				if (-1 != config.url.indexOf("templates/datetimepicker.html")) {
					config.url = "lib/angular-bootstrap-datetimepicker/src/" + config.url;
				} else if (-1 == config.url.indexOf(".html") && -1 == config.url.indexOf("http")) {
					config.url = apiBaseUrl + config.url;
				}

				// Return the config or wrap it in a promise if blank.
				return config || $q.when(config);
			},

			// On request failure
			requestError: function(rejection) {
				console.log(rejection); // Contains the data about the error on the request.

				// Return the promise rejection.
				return rejection;
			},

			// On response success
			response: function(response) {
				// Return the response or promise.
				if (response) {
					if (angular.isObject(response.data)) {
						return response.data;
					}
					return response;
				}
				return $q.when(response);
			},

			// On response failture
			responseError: function(rejection) {
				console.log(rejection); // Contains the data about the error.

				// Return the promise rejection.
				return rejection;
			}
		};
	}

	app.config(['$provide', '$locationProvider', '$routeProvider', '$httpProvider', '$compileProvider', 'showErrorsConfigProvider',
		function($provide, $locationProvider, $routeProvider, $httpProvider, $compileProvider, showErrorsConfigProvider) {
			showErrorsConfigProvider.showSuccess(true);
			$compileProvider.debugInfoEnabled(false);
			delete $httpProvider.defaults.headers.common['X-Requested-With'];

			routeDefs($routeProvider);
			//httpProvider.interceptors.push('middleware');
			//httpProvider.interceptors.push('SessionInjector');

			$locationProvider.html5Mode({
				enabled: true,
				requireBase: true,
				rewriteLinks: true
			});

			MyHttpInterceptor.$inject = ["$q", "SessionService", "apiBaseUrl"];

			$provide.factory('MyHttpInterceptor', MyHttpInterceptor);

			// Add the interceptor to the $httpProvider.
			$httpProvider.interceptors.push('MyHttpInterceptor');
		}
	]);

/*
	app.run(['$location', '$anchorScroll',
		function($location, $anchorScroll) {
			console.log('Hi');
			when the route is changed scroll to the proper element.
			$rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
				console.log('Hi');
				if ($location.hash()) $anchorScroll();
			});
		}
	]);

    app.run([
        'bootstrap3ElementModifier',
        function(bootstrap3ElementModifier) {
            bootstrap3ElementModifier.enableValidationStateIcons(true);
        }
    ]);

    app.run([
        'validator',
        function(validator) {
            validator.setValidElementStyling(false);
            validator.setInvalidElementStyling(false);
        }
    ]);
*/
}());