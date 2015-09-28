'use strict';

var presApp = angular.module('presApp', [
    'ngRoute',
    'restangular',
    'ngResource',
    'LocalStorageModule'
]);

(function() {
    var baseUrl = '';

    presApp.constant('baseUrl', 'http://localhost:9000/');

    presApp.constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    });

    presApp.service('modHttp', ['$http',
        function($http) {

            this.http = function(params) {
                params.url = 'http://localhost:9000/' + params.url;
                return $http(params);
            }

        }
    ]);

    presApp.config(['$routeProvider',

        function($routeProvider) {
            $routeProvider.
            when('/', {
                templateUrl: 'views/login.html',
                controller: 'LoginController'
            }).
            when('/register', {
                templateUrl: 'views/register.html',
                controller: 'RegisterController'
            }).
            when('/forgotPassword', {
                templateUrl: 'views/forgotpassword.html',
                controller: 'ForgotPasswordController'
            }).
            when('/myProfile', {
                templateUrl: 'views/myprofile.html',
                controller: 'ProfileController'
            }).
            when('/prescriptions', {
                templateUrl: 'views/prescriptions.html',
                controller: 'PrescriptionsController'
            }).
            when('/prescriptions/:prescriptionId', {
                templateUrl: 'views/prescription-detail.html',
                controller: 'PrescriptionsDetailController'
            }).
            otherwise({
                redirectTo: '/'
            });
        }
    ]);

    presApp.config(['RestangularProvider',
        function(RestangularProvider) {

            if (window.location.hostname == "localhost") {
                baseUrl = 'http://localhost:9000/';
            } else {
                var deployedAt = window.location.href.substring(0, window.location.href);
                baseUrl = deployedAt + "/api/rest/";
            }

            RestangularProvider.setBaseUrl(baseUrl);
            /*RestangularProvider.setExtraFields(['name']);
            RestangularProvider.setResponseExtractor(function(response, operation) {
                return response.data;
            });

            RestangularProvider.addElementTransformer('accounts', false, function(element) {
                element.accountName = 'Changed';
                return element;
            });

            RestangularProvider.setDefaultHttpFields({
                cache: true
            });
            RestangularProvider.setMethodOverriders(["put", "patch"]);

            // In this case we are mapping the id of each element to the _id field.
            // We also change the Restangular route.
            // The default value for parentResource remains the same.
            RestangularProvider.setRestangularFields({
                id: "_id",
                route: "restangularRoute",
                selfLink: "self.href"
            });

            RestangularProvider.setRequestSuffix('.json');

            // Use Request interceptor
            RestangularProvider.setRequestInterceptor(function(element, operation, route, url) {
                delete element.name;
                return element;
            });

            // ..or use the full request interceptor, setRequestInterceptor's more powerful brother!
            RestangularProvider.setFullRequestInterceptor(function(element, operation, route, url, headers, params, httpConfig) {
                delete element.name;
                return {
                    element: element,
                    params: _.extend(params, {
                        single: true
                    }),
                    headers: headers,
                    httpConfig: httpConfig
                };
            });*/

        }
    ]);

    presApp.config(['localStorageServiceProvider',
        function(localStorageServiceProvider) {
            localStorageServiceProvider
                .setPrefix('pres')
                .setStorageType('localStorage')
                .setNotify(false, false);
        }
    ]);

    presApp.config(['$httpProvider',
        function(httpProvider) {
            delete httpProvider.defaults.headers.common['X-Requested-With'];
            //httpProvider.interceptors.push('middleware');
            //httpProvider.interceptors.push('SessionInjector');
        }
    ]);

    presApp.config(['$httpProvider', '$locationProvider',
        function(httpProvider, locationProvider) {
            //httpProvider.responseInterceptors.push(presApp.errorCheckInterceptor);
        }
    ]);

    presApp.config(['$provide', '$httpProvider',
        function($provide, $httpProvider) {

            // Intercept http calls.
            $provide.factory('MyHttpInterceptor', ['$q', '$window',
                function($q, $window) {
                    return {
                        // On request success
                        request: function(config) {
                            var userInfo = JSON.parse($window.sessionStorage["userInfo"]);
                           
                            if (userInfo && userInfo.authToken) {
                                config.headers['x-session-token'] = userInfo.authToken;
                            }

                            if (-1 == config.url.indexOf(".html")) {
                                config.url = "http://localhost:9000/" + config.url;
                            }
                            console.log(config);
                            // Return the config or wrap it in a promise if blank.
                            return config || $q.when(config);
                        },

                        // On request failure
                        requestError: function(rejection) {
                            // console.log(rejection); // Contains the data about the error on the request.

                            // Return the promise rejection.
                            return $q.reject(rejection);
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
                            // console.log(rejection); // Contains the data about the error.

                            // Return the promise rejection.
                            return $q.reject(rejection);
                        }
                    };
                }
            ]);
            // Add the interceptor to the $httpProvider.
            $httpProvider.interceptors.push('MyHttpInterceptor');
        }
    ]);

}());