'use strict';
angular.module('modalDeletarVoluntarioController', [])
    .controller('modalDeletarVoluntarioController', [
        '$scope',
        '$mdDialog',
        'Voluntarios',
        'voluntarioModal', function ($scope, $mdDialog, Voluntarios, voluntarioModal) {            
            $scope.voluntario = voluntarioModal.voluntario;
            $scope.voluntarios = voluntarioModal.voluntarios;
            $scope.index = voluntarioModal.index;
            console.log($scope.voluntario);
            $scope.cancel = function () {
                $mdDialog.cancel();
            }

            $scope.deletar = function () {                
                console.log($scope.voluntario);
                if ($scope.voluntario.confEmail === $scope.voluntario.email &&
                    $scope.voluntario.confSenha === $scope.voluntario.senha) {
                    Voluntarios.delete($scope.voluntario._id).success(function (result) {
                        $scope.voluntarios.splice($scope.index, 1);
                        $mdDialog.cancel();
                    });
                } else {
                    $scope.error = 'senha ou email não conferem';                  
                    console.log($scope.error);  
                }
            }
        }]);                           