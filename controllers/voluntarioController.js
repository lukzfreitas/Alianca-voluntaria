var service = require('../services/service');
var mongoose = require('mongoose');
var Voluntario = mongoose.model('Voluntario');
var ctrOportunidades = require('../controllers/oportunidadeController');
var ctrAlvoInteresse = require('../controllers/alvoInteresseController');
var ctrAreaInteresse = require('../controllers/areaInteresseController');

module.exports.findAll = function (request, response) {
    if (request.query.cpf) {
        Voluntario.findOne({ cpf: request.query.cpf })
            .populate('oportunidades')
            .exec(function (error, result) {
                if (error) {
                    service.sendJSON(response, 500, error);
                } else {
                    service.sendJSON(response, 200, result);
                }
            });
    } else if (request.query.area_interesse) {
        Voluntario.find({ areas_interesse: { $in: [request.query.area_interesse] } })
        .populate('oportunidades')
        .exec(function (error, result) {
            if (error) {
                service.sendJSON(response, 500, error);
            } else {
                service.sendJSON(response, 200, result);
            }
        });        
    } else {
        Voluntario.find({})
            .populate('oportunidades')
            .exec(function (error, result) {
                if (error) {
                    service.sendJSON(response, 500, error);
                } else {
                    service.sendJSON(response, 200, result);
                }
            });
    }

}

module.exports.findOne = function (request, response) {
    if (!request.params || !request.params.voluntario_id) {
        service.sendJSON(response, 400, { mensagem: 'Requisição inválida' });
    } else {
        Voluntario.findById(request.params.voluntario_id, function (error, result) {
            if (error) {
                service.sendJSON(response, 500, error);
            } else if (!result || result.length == 0) {
                service.sendJSON(response, 404, { mensagem: 'Nenhum voluntário localizado' });
            } else {
                service.sendJSON(response, 200, result);
            }
        });
    }
}

module.exports.create = function (request, response) {
    if (request.body.cpf) {
        request.body.cpf = service.replaceCPF(request.body.cpf);
        console.log(request.body.cpf);
        if (service.validateCPF(request.body.cpf)) {
            Voluntario.create(request.body, function (error, result) {
                if (error) {
                    service.sendJSON(response, 500, error);
                } else {
                    service.sendJSON(response, 200, result);
                }
            });
        } else {
            service.sendJSON(response, 400, { mensagem: 'CPF inválido' });
        }
    } else {
        service.sendJSON(response, 400, { mensagem: 'Requisição inválida' });
    }
}

module.exports.update = function (request, response) {
    if (!request.body || !request.body._id) {
        service.sendJSON(response, 400, { mensagem: 'Requisição inválida' });
    } else {
        if (request.body.cpf) {
            request.body.cpf = service.replaceCPF(request.body.cpf);
            if (!service.validateCPF(request.body.cpf)) {
                service.sendJSON(response, 400, { mensagem: 'CPF inválido' });
                return;
            }
        }
        Voluntario.findByIdAndUpdate(request.body._id, { $set: request.body }).exec(function (error, result) {
            if (error) {
                service.sendJSON(response, 500, error);
            } else if (!result || result.length == 0) {
                service.sendJSON(response, 404, { mensagem: 'Nenhum voluntário localizado' });
            } else {
                service.sendJSON(response, 205, { mensagem: 'Voluntário alterado com sucesso' });
            }
        });
    }
}

module.exports.delete = function (request, response) {
    if (!request.params || !request.params.voluntario_id) {
        service.sendJSON(response, 400, { mensagem: 'Requisição inválida' });
    } else {
        Voluntario.findByIdAndRemove(request.params.voluntario_id).exec(function (error, result) {
            if (error) {
                service.sendJSON(response, 500, error);
            } else if (!result || result.length == 0) {
                service.sendJSON(response, 404, { mensagem: 'Nenhum voluntário localizado' });
            } else {
                service.sendJSON(response, 200, { mensagem: 'Voluntário removido com sucesso' });
            }
        });
    }
}

