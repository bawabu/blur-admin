(function () {
    'use strict';

    angular.module('elimika.auth.states', [])

    .config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
        .state('register', {
            parent: 'auth',
            url: '/registration',
            views: {
                'content@auth': {
                    template: '<elimika-reg></elimika-reg>',
                },
            },
        })

        .state('login', {
            parent: 'auth',
            url: '/login',
            views: {
                'content@auth': {
                    template: '<elimika-login></elimika-login>',
                },
            },
        });
    }
})();
