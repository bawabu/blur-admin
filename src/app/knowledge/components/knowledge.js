(function () {
    'use strict';

    angular.module('elimika.knowledge.components.knowledge', [])

    .component('knowledge', {
        controller: knowledgeCtrl,
        controllerAs: 'kc',
        templateUrl: 'app/knowledge/tpl/knowledge.html',
    });

    knowledgeCtrl.$inject = [
        '$state', 'elimika.common.services.elimikaAPIService', '$uibModal',
    ];

    function knowledgeCtrl($state, apiServ, $uibModal) {
        var self = this;
        var category_id = $state.params.id;
        self.knowledge_title = $state.params.label;

        self.$onInit = function () {
            apiServ.list('knowledge', { category: category_id }).then(
                function (response) {
                    self.category_knowledge = response.data.reverse();
                }
            );
        };

        self.open = function (image) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/knowledge/tpl/image_modal.html',
                size: 'sm',
                controller: function () {
                    this.image = image;
                },
                controllerAs: 'im',
            });
        }
    }
})();
