'use strict';
angular.module('modalCandidatarOportunidadesController', [])
    .controller('modalCandidatarOportunidadesController', [
        '$scope',
        '$http',
        '$mdDialog',
        'Voluntarios',
        'Oportunidades',
        'oportunidadesModal', function ($scope, $http, $mdDialog, Voluntarios, Oportunidades, oportunidadesModal) {
            $scope.oportunidades = oportunidadesModal;
            $scope.voluntario = {};

            $scope.cancel = function () {
                $mdDialog.cancel();
            }

            $scope.confirmar = function () {
                if (!angular.isUndefined($scope.voluntario)) {
                    $scope.loading = true;
                    Voluntarios.findByCPF($scope.voluntario.cpf).success(function (result) {
                        var voluntario = result;
                        var oportunidades_id = $scope.oportunidades.filter(function (item) {
                            return item._id;
                        });
                        var voluntarioOport_id = voluntario.oportunidades.filter(function (item) {
                            return item._id;
                        });
                        var oportunidadesConcat = oportunidades_id.concat(voluntarioOport_id);
                        Voluntarios.update({ _id: voluntario._id, oportunidades: oportunidadesConcat })
                            .success(function (result) {
                                for (var i in $scope.oportunidades) {
                                    var voluntariosInteresse_id = $scope.oportunidades[i].voluntarios_interesse
                                        .map(function (item) {
                                            return item._id
                                        });
                                    voluntariosInteresse_id.push(voluntario._id);
                                    Oportunidades.update(
                                        { _id: $scope.oportunidades[i]._id, voluntarios_interesse: voluntariosInteresse_id })
                                        .success(function (result1) {

                                        });
                                }
                                $mdDialog.cancel();
                            });
                    });
                }
            }

            $scope.remover = function (index) {
                $scope.oportunidades.splice(index, 1);
                if ($scope.oportunidades.length === 0) {
                    $mdDialog.cancel();
                }
            }
        }]);