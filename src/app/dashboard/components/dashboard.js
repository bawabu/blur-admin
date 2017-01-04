(function () {
    'use strict';

    angular.module('elimika.dashboard.components.dashboard', [])

    .component('elimikaDashboard', {
        controller: elimikaDashboardCtrl,
        controllerAs: 'ed',
        templateUrl: 'app/dashboard/tpl/dashboard.html',
    });

    elimikaDashboardCtrl.$inject = [
        'baConfig', 'colorHelper', 'elimika.common.services.elimikaAPIService',
    ];

    function elimikaDashboardCtrl(baConfig, colorHelper, apiServ) {
        var self = this;
        var dashboardColors = baConfig.colors.dashboard;
        var ctx = document.getElementById('answerChart').getContext('2d');

        // google.charts.load('current', { packages: ['calendar'] });
        // google.charts.setOnLoadCallback(drawAnswerCalendar);

        apiServ.list('statistics').then(function (response) {
            self.statistics = [
                {
                    title: 'Learners Statistics',
                    number: response.data.learners + ' Learners',
                    icon: 'ion-ios-people-outline',
                },
                {
                    title: 'Questions Statistics',
                    number: response.data.questions + ' Questions',
                    icon: 'ion-ios-help-outline',
                },
                {
                    title: 'Response Statistics',
                    number: response.data.answers + ' Responses',
                    icon: 'ion-ios-compose-outline',
                },
            ];
        });

        apiServ.list('answer-stats').then(function (response) {
            var data = response.data;

            self.totalAnswers = data.total_answers;
            self.answerStats = [
                {
                    value: data.teeth.total,
                    color: dashboardColors.white,
                    highlight: colorHelper.shade(dashboardColors.white, 15),
                    label: 'Teeth',
                    correct: data.teeth.right,
                    wrong: data.teeth.wrong,
                    order: 0,
                },
                {
                    value: data.teeth_types.total,
                    color: dashboardColors.blueStone,
                    highlight: colorHelper.shade(dashboardColors.blueStone, 15),
                    label: 'Teeth Types',
                    correct: data.teeth_types.right,
                    wrong: data.teeth_types.wrong,
                    order: 1,
                },
                {
                    value: data.teeth_sets.total,
                    color: dashboardColors.gossip,
                    highlight: colorHelper.shade(dashboardColors.gossip, 15),
                    label: 'Teeth Sets',
                    correct: data.teeth_sets.right,
                    wrong: data.teeth_sets.wrong,
                    order: 2,
                }
            ];

            window.doughnut = new Chart(ctx).Doughnut(self.answerStats, {
                segmentShowStroke: false,
                percentageInnerCutout: 64,
                responsive: true,
            });
        });

        function drawAnswerCalendar() {
            apiServ.list('daily-answers').then(function (response) {
                var dataTable = new google.visualization.DataTable();
                dataTable.addColumn({ type: 'date', id: 'Date' });
                dataTable.addColumn({ type: 'number', id: 'Answers' });
                var daily_answers = [];

                response.data.forEach(function (el) {
                    var tmp = [
                        new Date(el.date), el.total_answers
                    ];
                    daily_answers.push(tmp);
                });
                dataTable.addRows(daily_answers);

                var chart = new google.visualization.Calendar(
                    document.getElementById('answerCalendar'));

                var options = {
                    title: 'Total Responses per Day',
                    height: 350,
                };

                chart.draw(dataTable, options);
            });
        }
    }
})();
