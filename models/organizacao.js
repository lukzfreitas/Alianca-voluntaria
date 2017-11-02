const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrganizacaoSchema = Schema({
    areas_interesse: [String],        
    oportunidades: [{type: Schema.Types.ObjectId, ref: 'Oportunidade'}],    
    cnpj: {type : String, required: true, unique: true, maxlength: 14, minlength: 14},
    nome_organizacao : {type: String, required: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    senha: {type: String, required: true},
    missao: {type: String, required: true},        
    nome_responsavel: {type: String, required: true},
    foto: String,
    website: String,
    cep: {type: String, required: true},
    logradouro: {type: String, required: true},
    numero: {type: Number, required: true},
    complemento: {type: String},
    bairro: {type: String, required: true},
    cidade: {type: String, required: true},
    estado: {type: String, required: true},
    pais: {type: String, required: true},
    contatos : {
        telefones: [String],
        redes_sociais: [String]
    }
});
module.exports = mongoose.model('Organizacao', OrganizacaoSchema, 'Organizacoes');
