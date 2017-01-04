(function () {
    'use strict';

    angular.module('elimika.questions.components.questionChoices', [])

    .component('questionChoices', {
        controller: questionChoicesCtrl,
        controllerAs: 'choices',
        templateUrl: 'app/questions/tpl/question_choices.html',
    });

    questionChoicesCtrl.$inject = [
        '$state', 'elimika.common.services.elimikaAPIService'
    ];

    function questionChoicesCtrl($state, apiServ) {
        var self = this;
        var question_id = $state.params.id;
        self.model = {};

        if (!question_id) {
            $state.go('questions');
        }

        self.$onInit = function () {
            apiServ.get('question', question_id).then(function (response) {
                self.model = response.data;
            }, function (err) {
                console.log(err);
            });
        };

        self.save = function () {
            apiServ.upload('question', self.model).then(function (response) {
                console.log(response);
            }, function (err) {
                console.log(err);
            });
        };

        self.cancel = function () {
            $state.go('questions');
        };
    }
})();
