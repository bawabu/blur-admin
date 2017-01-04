(function () {
    'use strict';

    angular.module('elimika.preogress.controllers.progressOverview', [])

    .controller('elimika.progress.controller.progressOverviewCtrl', progressOverviewCtrl);

    progressOverviewCtrl.$inject = ['elimika.common.services.elimikaAPIService'];

    function progressOverviewCtrl(apiServ) {
        var self = this;

        apiServ.list('learner').then(function (response) {
            var seriesResp = [];

            response.data.forEach(function (el) {
                var tmp = {
                    name: el.name,
                    data: el.performance
                };
                seriesResp.push(tmp);
            });

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
                series: seriesResp,
                title: {
                    text: 'Learners\' Progress Overview'
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
