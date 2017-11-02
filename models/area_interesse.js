const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AreaInteresseSchema = Schema({
    descricao_chave : {type: String, require: true, lowercase: true, trim: true},
    descricao: {type: String, required: true},     
    organizacoes: [{type: Schema.Types.ObjectId, ref: 'Organizacao'}],    
    oportunidades: [{type: Schema.Types.ObjectId, ref: 'Oportunidade'}],
    voluntarios: [{type: Schema.Types.ObjectId, ref: 'Voluntario'}],
});
module.exports = mongoose.model('AreaInteresse', AreaInteresseSchema, 'Areas_interesse');
