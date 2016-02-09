(function() {

    'use strict';

    presApp.service('SessionService', ['$window', '$rootScope',
        function($window, $rootScope) {
            var self = this;
            var factory = {};
            var user = null;
            var session = {};

            $rootScope.$on('logoutEvent', function(e, data) {
                self.destroy();
            });

            $rootScope.$on('authSuccess', function(e, data) {
                factory.setUser(data.user);
                self.create(data.authToken, data.username, null);
                $rootScope.isLoggedIn = true;
            });

            factory.getUser = function() {
                if(!user || !user.username) {
                    user = $window.sessionStorage["sessionUser"];
                    user = (user) ? JSON.parse(user) : {};
                }

                return user;
            };

            factory.setUser = function(user) {
                if(user && user.username) {
                    $window.sessionStorage["sessionUser"] = JSON.stringify(user);
                }
            };

            factory.getIsUserAuthenticated = function() {
                factory.getSession();
                return session && session.id;
            };

            factory.getSession = function() {
                if(!session || !session.id) {
                    session = $window.sessionStorage["session"];
                    session = (session) ? JSON.parse(session) : {};
                }

                return session;
            }

            this.create = function(sessionId, userId, userRole) {
                if(!sessionId || !userId) return;
                session.id = sessionId;
                session.userId = userId;
                session.userRole = userRole;

                $window.sessionStorage["session"] = JSON.stringify(session);
            };

            this.destroy = function() {
                session.id = null;
                session.userId = null;
                session.userRole = null;

                $window.sessionStorage.removeItem("session");
                $window.sessionStorage.removeItem("sessionUser");
            };

            return factory;
        }
    ]);

}());