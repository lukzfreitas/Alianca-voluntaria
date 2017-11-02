'use strict';
angular.module('modalOportunidadesController', [])
    .controller('modalOportunidadesController', ['$scope', '$http', '$mdDialog', 'oportunidades', function ($scope, $http, $mdDialog, oportunidades) {
        $scope.oportunidades = oportunidades;
        $scope.oportunidade = {};

        $scope.cancel = function () {
            $mdDialog.cancel();
        }

        $scope.selecionar = function (oportunidade) {
            $scope.oportunidade = oportunidade;
        }
    }]);