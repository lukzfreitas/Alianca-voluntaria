var service = require('../services/service');
var mongoose = require('mongoose');
var AlvoInteresse = mongoose.model('AlvoInteresse');

module.exports.findAll = function(request, response) {
    AlvoInteresse.find({}, function (error, result){
        if(error) {
            service.sendJSON(response, 500, error);
        } else {
            service.sendJSON(response, 200, result);
        }
    });
}  

module.exports.findOne = function(request, response) {
    if(!request.params || !request.params.alvo_interesse_id) {
        service.sendJSON(response, 400, {mensagem: 'Requisição inválida'});
    } else {
        AlvoInteresse.findById(request.params.alvo_interesse_id, function(error, result){
            if(error) {
                servivce.sendJSON(response, 500, error);
            } else if (!result || result.length == 0) {
                service.sendJSON(response, 404, {mensagem: 'Nenhuma descrição localizada'});
            } else {
                service.sendJSON(response, 200, result);
            }
        });
    }    
}

module.exports.create = function (request, response) {        
    if (request.body.descricao) {                
        AlvoInteresse.create({
            descricao_chave: request.body.descricao,
            descricao: request.body.descricao            
        }, function(error, result){
            if (error) {
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
    if (!request.params || !request.params.alvo_interesse_id) {
        service.sendJSON(response, 400, {mensagem: 'Requisição inválida'});
    } else {        
        var descricao_chave = service.replaceDescricao(request.body.descricao);
        AlvoInteresse.findByIdAndUpdate(
            request.params.alvo_interesse_id,
            {$set: {descricao_chave: descricao_chave, descricao: request.body.descricao}})
            .exec(function (error, result) {
            if (error) {
                service.sendJSON(response, 500, error);
            } else if (!result || result.length == 0) {
                service.sendJSON(response, 404, {mensagem: 'Nenhuma descrição localizada'});
            } else {
                service.sendJSON(response, 205, {mensagem: 'Descrição alterada com sucesso'});
            }
        });        
    }
}

module.exports.delete = function (request, response) {
    if (!request.params || !request.params.alvo_interesse_id) {
        service.sendJSON(response, 400, {mensagem: 'Requisição inválida'});
    } else {
        AlvoInteresse.findByIdAndRemove(request.params.alvo_interesse_id).exec(function (error, result) {
            if (error) {
                service.sendJSON(response, 500, error);
            } else if (!result || result.length == 0) {
                service.sendJSON(response, 404, {mensagem: 'Nenhuma descrição localizada'});
            } else {
                service.sendJSON(response, 200, {mensagem: 'Descrição removida com sucesso'});
            }
        });
    }
}

module.exports.associaOrganizacao = function (alvo_interesse_id, organizacao_id) {
    return new Promise(function (resolve, reject) {                                    
        return AlvoInteresse.findByIdAndUpdate(alvo_interesse_id, {$push : {organizacoes: organizacao_id}})
        .exec(function(error, result) {            
            resolve(result); 
        });             
    });    
}

module.exports.associaVoluntario = function (alvo_interesse_id, voluntario_id) {
    return new Promise(function (resolve, reject) {                            
        return AlvoInteresse.findByIdAndUpdate(alvo_interesse_id, {$push : {voluntarios: voluntario_id}})
        .exec(function(error, result) {            
            resolve(result); 
        });             
    });    
}

module.exports.associaOportunidade = function (alvo_interesse_id, oportunidade_id) {
    return new Promise(function (resolve, reject) {                            
        return AlvoInteresse.findByIdAndUpdate(alvo_interesse_id, {$push : {oportunidades: oportunidade_id}})
        .exec(function(error, result) {            
            resolve(result); 
        });             
    });    
}

module.exports.voluntarios = function (request, response) {
    if (!request.params || !request.params.alvo_interesse_id) {
        service.sendJSON(response, 400, {mensagem: 'Requisição inválida'});
    } else {
        AlvoInteresse.findById(request.params.alvo_interesse_id).populate('voluntarios').exec(function (error, result){
            if (error) {
                service.sendJSON(response, 500, error);
            } else if (!result || result.voluntarios.length == 0) {
                service.sendJSON(response, 404, {mensagem: 'Nenhum voluntário localizado'});
            } else {
                service.sendJSON(response, 200, result.voluntarios);
            }
        });
    }
}

module.exports.oportunidades = function (request, response) {
    if (!request.params || !request.params.alvo_interesse_id) {
        service.sendJSON(response, 400, {mensagem: 'Requisição inválida'});
    } else {
        AlvoInteresse.findById(request.params.alvo_interesse_id).populate('oportunidades').exec(function (error, result){
            if (error) {
                service.sendJSON(response, 500, error);
            } else if (!result || result.oportunidades.length == 0) {
                service.sendJSON(response, 404, {mensagem: 'Nenhuma oportunidade localizada'});
            } else {
                service.sendJSON(response, 200, result.oportunidades);
            }
        });
    }
}

module.exports.organizacoes = function (request, response) {
    if (!request.params || !request.params.alvo_interesse_id) {
        service.sendJSON(response, 400, {mensagem: 'Requisição inválida'});
    } else {
        AlvoInteresse.findById(request.params.alvo_interesse_id).populate('organizacoes').exec(function (error, result){
            if (error) {
                service.sendJSON(response, 500, error);
            } else if (!result || result.organizacoes.length == 0) {
                service.sendJSON(response, 404, {mensagem: 'Nenhuma organizacao localizada'});
            } else {
                service.sendJSON(response, 200, result.organizacoes);
            }
        });
    }
}