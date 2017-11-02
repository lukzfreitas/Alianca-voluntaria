'use strict';
angular.module('voluntariosController', [])
    .controller('voluntariosController', [
        '$scope', 
        '$http', 
        '$mdDialog', 
        '$mdMedia', 
        '$location',
        'Voluntarios', function ($scope, $http, $mdDialog, $mdMedia, $location, Voluntarios) {
        $scope.voluntarios = [];
        $scope.voluntario = {};
        $scope.voluntario.contatos = { telefones: [], redes_sociais: [] };
        $scope.voluntario.areas_interesse = [];
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

        // =============================================================================
        // Busca Todos Voluntários ==================================================
        // =============================================================================
        Voluntarios.get().success(function (data) {
            $scope.voluntarios = data;
            console.log($scope.voluntarios);
        });
        // =============================================================================
        // Busca Voluntários ==================================================
        // =============================================================================
        $scope.buscar = function () {
            Voluntarios.findByAreaInteresse($scope.voluntario.pesquisa.toLowerCase()).success(function (data) {
                $scope.voluntarios = data;
            });
        };
        // =============================================================================
        // Criar Voluntário ==================================================
        // =============================================================================
        $scope.criarVoluntario = function () {
            if (!angular.isUndefined($scope.voluntario)) {
                if ($scope.voluntario.senha != $scope.voluntario.confSenha) {
                    return;
                }
                $scope.loading = true;
                $scope.voluntario.areas_interesse = $scope.voluntario.areas_interesse.map(function (item) {
                    return item.toLowerCase();
                });
                Voluntarios.create($scope.voluntario).success(function (data) {                    
                    $location.path('#/voluntarios');
                    $scope.loading = false;
                    $scope.voluntario = {};
                    $scope.voluntarios.push(data);
                });
            }
        };
        // =============================================================================
        // Editar Voluntário ==================================================
        // =============================================================================
        $scope.editar = function (voluntario) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            $mdDialog.show({
                controller: 'modalEditarVoluntarioController',
                templateUrl: 'app/views/modalEditarVoluntario.html',
                parent: angular.element(document.body),
                resolve: {
                    voluntarioModal: function () {
                        return voluntario;
                    }
                },
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
            $scope.$watch(function () {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function (wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
        };        
        // =============================================================================
        // Abre modal para deletar Voluntário =========================================
        // =============================================================================
        $scope.deletar = function (index, voluntarios, voluntario) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            $mdDialog.show({
                controller: 'modalDeletarVoluntarioController',
                templateUrl: 'app/views/modalDeletarVoluntario.html',
                parent: angular.element(document.body),
                resolve: {
                    voluntarioModal: function () {
                        return {
                            index: index,
                            voluntarios: voluntarios,
                            voluntario: voluntario,
                        };
                    }
                },
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
            $scope.$watch(function () {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function (wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
        }
    }]);