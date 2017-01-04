(function () {
    'use strict';

    angular.module('elimika.common.components.pageTitle', [])

    .component('elimikaPageTitle', {
        bindings: {
            stateRef: '@',
            icon: '@',
            pageTitle: '@',
            actionName: '@',
        },
        templateUrl: 'app/common/tpl/page_title.html',
    });
})();