// module.exports.adicionarAreaInteresse = function(request, response) {
//     if (!request.params || !request.params.voluntario_id) {
//         service.sendJSON(response, 400, {mensagem: 'Requisição inválida'});
//     } else {
//         ctrAreaInteresse.associaVoluntario(request.body.area_interesse_id, request.params.voluntario_id)
//         .then(function () {            
//             Voluntario.findByIdAndUpdate(request.params.voluntario_id, {$push: {areas_interesse: request.body.area_interesse_id}})
//             .exec(function(error, result){
//                 if(error) {
//                     service.sendJSON(response, 500, error);
//                 } else {
//                     service.sendJSON(response, 200, {mensagem: 'Area interesse adicionada com sucesso'});
//                 }
//             });            
//         });
//     }
// }

// module.exports.adicionarAlvoInteresse = function (request, response) {
//     if (!request.params || !request.params.voluntario_id) {
//         service.sendJSON(response, 400, {mensagem: 'Requisição inválida'});
//     } else {
//         ctrAlvoInteresse.associaVoluntario(request.body.alvo_interesse_id, request.params.voluntario_id)
//         .then(function (){
//             Voluntario.findByIdAndUpdate(request.params.voluntario_id, {$push: {alvos_interesse: request.body.alvo_interesse_id}})
//             .exec(function(error, result){
//                 if(error) {
//                     service.sendJSON(response, 500, error);
//                 } else {
//                     service.sendJSON(response, 200, {mensagem: 'Alvo interesse adicionado com sucesso'});
//                 }
//             });            
//         });
//     }
// }

// module.exports.areasInteresse = function (request, response) {
//     if (!request.params || !request.params.voluntario_id) {
//         service.sendJSON(response, 400, {mensagem: 'Requisição inválida'});
//     } else {
//         Voluntario.findById(request.params.voluntario_id).populate('areas_interesse').exec(function (error, result){
//             if (error) {
//                 service.sendJSON(response, 500, error);
//             } else if (!result || result.areas_interesse.length == 0) {
//                 service.sendJSON(response, 404, {mensagem: 'Nenhuma area interesse localizada'});
//             } else {
//                 service.sendJSON(response, 200, result.areas_interesse);
//             }
//         });
//     }
// }

// module.exports.alvosInteresse = function (request, response) {
//     if (!request.params || !request.params.voluntario_id) {
//         service.sendJSON(response, 400, {mensagem: 'Requisição inválida'});
//     } else {
//         Voluntario.findById(request.params.voluntario_id).populate('alvos_interesse').exec(function (error, result){
//             if (error) {
//                 service.sendJSON(response, 500, error);
//             } else if (!result || result.alvos_interesse.length == 0) {
//                 service.sendJSON(response, 404, {mensagem: 'Nenhum alvo interesse localizado'});
//             } else {
//                 service.sendJSON(response, 200, result.alvos_interesse);
//             }
//         });
//     }
// }

// /* Retorna as oportunidades de interesse do voluntario */
// module.exports.oportunidades = function (request, response) {    
//     if (!request.params || !request.params.voluntario_id) {
//         service.sendJSON(response, 400, {mensagem: 'Requisição inválida'});
//     } else {
//         Voluntario.findById(request.params.voluntario_id).populate('oportunidades').exec(function (error, result){                                                
//             if (error) {
//                 service.sendJSON(response, 500, error);
//             } else if (!result || result.oportunidades.length == 0) {
//                 service.sendJSON(response, 404, {mensagem: 'Nenhuma oportunidade localizada'});
//             } else {
//                 service.sendJSON(response, 200, result.oportunidades);
//             }
//         });
//     }
// }

// /* Retorna as oportunidades de interesse do voluntario */
// module.exports.caditarseAOportunidade = function (request, response) {    
//     if (!request.params || !request.params.voluntario_id) {
//         service.sendJSON(response, 400, {mensagem: 'Requisição inválida'});
//     } else {        
//         ctrOportunidades.associaVoluntarioComInteresse(request.body.oportunidade_id, request.params.voluntario_id).then(function () {           
//             Voluntario.findByIdAndUpdate(request.params.voluntario_id, {$push: {oportunidades: request.body.oportunidade_id}})
//             .exec(function (error, result){
//                 service.sendJSON(response, 205, {mensagem: 'Voluntário associado a oportunidade com sucesso'});    
//             });                
//         });
//     }
// }