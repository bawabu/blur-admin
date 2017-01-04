(function () {
    'use strict';

    angular.module('elimika.questions.components.newQuestion', [])

    .component('newQuestion', {
        controller: newQuestionCtrl,
        controllerAs: 'form',
        templateUrl: 'app/questions/tpl/new_question.html',
    });

    newQuestionCtrl.$inject = [
        '$state', 'elimika.common.services.elimikaAPIService'
    ];

    function newQuestionCtrl($state, apiServ) {
        var self = this;
        self.model = {};
        self.model.choices = [
            { is_right: false },
            { is_right: false },
            { is_right: false },
            { is_right: false }
        ];

        self.save = function () {
            apiServ.upload('create-question', self.model).then(function (response) {
                console.log(response);
                $state.go('questions');
            }, function (err) {
                console.log(err);
            });
        };

        self.cancel = function () {
            $state.go('questions');
        };
    }
})();
