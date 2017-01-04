(function () {
    'use strict';

    angular.module('elimika.questions.states', [])

    .config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
        .state('questions', {
            data: {
                columns: [
                    {
                        title: 'Question',
                        field: 'question',
                    },
                    {
                        title: 'Category',
                        field: 'category_name',
                    },
                    {
                        title: 'Action',
                        field: null,
                    },
                ],
                params: {
                    fields: 'question,category',
                },
            },
            parent: 'base',
            url: '/questions',
            title: 'Questions',
            sidebarMeta: {
                icon: 'ion-clipboard',
                order: 2,
            },
            views: {
                'content@base': {
                    templateUrl: 'app/questions/tpl/questions.html',
                },
                'page-title@base': {
                    template: '<elimika-page-title state-ref="questions.new" ' +
                    'icon="ion-ios-plus-outline" page-title="Questions" ' +
                    'action-name="New Question"></elimika-page-title>',
                },
            },
        })
        .state('questions.new', {
            url: '/new_question',
            views: {
                'content@base': {
                    template: '<new-question></new-question>',
                },
                'page-title@base': {
                    template: '<elimika-page-title state-ref="questions" ' +
                    'icon="ion-ios-list-outline" page-title="New Question" ' +
                    'action-name="Questions List"></elimika-page-title>',
                },
            },
        })
        .state('questions.new.choices', {
            url: '/:id/choices',
            views: {
                'content@base': {
                    template: '<question-choices></question-choices>',
                },
                'page-title@base': {
                    template: '<elimika-page-title state-ref="questions" ' +
                    'icon="ion-ios-list-outline" page-title="Question Choices" ' +
                    'action-name="Questions List"></elimika-page-title>',
                },
            },
        })
        .state('questions.edit', {
            url: '/:id/edit_question',
            views: {
                'content@base': {
                    templateUrl: 'app/questions/tpl/edit_question.html',
                },
                'page-title@base': {
                    template: '<elimika-page-title state-ref="questions" ' +
                    'icon="ion-ios-list-outline" page-title="Edit Question" ' +
                    'action-name="Questions List"></elimika-page-title>',
                },
            },
        });
    }

})();
