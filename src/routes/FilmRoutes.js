// Importamos o Express para criar as rotas
const express = require('express');

// Importamos o controlador de filmes que criamos
// CORRIGIDO: O caminho estava começando com / e precisa ser relativo
const filmController = require('../controllers/FilmController.js');

// Criamos um objeto de rotas do Express
const router = express.Router();

// Definimos as rotas e qual função do controlador cada uma vai usar

// Rota para listar todos os filmes - GET /api/films
// Quando alguém acessar esta URL, a função getAllFilms do controlador será executada
router.get('/', filmController.getAllFilms);

// Rota para adicionar um novo filme - POST /api/films
// Quando enviarmos dados para esta URL, a função createFilm será executada
router.post('/', filmController.createFilm);

// Rota para atualizar um filme existente - PUT /api/films/:id
// O :id é um parâmetro, ou seja, um valor que muda dependendo do filme
// Por exemplo: PUT /api/films/123456 (onde 123456 é o ID do filme)
router.put('/:id', filmController.updateFilm);

// Rota para deletar um filme - DELETE /api/films/:id
// Também usa o ID como parâmetro para saber qual filme deletar
router.delete('/:id', filmController.deleteFilm);

// Exportamos as rotas para usá-las no arquivo principal
module.exports = router;