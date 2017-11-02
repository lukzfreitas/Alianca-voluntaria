'use strict';
angular.module('modalDeletarOrganizacaoController', [])
    .controller('modalDeletarOrganizacaoController', [
        '$scope',
        '$mdDialog',
        'Organizacoes',
        'organizacaoModal', function ($scope, $mdDialog, Organizacoes, organizacaoModal) {
            console.log('organizacaoModal', organizacaoModal);
            $scope.organizacao = organizacaoModal.organizacao;
            $scope.organizacoes = organizacaoModal.organizacoes;
            $scope.index = organizacaoModal.index;

            $scope.cancel = function () {
                $mdDialog.cancel();
            }

            $scope.deletar = function () {
                console.log($scope.organizacao);
                if ($scope.organizacao.confEmail === $scope.organizacao.email &&
                    $scope.organizacao.confSenha === $scope.organizacao.senha) {
                    Organizacoes.delete($scope.organizacao._id).success(function (result) {
                        $scope.organizacoes.splice($scope.index, 1);
                        $mdDialog.cancel();
                    });
                } else {
                    $scope.error = 'senha ou email não conferem';
                }
            }
        }]);                           