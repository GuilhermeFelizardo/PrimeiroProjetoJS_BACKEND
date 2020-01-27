const { Router } = require("express");

const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index);

module.exports = routes;


// Métodos HTTP: get, post, put, delete
// Tipos de parametros:

// Query Params: request.query(Filtros, ordenacao, paginacao...)
// Route Params: request.params(Identificar um recurso na alteracao ou remoccao)
// Body: request.body (Dados para criacao ou alteracao de um registro)
// MongoDB (NaoRelacional)