(function() {

    'use strict';

    function SessionService($window, $rootScope) {
        var self = this;
        var factory = {};
        var user = null;
        var session = {};

        $rootScope.$on('logoutEvent', function(e, data) {
            $rootScope.isLoggedIn = false;
            self.destroy();
        });

        $rootScope.$on('authSuccess', function(e, data) {
            user = data.user || {};
            if (factory.getRemember()) factory.setUser(user);
            self.create(data.authToken, user.username, null);
            $rootScope.isLoggedIn = true;
        });

        factory.getUser = function() {
            if (!user || !user.username) {
                user = $window.sessionStorage["sessionUser"];
                user = (user) ? JSON.parse(user) : {};
            }

            return user;
        };

        factory.setUser = function(user) {
            if (user && user.username) {
                $window.sessionStorage["sessionUser"] = JSON.stringify(user);
            }
        };

        factory.setRemember = function(remember) {
            $window.sessionStorage["remember"] = remember;
        };

        factory.getRemember = function() {
            return $window.sessionStorage["remember"];
        };

        factory.getIsUserAuthenticated = function() {
            factory.getSession();
            return session && session.id;
        };

        factory.getSession = function() {
            if (!session || !session.id) {
                session = $window.sessionStorage["session"];
                session = (session) ? JSON.parse(session) : {};
            }

            return session;
        }

        this.create = function(sessionId, userId, userRole) {
            if (!sessionId || !userId) return;
            session.id = sessionId;
            session.userId = userId;
            session.userRole = userRole;

            if (factory.getRemember()) $window.sessionStorage["session"] = JSON.stringify(session);
        };

        this.destroy = function() {
            session.id = null;
            session.userId = null;
            session.userRole = null;

            $window.sessionStorage.removeItem("session");
            $window.sessionStorage.removeItem("sessionUser");
            $window.sessionStorage.removeItem("remember");
        };

        return factory;
    }

    SessionService.$inject = ['$window', '$rootScope'];

    presApp.service('SessionService', SessionService);

}());