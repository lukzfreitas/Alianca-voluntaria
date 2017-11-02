'use strict';
angular.module('modalEditarOportunidadeController', [])
    .controller('modalEditarOportunidadeController', [
        '$scope',
        '$http',
        '$mdDialog',
        'formatDateService',
        'Oportunidades',
        'oportunidadeModal', function ($scope, $http, $mdDialog, formatDateService, Oportunidades, oportunidadeModal) {
            $scope.oportunidade = oportunidadeModal;
            console.log('oportunidade', $scope.oportunidade);
            $scope.oportunidade.dataInicio = new Date($scope.oportunidade.dataInicio);
            $scope.oportunidade.dataFim = new Date($scope.oportunidade.dataFim);
            $scope.cancel = function () {
                $mdDialog.cancel();
            }

            $scope.atualizar = function () {
                $scope.oportunidade.areas_interesse = $scope.oportunidade.areas_interesse.map(function (item) {
                    return item.toLowerCase();
                });
                Oportunidades.update($scope.oportunidade).success(function (result) {
                    $mdDialog.cancel();
                });
            }
        }]);                           