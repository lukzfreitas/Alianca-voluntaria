var service = require('../services/service');
var mongoose = require('mongoose');
var Oportunidade = mongoose.model('Oportunidade');
var ctrOrganizacao = require('../controllers/organizacaoController');
var ctrAlvoInteresse = require('../controllers/alvoInteresseController');
var ctrAreaInteresse = require('../controllers/areaInteresseController');

module.exports.findAll = function (request, response) {
    if (request.query.area_interesse) {                
        Oportunidade.find({areas_interesse: {$in : [request.query.area_interesse]}}).populate('organizacao_id').exec(function(error, result) {
            if (error) {
                service.sendJSON(response, 500, error);
            } else {
                service.sendJSON(response, 200, result);
            }
        });
    } else {        
        Oportunidade.find({}).populate('organizacao_id').exec(function(error, result) {
            if(error) {
                service.sendJSON(response, 500, error);
            } else {
                service.sendJSON(response, 200, result);
            }
        });
    }
    
}

module.exports.findOne = function (request, response) {
    if(!request.params || !request.params.oportunidade_id) {
        service.sendJSON(response, 400, {mensagem: 'Requisição inválida'});
    } else {
        Oportunidade.findById(request.params.oportunidade_id, function(error, result){            
            if(error) {
                service.sendJSON(response, 500, error);
            } else if (!result || result.length == 0) {
                service.sendJSON(response, 404, {mensagem: 'Nenhuma oportunidade localizada'});
            } else {
                service.sendJSON(response, 200, result);
            }
        });
    }   
}

module.exports.create = function (request, response) {        
    if (request.body.codigo && request.body.organizacao_id) {                                        
        Oportunidade.create(request.body, function(error, result){            
            if(error) {
                service.sendJSON(response, 500, error);
            } else {
                service.sendJSON(response, 200, result);
            }
        });
    } else {
        service.sendJSON(response, 400, {mensagem: 'Requisição inválida'});
    }            
}

module.exports.update = function (request, response) {    
    if (!request.params || !request.body._id) {
        service.sendJSON(response, 400, {mensagem: 'Requisição inválida'});
    } else {        
        Oportunidade.findByIdAndUpdate(request.body._id, {$set: request.body}).exec(function (error, result) {
            if (error) {
                service.sendJSON(response, 500, error);
            } else if (!result || result.length == 0) {
                service.sendJSON(response, 404, {mensagem: 'Nenhuma oportunidade localizada'});
            } else {
                service.sendJSON(response, 205, {mensagem: 'Oportunidade alterada com sucesso'});
            }
        });        
    }
}

module.exports.delete = function (request, response) {
    if (!request.params || !request.params.oportunidade_id) {
        service.sendJSON(response, 400, {mensagem: 'Requisição inválida'});
    } else {
        Oportunidade.findByIdAndRemove(request.params.oportunidade_id).exec(function (error, result){
            if (error) {
                service.sendJSON(response, 500, error);
            } else if (!result || result.length == 0) {
                service.sendJSON(response, 404, {mensagem: 'Nenhuma oportunidade localizada'})
            } else {
                service.sendJSON(response, 200, {mensagem: 'Oportunidade removida com sucesso'});
            }
        });
    }
}

// module.exports.adicionarAreaInteresse = function(request, response) {
//     if (!request.params || !request.params.oportunidade_id) {
//         service.sendJSON(response, 400, {mensagem: 'Requisição inválida'});
//     } else {
//         ctrAreaInteresse.associaOportunidade(request.body.area_interesse_id, request.params.oportunidade_id)
//         .then(function () {            
//             Oportunidade.findByIdAndUpdate(request.params.oportunidade_id, {$push: {areas_interesse: request.body.area_interesse_id}})
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
//     if (!request.params || !request.params.oportunidade_id) {
//         service.sendJSON(response, 400, {mensagem: 'Requisição inválida'});
//     } else {
//         ctrAlvoInteresse.associaOportunidade(request.body.alvo_interesse_id, request.params.oportunidade_id)
//         .then(function (){
//             Oportunidade.findByIdAndUpdate(request.params.oportunidade_id, {$push: {alvos_interesse: request.body.alvo_interesse_id}})
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

// /* Retorna todos as areas de interesse da oportunidade */
// module.exports.areasInteresse = function (request, response) {
//     if (!request.params || !request.params.oportunidade_id) {
//         service.sendJSON(response, 400, {mensagem: 'Requisição inválida'});
//     } else {
//         Oportunidade.findById(request.params.oportunidade_id).populate('areas_interesse').exec(function (error, result){
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

// /* Retorna todos os alvos de interesse da oportunidade */
// module.exports.alvosInteresse = function (request, response) {
//     if (!request.params || !request.params.oportunidade_id) {
//         service.sendJSON(response, 400, {mensagem: 'Requisição inválida'});
//     } else {
//         Oportunidade.findById(request.params.oportunidade_id).populate('alvos_interesse').exec(function (error, result){
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

// /* Retorna todos os voluntarios que possuem interesse na oportunidade */
// module.exports.voluntariosInteresse = function (request, response) {
//     if (!request.params || !request.params.oportunidade_id) {
//         service.sendJSON(response, 400, {mensagem: 'Requisição inválida'});
//     } else {
//         Oportunidade.findById(request.params.oportunidade_id).populate('voluntarios_interesse').exec(function (error, result){
//             if (error) {
//                 service.sendJSON(response, 500, error);
//             } else if (!result || result.voluntarios_interesse.length == 0) {
//                 service.sendJSON(response, 404, {mensagem: 'Nenhum voluntário localizado'});
//             } else {
//                 service.sendJSON(response, 200, result.voluntarios_interesse);
//             }
//         });
//     }
// }

// /* Esta função associa um voluntario ao array de voluntarios com interesse na oportunidade */
// module.exports.associaVoluntarioComInteresse = function (oportunidade_id, voluntario_id) {
//     return new Promise(function (resolve, reject) {                           
//         return Oportunidade.findByIdAndUpdate(oportunidade_id, {$push : {voluntarios_interesse: voluntario_id}})
//         .exec(function(error, result) {
//             resolve(oportunidade_id); 
//         });             
//     });    
// }

// module.exports.selecionaVoluntarios = function (request, response) {
//     if (!request.params || !request.params.oportunidade_id || !request.body.voluntario_id) {
//         service.sendJSON(response, 400, {mensagem: 'Requisição inválida'});
//     } else {
//         Oportunidade.findByIdAndUpdate(request.params.oportunidade_id, {$push: {voluntarios_associados: request.body.voluntario_id}})
//         .exec(function (error, result) {
//             if (error) {
//                 service.sendJSON(response, 500, error);
//             } else {
//                 service.sendJSON(response, 200, {mensagem: 'Voluntários selecionado(s) a oportunidade com sucesso'});
//             }
//         });
//     }
// }

