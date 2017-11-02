'use strict';
angular.module('modalEditarOrganizacaoController', [])
    .controller('modalEditarOrganizacaoController', [
        '$scope',
        '$http',
        '$mdDialog',
        'formatDateService',
        'Organizacoes',
        'organizacaoModal', function ($scope, $http, $mdDialog, formatDateService, Organizacoes, organizacaoModal) {
            $scope.estados = ["AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA",
                "PB", "PR", "PE", "PI", "RJ", "RN", "RO", "RS", "RR", "SC", "SE", "SP", "TO"];
            $scope.organizacao = organizacaoModal;
            $scope.organizacao.confSenha = $scope.organizacao.senha;

            $scope.cancel = function () {
                $mdDialog.cancel();
            }

            $scope.atualizar = function () {
                if ($scope.organizacao.senha === $scope.organizacao.confSenha) {
                    $scope.organizacao.areas_interesse = $scope.organizacao.areas_interesse.map(function (item) {
                        return item.toLowerCase();
                    });
                    Organizacoes.update($scope.organizacao).success(function (result) {
                        $mdDialog.cancel();
                    });
                }
            }
        }]);                           