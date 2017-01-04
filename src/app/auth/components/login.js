(function () {
    'use strict';

    angular.module('elimika.auth.components.login', [])

    .component('elimikaLogin', {
        controller: elimikaLoginCtrl,
        controllerAs: 'login',
        templateUrl: 'app/auth/tpl/login.html',
    });

    elimikaLoginCtrl.$inject = [
        'elimika.auth.services.elimikaAuthService', '$state',
    ];

    function elimikaLoginCtrl(authServ, $state) {
        var self = this;
        self.model = {};

        activate();

        self.login = function() {
            if (self.model.username && self.model.password) {
                authServ.login(self.model);
            }
        };

        function activate() {
            if (authServ.isAuthenticated()) {
                $state.go('dashboard');
            }
        }
    }
})();
