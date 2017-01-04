(function () {
    'use strict';

    angular.module('elimika.preogress.states', [])

    .config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
        .state('progress', {
            data: {
                columns: [
                    {
                        title: 'Learner\'s Name',
                        field: 'name',
                    },
                    {
                        title: 'Age',
                        field: 'age',
                    },
                    {
                        title: 'Gender',
                        field: 'gender',
                    },
                    {
                        title: 'Action',
                        field: null,
                    },
                ],
            },
            parent: 'base',
            url: '/progress',
            title: 'Learners\' Progress',
            sidebarMeta: {
                icon: 'ion-arrow-graph-up-right',
                order: 3,
            },
            views: {
                'content@base': {
                    templateUrl: 'app/progress/tpl/progress.html',
                    controller: 'elimika.progress.controller.progressOverviewCtrl',
                    controllerAs: 'po',
                },
                'page-title@base': {
                    template: '<elimika-page-title state-ref="progress.learners" ' +
                    'icon="ion-ios-list-outline" page-title="Learners\' Progress Overview" ' +
                    'action-name="Learners List"></elimika-page-title>',
                },
            },
        })
        .state('progress.learnerProgress', {
            url: '/:id/learner_progress',
            views: {
                'content@base': {
                    templateUrl: 'app/progress/tpl/learner_progress.html',
                    controller: 'elimika.progress.controller.learnerProgressCtrl',
                    controllerAs: 'lr',
                },
                'page-title@base': {
                    template: '<elimika-page-title state-ref="progress.learners" ' +
                    'icon="ion-ios-list-outline" page-title="Learner Progress" ' +
                    'action-name="Learners List"></elimika-page-title>',
                },
            },
        });
    }

})();
