(function () {
    'use strict';

    angular.module('elimika.common.components.form', [])

    .component('elimikaForm', {
        bindings: {
            formTitle: '@',
            formHelpText: '@',
            service: '@',
            cancelState: '@',
            idParam: '@',
            urlName: '@',
        },
        controller: elimikaFormCtrl,
        controllerAs: 'form',
        templateUrl: 'app/common/tpl/form.html',
    });

    elimikaFormCtrl.$inject = [
        '$injector', '$state', '$http', 'elimika.common.services.elimikaAPIService'
    ];

    function elimikaFormCtrl($injector, $state, $http, apiServ) {
        var self = this;
        var formlyService = $injector.get(self.service);

        self.model = {};
        self.fields = formlyService.getFields();

        if (!angular.isUndefined(self.idParam)) {
            self.btnAction = 'Update';
            self.id = $state.params[self.idParam];

            apiServ.get(self.urlName, self.id).then(function (data) {
                self.model = data.data;
            });
        }

        self.saveFxn = function (form) {
            console.log('Model', self.model);
            if (form.$valid && !self.id) {
                apiServ.post(self.urlName, self.model).then(function (data) {
                    console.log('Post Data', data.data);
                });
            }

            if (form.$valid && form.$dirty && self.id) {
                apiServ.update(self.urlName, self.id, self.model, 'PUT').then(function (data) {
                    console.log('Update Data', data.data);
                });
            }
        };

        self.cancelFxn = function () {
            $state.go(self.cancelState);
        };
    }
})();
