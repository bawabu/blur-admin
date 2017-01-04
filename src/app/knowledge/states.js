(function () {
    'use strict';

    angular.module('elimika.knowledge.states', [])

    .config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
        .state('categories', {
            parent: 'base',
            url: '/categories',
            title: 'Knowledge',
            sidebarMeta: {
                icon: 'ion-ios-book-outline',
                order: 1,
            },
            views: {
                'content@base': {
                    template: '<category-network></category-network>',
                },
                'page-title@base': {
                    template: '<elimika-page-title ' +
                    'page-title="Knowledge Categories"' +
                    '></elimika-page-title>',
                },
            },
        })

        .state('categories.knowledge', {
            url: '/:id/knowledge',
            params: { label: '' },
            views: {
                'content@base': {
                    template: '<knowledge></knowledge>',
                },
                'page-title@base': {
                    template: '<elimika-page-title ' +
                    'page-title="Knowledge"></elimika-page-title>',
                },
            },
        });
    }

})();
