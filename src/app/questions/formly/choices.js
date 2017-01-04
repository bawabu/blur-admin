(function () {
    'use strict';

    angular.module('elimika.questions.formly.choices', [])

    .factory('elimika.questions.formly.choices', choicesFormly);

    function choicesFormly() {
        function getFields() {
            var fields = [
                {
                    key: 'question_choices',
                    type: 'repeatSection',
                    templateOptions: {
                        btnText: 'Add a choice',
                        fields: [
                            {
                                className: 'row',
                                fieldGroup: [
                                    {
                                        className: 'col-md-6 col-sm-12 pad-l-0',
                                        key: 'choice_text',
                                        type: 'input',
                                        templateOptions: {
                                            label: 'Choice Text',
                                            type: 'text',
                                        },
                                    },
                                    {
                                        className: 'col-md-6 col-sm-12 pad-r-0',
                                        key: 'choice_image',
                                        type: 'input',
                                        templateOptions: {
                                            label: 'Choice Image',
                                            type: 'file',
                                        },
                                    },
                                ],
                            },
                            {
                                key: 'is_right',
                                type: 'checkbox',
                                templateOptions: {
                                    label: 'Is this choice the correct answer?',
                                },
                            },
                        ],
                    },
                },
            ];
            return fields;
        }
        return {
            'getFields': getFields,
        };
    }
}());
