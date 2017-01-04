(function () {
    'use strict';

    angular.module('elimika.preogress.controllers.learnerProgress', [])

    .controller('elimika.progress.controller.learnerProgressCtrl', progressOverviewCtrl);

    progressOverviewCtrl.$inject = [
        'elimika.common.services.elimikaAPIService', '$state'
    ];

    function progressOverviewCtrl(apiServ, $state) {
        var self = this;

        apiServ.get('learner', $state.params.id).then(function (response) {
            self.learner_name = response.data.name;
            var seriesResp = [];

            self.chartConfig = {

                options: {
                    chart: {
                        type: 'spline',
                    },
                    tooltip: {
                        crosshairs: true,
                        shared: true,
                        valueSuffix: '%',
                    },
                },
                series: [
                    {
                        name: response.data.name,
                        data: response.data.performance
                    }
                ],
                title: {
                    text: 'Progress Overview for ' + response.data.name
                },
                xAxis: {
                    categories: ['Teeth', 'Teeth Types', 'Teeth Sets'],
                },
                yAxis: {
                    currentMin: 0,
                    currentMax: 100,
                    title: { text: 'Percentage' },
                    labels: {
                        formatter: function () {
                            return this.value + '%';
                        },
                    },
                    tickInterval: 10,
                },
            };
        }, function (err) {
            console.log(err);
        });
    }
})();
