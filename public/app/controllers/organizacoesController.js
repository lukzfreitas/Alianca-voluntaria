'use strict';
angular.module('organizacoesController', [])
    .controller('organizacoesController', [
        '$scope',
        '$http',
        '$mdDialog',
        '$mdMedia',
        '$location',
        'formatDateService',
        'Organizacoes', function ($scope, $http, $mdDialog, $mdMedia, $location, formatDateService, Organizacoes) {
            $scope.organizacoes = [];
            $scope.organizacao = { disable: true };
            $scope.organizacao.contatos = { telefones: [], redes_sociais: [] };
            $scope.organizacao.areas_interesse = [];
            $scope.estados = ["AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA",
                "PB", "PR", "PE", "PI", "RJ", "RN", "RO", "RS", "RR", "SC", "SE", "SP", "TO"];
            // =============================================================================
            // Buscar Todas Organizações ==================================================
            // =============================================================================
            Organizacoes.get().success(function (data) {
                $scope.organizacoes = data;
                console.log($scope.organizacoes);
            });
            // =============================================================================
            // Busca Organizações ==================================================
            // =============================================================================
            $scope.buscar = function () {
                Organizacoes.findByAreaInteresse($scope.organizacao.pesquisa.toLowerCase()).success(function (data) {
                    console.log(data);
                    $scope.organizacoes = data;
                });
            };
            // =============================================================================
            // Criar Organizações ==================================================
            // =============================================================================
            $scope.criarOrganizacao = function () {
                if (!angular.isUndefined($scope.organizacao)) {
                    if ($scope.organizacao.senha !== $scope.organizacao.confSenha) {                        
                        return;
                    }
                    $scope.loading = true;
                    $scope.organizacao.areas_interesse = $scope.organizacao.areas_interesse.map(function (item) {
                        return item.toLowerCase();
                    });
                    Organizacoes.create($scope.organizacao).success(function (data) {
                        $location.path('#/organizacoes');
                        $scope.loading = false;
                        $scope.organizacao = {};
                        $scope.organizacoes.push(data);
                    });
                }
            }
            // =============================================================================
            // Abre modal de Oportunidades ==================================================
            // =============================================================================
            $scope.oportunidades = function (oportunidades) {
                for (var i in oportunidades) {
                    oportunidades[i].dataInicioFormatada = formatDateService.formatDate(oportunidades[i].dataInicio);
                    oportunidades[i].dataFimFormatada = formatDateService.formatDate(oportunidades[i].dataFim);
                }
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                $mdDialog.show({
                    controller: 'modalOportunidadesController',
                    templateUrl: 'app/views/modalOportunidades.html',
                    parent: angular.element(document.body),
                    resolve: {
                        oportunidades: function () {
                            return oportunidades;
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
            // Abre modal para editar Organizacao ==========================================
            // =============================================================================
            $scope.editar = function (organizacao) {
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                $mdDialog.show({
                    controller: 'modalEditarOrganizacaoController',
                    templateUrl: 'app/views/modalEditarOrganizacao.html',
                    parent: angular.element(document.body),
                    resolve: {
                        organizacaoModal: function () {
                            return organizacao;
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

            // =============================================================================
            // Abre modal para deletar Organizacao =========================================
            // =============================================================================
            $scope.deletar = function (index, organizacoes, organizacao) {
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                $mdDialog.show({
                    controller: 'modalDeletarOrganizacaoController',
                    templateUrl: 'app/views/modalDeletarOrganizacao.html',
                    parent: angular.element(document.body),
                    resolve: {
                        organizacaoModal: function () {
                            return {
                                index: index,
                                organizacoes: organizacoes,
                                organizacao: organizacao,
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