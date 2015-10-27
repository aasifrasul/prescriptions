(function() {

    'use strict';

    presApp.service('SessionService', ['$window', '$rootScope',
        function($window, $rootScope) {
            var self = this;
            var sessionService = {};
            var user = null;
            var session = {};

            $rootScope.$on('logoutEvent', function(e, data) {
                self.destroy();
            });

            $rootScope.$on('authSuccess', function(e, data) {
                sessionService.setUser(data.user);
                self.create(data.authToken, data.username, null);
                $rootScope.isLoggedIn = true;
            });

            sessionService.getUser = function() {
                if(!user || !user.username) {
                    user = $window.sessionStorage["sessionUser"];
                    user = (user) ? JSON.parse(user) : {};
                }

                return user;
            };

            sessionService.setUser = function(user) {
                $window.sessionStorage["sessionUser"] = JSON.stringify(user);
            };

            sessionService.getIsUserAuthenticated = function() {
                sessionService.getSession();
                return session && session.id;
            };

            sessionService.getSession = function() {
                if(!session || !session.id) {
                    session = $window.sessionStorage["session"];
                    session = (session) ? JSON.parse(session) : {};
                }

                return session;
            }

            this.create = function(sessionId, userId, userRole) {
                session.id = sessionId;
                session.userId = userId;
                session.userRole = userRole;

                $window.sessionStorage["session"] = JSON.stringify(session);
            };

            this.destroy = function() {
                session.id = null;
                session.userId = null;
                session.userRole = null;

                $window.sessionStorage["session"] = {};
                $window.sessionStorage["sessionUser"] = {};
            };

            return sessionService;
        }
    ]);

}());