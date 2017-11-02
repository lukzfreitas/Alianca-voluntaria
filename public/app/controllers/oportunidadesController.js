'use strict';
angular.module('oportunidadesController', [])
    .controller('oportunidadesController',
    [
        '$scope',
        '$http',
        '$mdDialog',
        '$mdMedia',
        '$location',
        'formatDateService',
        'Oportunidades',
        'Organizacoes', function ($scope, $http, $mdDialog, $mdMedia, $location, formatDateService, Oportunidades, Organizacoes) {
            $scope.titulo = 'Nova Oportunidade';
            $scope.oportunidade = { areas_interesse: [] };

            // =============================================================================
            // Todas Oportunidades ==================================================
            // =============================================================================
            Oportunidades.get().success(function (data) {
                for (var i in data) {
                    data[i].dataInicioFormatada = formatDateService.formatDate(data[i].dataInicio);
                    data[i].dataFimFormatada = formatDateService.formatDate(data[i].dataFim);
                    data[i].selecionada = false;
                }
                $scope.oportunidades = data;
            });


            // =============================================================================
            // Busca Oportunidades ==================================================
            // =============================================================================
            $scope.buscar = function () {
                Oportunidades.findByAreaInteresse($scope.oportunidade.pesquisa.toLowerCase()).success(function (data) {
                    for (var i in data) {
                        data[i].dataInicioFormatada = formatDateService.formatDate(data[i].dataInicio);
                        data[i].dataFimFormatada = formatDateService.formatDate(data[i].dataFim);
                        data[i].selecionada = false;
                    }
                    $scope.oportunidades = data;
                    console.log($scope.oportunidades);
                });
            }

            // =============================================================================
            // Cria Oportunidade ==================================================
            // =============================================================================
            $scope.criarOportunidade = function () {
                if (!angular.isUndefined($scope.oportunidade)) {
                    $scope.loading = true;
                    $scope.oportunidade.areas_interesse = $scope.oportunidade.areas_interesse.map(function (item){
                        return item.toLowerCase();
                    });
                    Organizacoes.findByCNPJ($scope.oportunidade.organizacao_cnpj).success(function (organizacao) {
                        $scope.oportunidade.organizacao_id = organizacao._id;
                        Oportunidades.create($scope.oportunidade).success(function (oportunidade) {
                            var oportunidades_id = organizacao.oportunidades.map(function (item) {
                                return item._id;
                            })
                            oportunidades_id.push(oportunidade._id);
                            Organizacoes.update({ _id: oportunidade.organizacao_id, oportunidades: oportunidades_id })
                                .success(function (result) {
                                    $location.path('#/oportunidades');
                                    $scope.oportunidade = {};                                    
                                    $scope.loading = false;
                                });
                        });
                    });
                }
            }

            // =============================================================================
            // Abre modal candidatar-se à Oportunidade =====================================
            // =============================================================================
            $scope.selecionarOportunidades = function () {
                var oportunidadesSelecionadas = $scope.oportunidades.filter(function (oportunidade) {
                    return oportunidade.selecionada;
                });
                console.log('oportunidades selecionadas', oportunidadesSelecionadas);
                if (oportunidadesSelecionadas.length > 0) {
                    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                    $mdDialog.show({
                        controller: 'modalCandidatarOportunidadesController',
                        templateUrl: 'app/views/modalCandidatarOportunidades.html',
                        parent: angular.element(document.body),
                        resolve: {
                            oportunidadesModal: function () {
                                return oportunidadesSelecionadas;
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
            }


            // =============================================================================
            // Abre modal para editar Oportunidade =========================================
            // =============================================================================
            $scope.editar = function (oportunidade) {
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                $mdDialog.show({
                    controller: 'modalEditarOportunidadeController',
                    templateUrl: 'app/views/modalEditarOportunidade.html',
                    parent: angular.element(document.body),
                    resolve: {
                        oportunidadeModal: function () {
                            return oportunidade;
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
            // Abre modal para deletar Oportunidade ========================================
            // =============================================================================
            $scope.deletar = function (index, oportunidades, oportunidade) {
                if (!oportunidade.organizacao_id) {
                    Oportunidades.delete(oportunidade._id).success(function (result) {
                        oportunidades.splice(index, 1);
                        $mdDialog.cancel();
                    });
                } else {
                    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                    $mdDialog.show({
                        controller: 'modalDeletarOportunidadeController',
                        templateUrl: 'app/views/modalDeletarOportunidade.html',
                        parent: angular.element(document.body),
                        resolve: {
                            oportunidadeModal: function () {
                                return {
                                    index: index,
                                    oportunidades: oportunidades,
                                    oportunidade: oportunidade,
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
            }
        }]);