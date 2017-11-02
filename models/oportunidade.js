const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OportunidadeSchema = Schema({    
    organizacao_id: {type:Schema.Types.ObjectId, ref: 'Organizacao'},
    areas_interesse: [String],        
    voluntarios_interesse: [{type: Schema.Types.ObjectId, ref: 'Voluntario'}],    
    codigo: {type: String, required: true, unique: true},    
    descricao: {type: String, required: true},
    responsavel: {type: String, required: true},
    dataInicio: {type: Date, default: Date.now, required: true},
    dataFim: {type: Date, default: Date.now, required: true},
    fotos: [String],
    nota: Number,
    comentario: String,
    localizacao: {
        latitude: String,
        longitude: String
    }    
});
module.exports = mongoose.model('Oportunidade', OportunidadeSchema, 'Oportunidades');
