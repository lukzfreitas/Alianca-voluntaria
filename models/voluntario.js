const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VoluntarioSchema = Schema({
    areas_interesse: [String],    
    oportunidades: [{type: Schema.Types.ObjectId, ref: 'Oportunidade'}],
    cpf: {type: String, required: true, unique: true, maxlength: 11, minlength: 11},
    email: {type: String, required: true, unique: true},
    senha: {type: String, required: true},
    nome: {type: String, required: true},
    dataNasc: {type: Date, default: Date.now, required: true},    
    escolaridade: {type: String, required: true},
    disponibilidade: {type: String, required: true},
    situacaoProfissional: {type: String, required: true},
    profissao: String,
    empresa: String,
    foto: String,
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
module.exports = mongoose.model('Voluntario', VoluntarioSchema, 'Voluntarios');
