(function () {
    'use strict';

    angular.module('elimika.auth.services.elimikaAuth', [])

    .factory('elimika.auth.services.elimikaAuthService', elimikaAuthService);

    elimikaAuthService.$inject = [
        'elimika.common.services.elimikaAPIService', '$cookies', '$state',
    ];

    function elimikaAuthService(apiServ, $cookies, $state) {

        function register(data) {
            return apiServ.post('user', data).then(function (response) {
                login({
                    username: response.data.username,
                    password: response.data.password
                });
            });
        }

        function login(data) {
            return apiServ.post('login', data).then(function (response) {
                setAuthenticatedUser(response.data);
                $state.go('dashboard');
            });
        }

        function logout() {
            return apiServ.post('logout', {}).then(function () {
                unauthenticate();
                $state.go('login');
            });
        }

        function getAuthenticatedUser() {
            if (!$cookies.get('authenticated_user')) {
                return;
            }

            return JSON.parse($cookies.get('authenticated_user'));
        }

        function isAuthenticated() {
            return !!$cookies.get('authenticated_user');
        }

        function setAuthenticatedUser(user) {
            $cookies.put('authenticated_user', JSON.stringify(user));
        }

        function unauthenticate() {
            $cookies.remove('authenticated_user');
        }

        return {
            login: login,
            logout: logout,
            register: register,
            getAuthenticatedUser: getAuthenticatedUser,
            isAuthenticated: isAuthenticated,
            setAuthenticatedUser: setAuthenticatedUser,
            unauthenticate: unauthenticate,
        };
    }
})();
