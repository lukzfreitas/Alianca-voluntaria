'use strict'

const async = require('async');
const service = require('./services/service');
const AreaInteresse = require('./models/area_interesse');
const AlvoInteresse = require('./models/alvo_interesse');
const Organizacao = require('./models/organizacao');
const Oportunidade = require('./models/oportunidade');
const Voluntario = require('./models/voluntario');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const URL_DB = 'mongodb://localhost:27017/DBalianca_voluntaria';
mongoose.connect(URL_DB, {useMongoClient: true});
let db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB erro de conexao:'));

let organizacoes = [];
let oportunidades = [];
let voluntarios = [];

function criarOrganizacao(    
    cnpj,
    nome_organizacao,
    email,
    senha,
    missao,    
    nome_responsavel,
    website,
    cep,
    logradouro,
    numero,
    complemento,
    bairro,
    cidade,
    estado,
    pais,
    telefones,        
    redes_sociais,
    areas_interesse,
    callback        
) {
    let organizacaoDados = {          
        cnpj: cnpj,
        nome_organizacao: nome_organizacao,
        email: email,
        senha: senha,
        missao: missao,        
        nome_responsavel: nome_responsavel,        
        website: website,
        cep: cep,
        logradouro: logradouro,
        numero:numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        pais: pais,
        contatos: {
            telefones: telefones,
            redes_sociais: redes_sociais 
        },
        areas_interesse: areas_interesse               
    }    
    let organizacao = new Organizacao(organizacaoDados);
    organizacao.save(function (error) {
        if (error) {
            callback(error, null);
            return;
        }
        organizacoes.push(organizacao);
        callback(null, organizacao);
    })
}

function criarOportunidade(    
    organizacao_oportunidade,    
    codigo,    
    descricao,
    responsavel,
    dataInicio,
    dataFim,
    fotos,
    nota,
    comentario,
    latitude,        
    longitude,
    areas_interesse,
    callback    
) {
    
    let oportunidadeDados = {
        codigo: codigo,        
        descricao: descricao,
        responsavel: responsavel,
        dataInicio: dataInicio,
        dataFim: dataFim,
        fotos: fotos,
        nota: nota,
        comentario: comentario,
        latitude: latitude,        
        longitude: longitude,
        areas_interesse: areas_interesse    
    }        
    if(organizacao_oportunidade) oportunidadeDados.organizacao_id = organizacao_oportunidade;    
    let oportunidade = new Oportunidade(oportunidadeDados);
    oportunidade.save(function (error){
        if(error) {
            callback(error, null);
            return;
        }
        oportunidades.push(oportunidade);
        callback(null, oportunidade);
    });
}

function criarVoluntario(    
    cpf,
    email,
    senha,
    nome,
    dataNasc,    
    escolaridade,
    disponibilidade,
    situacaoProfissional,
    profissao,
    empresa,    
    cep,
    logradouro,
    numero,
    complemento,
    bairro,
    cidade,
    estado,
    pais,    
    telefones,
    redes_sociais,
    areas_interesse,
    callback
) {
    let voluntarioDados = {
        cpf: cpf,
        email: email,
        senha: senha,
        nome: nome,
        dataNasc: dataNasc,        
        escolaridade: escolaridade,
        disponibilidade: disponibilidade,
        situacaoProfissional: situacaoProfissional,
        profissao: profissao,
        empresa: empresa,        
        cep: cep,
        logradouro: logradouro,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        pais: pais,    
        contatos: {
            telefones: telefones,
            redes_sociais: redes_sociais 
        },
        areas_interesse: areas_interesse         
    };    
    let voluntario = new Voluntario(voluntarioDados);
    voluntario.save(function (error) {
        if(error) {
            callback(error, null);
            return;
        }
        voluntarios.push(voluntario);
        callback(null, voluntario);
    });
}

