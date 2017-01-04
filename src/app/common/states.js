(function () {
    'use strict';

    angular.module('elimika.common.states', [])

    .config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
        .state('base', {
            ncyBreadcrumb: {
                label: 'Elimika',
            },
            redirectTo: 'dashboard',
            views: {
                'base': {
                    templateUrl: 'app/common/tpl/base.html',
                },
            },
        })

        .state('auth', {
            views: {
                'base': {
                    templateUrl: 'app/common/tpl/auth.html',
                },
            },
        })

        .state('landing', {
            url: '/elimika',
            views: {
                'base': {
                    templateUrl: 'app/common/tpl/landing.html',
                },
            },
        });
    }

})();
