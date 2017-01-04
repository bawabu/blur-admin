(function () {
    'use strict';

    angular.module('elimika.knowledge.components.categoryNetwork', [])

    .component('categoryNetwork', {
        controller: categoryNetworkCtrl,
        controllerAs: 'cn',
        templateUrl: 'app/knowledge/tpl/category_network.html',
    });

    categoryNetworkCtrl.$inject = ['$state'];

    function categoryNetworkCtrl($state) {
        var self = this;

        var nodes = new vis.DataSet([
            { id: 1, label: 'Teeth', uuid: 'c3511e44-e16f-411e-a04a-ba3267556338' },
            { id: 2, label: 'Teeth types', uuid: '1f81e809-9aac-4c42-a1ed-df6078f49f9c' },
            { id: 3, label: 'Incisors', uuid: '0a6b1e5c-b3ec-4934-b080-9ba0056a504b' },
            { id: 4, label: 'Incisor functions', uuid: '716a686f-22c8-47dc-8fd1-cee0156b82cc' },
            { id: 5, label: 'Canines', uuid: '5cb78d04-5ff5-42f0-a382-94400fa29097' },
            { id: 6, label: 'Canine functions', uuid: 'e850d271-893a-42b1-93ae-2d2c14919bfe' },
            { id: 7, label: 'Premolars', uuid: 'a0764a6a-e292-4212-9409-230dff9fbc9b' },
            { id: 8, label: 'Premolar functions', uuid: '27905c0b-38ff-497c-9980-141597345ac1' },
            { id: 9, label: 'Molars', uuid: 'c4c7a5d6-472d-4653-a5da-591df314904d' },
            { id: 10, label: 'Molar functions', uuid: '6e039381-bdb7-4d97-a8d6-3533afe7f549' },
            { id: 11, label: 'Teeth sets', uuid: 'c62af197-7f28-4908-8e0a-ca845e38ea1a' },
            { id: 12, label: 'Deciduous', uuid: 'de118602-6c7b-412b-91c2-bd6eeb36d799' },
            { id: 13, label: 'Permanent', uuid: 'cd2e29e1-62e2-450a-a2e3-22b596fdc0ec' },
        ]);

        // create an array with edges
        var edges = new vis.DataSet([
            { from: 1, to: 2 }, { from: 1, to: 11 },
            { from: 2, to: 3 }, { from: 2, to: 5 }, { from: 2, to: 7 }, { from: 2, to: 9 },
            { from: 3, to: 4 }, { from: 5, to: 6 }, { from: 7, to: 8 }, { from: 9, to: 10 },
            { from: 11, to: 12 }, { from: 11, to: 13 },
        ]);

        // create a network
        var container = document.getElementById('categoryNetwork');

        // provide the data in the vis format
        var data = {
            nodes: nodes,
            edges: edges,
        };
        var options = {
            height: '700px',
            layout: {
                hierarchical: {
                    enabled: true,
                    nodeSpacing: 200,
                    sortMethod: 'directed',
                },
            },
            interaction: {
                dragNodes: false,
                dragView: false,
                zoomView: false,
                hover: true,
            },
        };

        // initialize your network!
        var network = new vis.Network(container, data, options);

        // onClick event
        network.on('selectNode', selectNode);

        function selectNode(net) {
            var node = net.nodes[0];

            if (node) {
                var uuid = nodes._data[node].uuid;
                var label = nodes._data[node].label;
                $state.go('categories.knowledge', { id: uuid, label: label });
            }
        }
    }
})();
