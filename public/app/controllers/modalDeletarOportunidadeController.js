'use strict';
angular.module('modalDeletarOportunidadeController', [])
    .controller('modalDeletarOportunidadeController', [
        '$scope',
        '$mdDialog',
        'Oportunidades',
        'oportunidadeModal', function ($scope, $mdDialog, Oportunidades, oportunidadeModal) {
            console.log('oportunidadeModal', oportunidadeModal);
            $scope.oportunidade = oportunidadeModal.oportunidade;
            $scope.oportunidades = oportunidadeModal.oportunidades;
            $scope.index = oportunidadeModal.index;

            $scope.cancel = function () {
                $mdDialog.cancel();
            }

            $scope.deletar = function () {
                console.log($scope.oportunidade);
                if ($scope.oportunidade.confEmail === $scope.oportunidade.organizacao_id.email &&
                    $scope.oportunidade.confSenha === $scope.oportunidade.organizacao_id.senha) {
                    Oportunidades.delete($scope.oportunidade._id).success(function (result) {
                        $scope.oportunidades.splice($scope.index, 1);
                        $mdDialog.cancel();
                    });
                } else {
                    $scope.error = 'senha ou email não conferem';
                }
            }
        }]);                           