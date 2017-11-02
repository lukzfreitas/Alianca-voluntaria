var service = require('../services/service');
var mongoose = require('mongoose');
var Organizacao = mongoose.model('Organizacao');
var ctrAlvoInteresse = require('../controllers/alvoInteresseController');
var ctrAreaInteresse = require('../controllers/areaInteresseController');

module.exports.findAll = function (request, response) {    
    if(request.query.cnpj) {        
        Organizacao.findOne({cnpj: request.query.cnpj})
        .populate('oportunidades')        
        .exec(function (error, result) {
            if (error) {
                service.sendJSON(response, 500, error);
            } else {
                service.sendJSON(response, 200, result);
            }
        });
    } else if (request.query.area_interesse) {        
        Organizacao.find({areas_interesse: {$in : [request.query.area_interesse]}})
        .populate('oportunidades')        
        .exec(function (error, result) {
            if (error) {
                service.sendJSON(response, 500, error);
            } else {
                service.sendJSON(response, 200, result);
            }
        });        
    } else {
        Organizacao.find({})
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
    if (!request.params || !request.params.organizacao_id) {
        service.sendJSON(response, 400, { mensagem: 'Requisição inválida' });
    } else {
        Organizacao.findById(request.params.organizacao_id, function (error, result) {
            if (error) {
                service.sendJSON(response, 500, error);
            } else if (!result || result.length == 0) {
                service.sendJSON(response, 404, { mensagem: 'Nenhuma organização localizada' });
            } else {
                service.sendJSON(response, 200, result);
            }
        });
    }
}

module.exports.create = function (request, response) {
    if (request.body.cnpj) {
        request.body.cnpj = service.replaceCPNJ(request.body.cnpj);
        if (service.validateCPNJ(request.body.cnpj)) {
            Organizacao.create(request.body, function (error, result) {
                if (error) {
                    service.sendJSON(response, 500, error);
                } else {
                    service.sendJSON(response, 200, result);
                }
            });
        } else {
            service.sendJSON(response, 400, { mensagem: 'CNPJ inválido' });
        }
    } else {
        service.sendJSON(response, 400, { mensagem: 'Requisição inválida' });
    }
}

module.exports.update = function (request, response) {
    if (!request.body || !request.body._id) {
        service.sendJSON(response, 400, { mensagem: 'Requisição inválida' });
    } else {
        if (request.body.cnpj) {            
            request.body.cnpj = service.replaceCPNJ(request.body.cnpj);
            if (!service.validateCPNJ(request.body.cnpj)) {
                service.sendJSON(response, 400, { mensagem: 'CNPJ inválido' });
                return;
            }
        }        
        Organizacao.findByIdAndUpdate(request.body._id, { $set: request.body }).exec(function (error, result) {
            if (error) {
                service.sendJSON(response, 500, error);
            } else if (!result || result.length == 0) {
                service.sendJSON(response, 404, { mensagem: 'Nenhuma organização localizada' });
            } else {
                service.sendJSON(response, 205, { mensagem: 'Organização alterada com sucesso' });
            }
        });
    }
}

module.exports.delete = function (request, response) {
    if (!request.params || !request.params.organizacao_id) {
        service.sendJSON(response, 400, { mensagem: 'Requisição inválida' });
    } else {
        Organizacao.findByIdAndRemove(request.params.organizacao_id).exec(function (error, result) {
            if (error) {
                service.sendJSON(response, 500, error);
            } else if (!result || result.length == 0) {
                service.sendJSON(response, 404, { mensagem: 'Nenhuma organização localizada' });
            } else {
                service.sendJSON(response, 200, { mensagem: 'Organizacão removida com sucesso' });
            }
        });
    }
}

// module.exports.adicionarAreaInteresse = function (request, response) {
//     if (!request.params || !request.params.organizacao_id) {
//         service.sendJSON(response, 400, { mensagem: 'Requisição inválida' });
//     } else {
//         ctrAreaInteresse.associaOrganizacao(request.body.area_interesse_id, request.params.organizacao_id)
//             .then(function () {
//                 Organizacao.findByIdAndUpdate(request.params.organizacao_id, { $push: { areas_interesse: request.body.area_interesse_id } })
//                     .exec(function (error, result) {
//                         if (error) {
//                             service.sendJSON(response, 500, error);
//                         } else {
//                             service.sendJSON(response, 200, { mensagem: 'Area interesse adicionada com sucesso' });
//                         }
//                     });
//             });
//     }
// }

// module.exports.adicionarAlvoInteresse = function (request, response) {
//     if (!request.params || !request.params.organizacao_id) {
//         service.sendJSON(response, 400, { mensagem: 'Requisição inválida' });
//     } else {
//         ctrAlvoInteresse.associaOrganizacao(request.body.alvo_interesse_id, request.params.organizacao_id)
//             .then(function () {
//                 Organizacao.findByIdAndUpdate(request.params.organizacao_id, { $push: { alvos_interesse: request.body.alvo_interesse_id } })
//                     .exec(function (error, result) {
//                         if (error) {
//                             service.sendJSON(response, 500, error);
//                         } else {
//                             service.sendJSON(response, 200, { mensagem: 'Alvo interesse adicionado com sucesso' });
//                         }
//                     });
//             });
//     }
// }

// module.exports.areasInteresse = function (request, response) {
//     if (!request.params || !request.params.organizacao_id) {
//         service.sendJSON(response, 400, { mensagem: 'Requisição inválida' });
//     } else {
//         Organizacao.findById(request.params.organizacao_id).populate('areas_interesse').exec(function (error, result) {
//             if (error) {
//                 service.sendJSON(response, 500, error);
//             } else if (!result || result.areas_interesse.length == 0) {
//                 service.sendJSON(response, 404, { mensagem: 'Nenhuma area interesse localizada' });
//             } else {
//                 service.sendJSON(response, 200, result.areas_interesse);
//             }
//         });
//     }
// }

// module.exports.alvosInteresse = function (request, response) {
//     if (!request.params || !request.params.organizacao_id) {
//         service.sendJSON(response, 400, { mensagem: 'Requisição inválida' });
//     } else {
//         Organizacao.findById(request.params.organizacao_id).populate('alvos_interesse').exec(function (error, result) {
//             if (error) {
//                 service.sendJSON(response, 500, error);
//             } else if (!result || result.alvos_interesse.length == 0) {
//                 service.sendJSON(response, 404, { mensagem: 'Nenhum alvo interesse localizado' });
//             } else {
//                 service.sendJSON(response, 200, result.alvos_interesse);
//             }
//         });
//     }
// }

// module.exports.oportunidades = function (request, response) {
//     if (!request.params || !request.params.organizacao_id) {
//         service.sendJSON(response, 400, { mensagem: 'Requisição inválida' });
//     } else {
//         Organizacao.findById(request.params.organizacao_id).populate('oportunidades').exec(function (error, result) {
//             if (error) {
//                 service.sendJSON(response, 500, error);
//             } else if (!result || result.oportunidades.length == 0) {
//                 service.sendJSON(response, 404, { mensagem: 'Nenhuma oportunidade localizada' });
//             } else {
//                 service.sendJSON(response, 200, result.oportunidades);
//             }
//         });
//     }
// }