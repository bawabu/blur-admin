(function () {
    'use strict';

    angular.module('elimika.dashboard.states', [])

    .config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
        .state('dashboard', {
            parent: 'base',
            url: '/dashboard',
            title: 'Dashboard',
            sidebarMeta: {
                icon: 'ion-ios-home-outline',
                order: 0,
            },
            views: {
                'content@base': {
                    template: '<elimika-dashboard></elimika-dashboard>',
                },
                'page-title@base': {
                    template: '<elimika-page-title page-title="Dashboard">' +
                    '</elimika-page-title>',
                },
            },
        });
    }

})();
