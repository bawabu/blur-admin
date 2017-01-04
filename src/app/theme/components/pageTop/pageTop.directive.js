/**
* @author v.lugovksy
* created on 16.12.2015
*/
(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
    .directive('pageTop', pageTop);

    /** @ngInject */
    function pageTop() {
        return {
            restrict: 'E',
            controller: pageTopCtrl,
            controllerAs: 'pt',
            templateUrl: 'app/theme/components/pageTop/pageTop.html'
        };
    }

    pageTopCtrl.$inject = ['elimika.auth.services.elimikaAuthService'];

    function pageTopCtrl(authServ) {
        var self = this;

        self.logout = function () {
            authServ.logout();
        };
    }

})();
