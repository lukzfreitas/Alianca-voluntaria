var express = require('express');
var ctrOrganizacoes = require('../controllers/organizacaoController');
var ctrVoluntarios = require('../controllers/voluntarioController');
var ctrOportunidades = require('../controllers/oportunidadeController');
var ctrAlvosInteresse = require('../controllers/alvoInteresseController');
var ctrAreasInteresse = require('../controllers/areaInteresseController');
var router = express.Router();
/* Rotas Organizações */
router.get('/organizacoes', ctrOrganizacoes.findAll);
router.get('/organizacoes/:organizacao_id', ctrOrganizacoes.findOne);
router.post('/organizacoes', ctrOrganizacoes.create);
router.put('/organizacoes', ctrOrganizacoes.update);
router.delete('/organizacoes/:organizacao_id', ctrOrganizacoes.delete);
/* Rotas Voluntários */
router.get('/voluntarios', ctrVoluntarios.findAll);
router.get('/voluntarios/:voluntario_id', ctrVoluntarios.findOne);
router.post('/voluntarios', ctrVoluntarios.create);
router.put('/voluntarios', ctrVoluntarios.update);
router.delete('/voluntarios/:voluntario_id', ctrVoluntarios.delete);
/* Rotas Oportunidades */
router.get('/oportunidades', ctrOportunidades.findAll);
router.get('/oportunidades/:oportunidade_id', ctrOportunidades.findOne);
router.post('/oportunidades', ctrOportunidades.create);
router.put('/oportunidades', ctrOportunidades.update);
router.delete('/oportunidades/:oportunidade_id', ctrOportunidades.delete);
module.exports = router;