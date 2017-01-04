(function () {
    'use strict';

    angular.module('elimika.common.components.list', [])

    .component('elimikaList', {
        bindings: {
            nextState: '@',
            urlName: '@',
        },
        controller: elimikaListCtrl,
        controllerAs: 'list',
        templateUrl: 'app/common/tpl/list.html',
    });

    elimikaListCtrl.$inject = [
        '$scope', '$compile', 'DTOptionsBuilder', 'DTColumnBuilder', '$state',
        '$http', '$q', 'elimika.common.services.elimikaAPIService',
    ];

    function elimikaListCtrl($scope, $compile, DTOptionsBuilder, DTColumnBuilder,
        $state, $http, $q, elimikaServ) {

        var self = this;
        var cols = $state.current.data.columns;

        self.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
            var defer = $q.defer();

            elimikaServ.list(self.urlName).then(function (data) {
                defer.resolve(data.data);
            });

            return defer.promise;
        }).withPaginationType('full_numbers').withOption('createdRow', createdRow);

        self.dtColumns = [];
        cols.forEach(function (col) {
            var newColumn;

            if (col.title == 'Action' || col.title == 'Actions') {
                newColumn = DTColumnBuilder.newColumn(null).withTitle(
                    col.title).notSortable().renderWith(rowActions);
            } else {
                newColumn = DTColumnBuilder.newColumn(col.field).withTitle(col.title);
            }

            self.dtColumns.push(newColumn);
        });

        self.goEdit = function (id) {
            $state.go(self.nextState, {id: id});
        };

        function createdRow(row, data, dataIndex) {
            $compile(angular.element(row).contents())($scope);
        }

        function rowActions(data) {
            return '<div class="btn-wrapper">' +
                '<button ng-click="list.goEdit(\'' + data.id + '\')" class="btn btn-primary">' +
                '<i class="ion-edit"></i> View</button></div>';
        }
    }
})();