function criarOrganizacoes(callback) {
    async.parallel(
        [
            function (callback) {
                criarOrganizacao(                    
                    27700200000103,
                    'Cruz Vermelha Brasileira',
                    'contato@cruzvermelhabrasileira.org.br',
                    '123456',
                    'Cruz Vermelha Brasileira',                    
                    'João da Silva',                    
                    'http://www.cruzvermelha.org.br/pb',
                    '90020-100',
                    'Av Independencia',
                    121,
                    '',
                    'Independencia',
                    'Porto Alegre',
                    'RS',
                    'Brasil',
                    ['(51) 3322-4455', '(51) 0800 4444-3333'],        
                    [
                        'https://www.facebook.com/cruzvermelhabrasileira.orgaocentral',
                        'https://www.instagram.com/p/BZ39qyaAfnX'
                    ],
                    ['saude', 'doacao', 'sangue', 'socorro'],
                    callback
                )
            },
            function (callback) {
                criarOrganizacao(                    
                    39086650000137,
                    'PUCRS',
                    'pucrs@pucrs.br',
                    '123456',
                    'Universidade filantrópica de ensino superior',                    
                    'Maria da Silva',                    
                    'http://www.pucrs.br',
                    '90020-101',
                    'Av Ipiranga',
                    100,
                    '',
                    'Partenon',
                    'Porto Alegre',
                    'RS',
                    'Brasil',
                    ['(51) 3322-5544', '(51) 0800 4433-2233'],        
                    [
                        'https://www.facebook.com/pucrs',
                        'https://www.instagram.com/pucrs'
                    ],
                    ['saude', 'educacao', 'comunidade', 'filantropica'],
                    callback
                )
            }
        ],
        callback
    )
}

function criarOportunidades(callback) {    
    async.parallel(
        [
            function (callback) {
                criarOportunidade(          
                    organizacoes[0],                                  
                    '001',                    
                    'Recolhimento de Alimentos 27, 28 e 29 de outubro - Precisamos da sua ajuda!',
                    'João',
                    new Date(2017,10,27),
                    new Date(2017,10,29),
                    [],
                    0,
                    '',
                    '',        
                    '',
                    ['alimentos', 'doacao'],
                    callback
                )
            },
            function (callback) {
                criarOportunidade(          
                    organizacoes[0],                                  
                    '002',                    
                    'Auxiliar no recolhimento de sangue no Hospital Santa Casa',
                    'Maria',
                    new Date(2017,10,20),
                    new Date(2017,10,25),
                    [],
                    0,
                    '',
                    '',        
                    '',
                    ['saude', 'doacao', 'sangue'],
                    callback
                )
            }
        ],
        callback            
    )
}

function criarVoluntarios(callback) {
    async.parallel(
        [
            function (callback) {
                criarVoluntario(                              
                    61482428504,
                    'joana@mail.com',
                    '123456',
                    'Joana da Silva',
                    new Date(1990,1,30),                    
                    'Médio - Completo',
                    'Integral',
                    'Estudante',
                    '',
                    '',                    
                    '90010-221',
                    'Rua Pedro Alvares Cabral',
                    '667',
                    '101',
                    'Laranjal',
                    'Porto Alegre',
                    'RS',
                    'Brasil',    
                    ['(51) 89933-3322', '(51) 3022-1122'],
                    [],
                    ['educacao', 'saude', 'idosos', 'doacao'],
                     callback
                );
            },
            function (callback) {
                criarVoluntario(                              
                    10599140003,
                    'oscar@mail.com',
                    '654321',
                    'Oscar da Silva',
                    new Date(1990,1,30),                    
                    'Superior - Completo',
                    'Integral',
                    'Estudante',
                    '',
                    '',                    
                    '90010-100',
                    'Rua Fernando Machado',
                    '667',
                    '101',
                    'Centro',
                    'Porto Alegre',
                    'RS',
                    'Brasil',    
                    ['(51) 3312-3322', '(51) 3020-2222'],
                    [],
                    ['veterinaria', 'animais', 'saude', 'doacao'],
                     callback
                );
            }
        ],
        callback
    )
}

function organizacaoCriaOportunidade(oportunidades_organizacao, callback) {    
    Organizacao.findOneAndUpdate({cnpj: organizacoes[0].cnpj}, {$set: {oportunidades: oportunidades_organizacao}},
        function(error, result){
            if(error) {
                callback(error, null);
            }                    
            callback(null, result);
        }
    );
}

function organizacaoCriaOportunidades(callback) {    
    async.parallel(
        [
            function(callback) {
                organizacaoCriaOportunidade(oportunidades, callback);          
            }        
        ],
        callback
    )    
}

async.series([        
        criarOrganizacoes,
        criarVoluntarios,
        criarOportunidades,
        organizacaoCriaOportunidades,                    
    ],
    function(error, result){
    if(error) {
        console.log('Error', error);
    } else {
        console.log('Dados');
    }
});
