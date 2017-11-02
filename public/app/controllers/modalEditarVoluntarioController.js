'use strict';
angular.module('modalEditarVoluntarioController', [])
    .controller('modalEditarVoluntarioController', [
        '$scope',
        '$http',
        '$mdDialog',
        'formatDateService',
        'Voluntarios',
        'voluntarioModal', function ($scope, $http, $mdDialog, formatDateService, Voluntarios, voluntarioModal) {
            $scope.estados = ["AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA",
                "PB", "PR", "PE", "PI", "RJ", "RN", "RO", "RS", "RR", "SC", "SE", "SP", "TO"];
            $scope.escolaridades = [
                "Fundamental - Incompleto",
                "Fundamental - Completo",
                "Médio - Incompleto",
                "Médio - Completo",
                "Superior - Incompleto",
                "Superior - Completo",
                "Pós-graduação - (Lato senso) - Incompleto",
                "Pós-graduação - (Lato senso) - Completo",
                "Pós-graduação - (Stricto sensu, nível mestrado) - Incompleto",
                "Pós-graduação - (Stricto sensu, nível mestrado) - Completo",
                "Pós-graduação - (Stricto sensu, nível doutor) - Incompleto",
                "Pós-graduação - (Stricto sensu, nível doutor) - Completo"
            ];
            $scope.situacoesProfissionais = ["Estudante", "Empregado", "Desempregado", "Aposentado", "Outro"];
            $scope.disponibilidades = ["Manhã", "Tarde", "Noite", "Integral"];
            $scope.voluntario = voluntarioModal;
            $scope.voluntario.dataNasc = new Date($scope.voluntario.dataNasc);
            $scope.voluntario.confSenha = $scope.voluntario.senha;
            $scope.cancel = function () {
                $mdDialog.cancel();
            }

            $scope.atualizar = function () {
                if ($scope.voluntario.senha === $scope.voluntario.confSenha) {
                    $scope.voluntario.areas_interesse = $scope.voluntario.areas_interesse.map(function (item) {
                        return item.toLowerCase();
                    });
                    Voluntarios.update($scope.voluntario).success(function (result) {
                        $mdDialog.cancel();
                    });
                }
            }
        }]);                           