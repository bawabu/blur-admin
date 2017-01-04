(function () {
    'use strict';

    angular.module('elimika.questions.formly.question', [])

    .factory('elimika.questions.formly.question', questionFormly);

    function questionFormly() {
        function getFields() {
            var fields = [
                {
                    key: 'question',
                    type: 'textarea',
                    templateOptions: {
                        label: 'Question',
                        placeholder: 'Question text',
                        rows: 4,
                        required: true,
                    }
                },
                {
                    key: 'category',
                    type: 'select',
                    templateOptions: {
                        label: 'Question Category',
                        valueProp: 'id',
                        labelProp: 'name',
                        options: [
                            {
                                name: 'Teeth',
                                id: 'c3511e44-e16f-411e-a04a-ba3267556338',
                            },
                            {
                                name: 'Teeth types',
                                id: '1f81e809-9aac-4c42-a1ed-df6078f49f9c',
                            },
                            {
                                name: 'Teeth sets',
                                id: 'c62af197-7f28-4908-8e0a-ca845e38ea1a',
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
