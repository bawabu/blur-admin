(function () {
    'use strict';

    angular.module('elimika.auth.components.registration', [])

    .component('elimikaReg', {
        controller: elimikaRegCtrl,
        controllerAs: 'reg',
        templateUrl: 'app/auth/tpl/registration.html',
    });

    elimikaRegCtrl.$inject = [
        'elimika.auth.services.elimikaAuthService',
    ];

    function elimikaRegCtrl(authServ) {
        var self = this;
        self.model = {};

        self.register = function() {
            if (self.model.username && self.model.password) {
                authServ.register(self.model);
            }
        };
    }
})();
