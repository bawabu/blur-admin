(function () {
    'use strict';

    angular.module('elimika.config', [])

    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode(true);
    }])

    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.withCredentials = true;
    }])

    .run(['$rootScope', '$state', 'elimika.auth.services.elimikaAuthService',
        function ($rootScope, $state, authServ) {
            // Redirect to login if not logged in
            $rootScope.$on('$stateChangeStart', function (e, toState) {
                if (toState.name === 'login' || toState.name === 'register') {
                    // no need to redirect if going to login page
                    return;
                }

                if (!authServ.isAuthenticated()) {
                    // stop current execution then redirect
                    e.preventDefault();
                    $state.go('login');
                }
            })
        }
    ]);
})();
