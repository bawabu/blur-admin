(function () {
    'use strict';

    angular.module('elimika.common.services.elimikaAPI', [])

    .constant('ELIMIKA_API_ADDR', 'http://127.0.0.1:8000/')

    .constant('ELIMIKA_API_REGISTRY', {
        'question': 'questions/questions/',
        'create-question': 'questions/questions/create_question_choices/',
        'learner': 'users/learners/',
        'category': 'knowledge/categories/',
        'knowledge': 'knowledge/knowledge/',
        'user': 'users/users/',
        'login': 'users/login/',
        'logout': 'users/logout/',
        'answer-stats': 'questions/answers/answer_stats/',
        'daily-answers': 'questions/daily_answers/',
        'statistics': 'questions/statistics/',
    })

    .factory('elimika.common.services.elimikaAPIService', elimikaAPIService);

    elimikaAPIService.$inject = [
        '$http', 'Upload', 'ELIMIKA_API_ADDR', 'ELIMIKA_API_REGISTRY', '$cookies',
    ];

    function elimikaAPIService($http, Upload, apiAddr, apiReg, $cookies) {

        function list(urlName, args) {
            var args = args || '';
            var endPoint = apiAddr + apiReg[urlName];

            return $http.get(endPoint, {params: args});
        }

        function get(urlName, id, args) {
            var args = args || '';
            var endPoint = apiAddr + apiReg[urlName] + id + '/';

            return $http.get(endPoint, {params: args});
        }

        function post(urlName, data) {
            var endPoint = apiAddr + apiReg[urlName];

            return $http.post(endPoint, data, {
                headers: { 'X-CSRFToken': $cookies.get('csrftoken') },
            });
        }

        function upload(urlName, data) {
            var endPoint = apiAddr + apiReg[urlName];

            return Upload.upload({
                url: endPoint,
                data: data,
                headers: { 'X-CSRFToken': $cookies.get('csrftoken') },
                withCredentials: true,
            });
        }

        function update(urlName, id, data, method) {
            var endPoint = apiAddr + apiReg[urlName] + id + '/';

            if (method === 'PUT') {
                return $http.put(endPoint, data, {
                    headers: { 'X-CSRFToken': $cookies.get('csrftoken') },
                });
            } else if (method === 'PATCH') {
                return $http.patch(endPoint, data, {
                    headers: { 'X-CSRFToken': $cookies.get('csrftoken') },
                });
            } else {
                throw new Error(
                    'Method supplied is not valid. Should either be PUT or PATCH');
            }
        }

        function remove(urlName, id) {
            var endPoint = apiAddr + apiReg[urlName] + id + '/';

            return $http.delete(endPoint, {
                headers: { 'X-CSRFToken': $cookies.get('csrftoken') }
            });
        }

        return {
            list: list,
            get: get,
            post: post,
            upload: upload,
            update: update,
            remove: remove,
        };
    }
})();
