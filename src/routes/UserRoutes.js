// Importamos o Express para criar as rotas
// Express é como um carteiro que sabe entregar cartas nos endereços certos
const express = require('express');

// Importamos o controlador de usuários que criamos
// É como chamar um amigo que sabe lidar com usuários para nos ajudar
const userController = require('../controllers/UserController');

// Criamos um objeto de rotas do Express
// É como fazer um mapa dos caminhos
const router = express.Router();

// Definimos as rotas e qual função do controlador cada uma vai usar
// É como dizer: "Quando alguém bater nesta porta, chame este amigo"

// Rota para listar todos os usuários - GET /api/users
// Quando alguém acessar esta URL, a função getAllUsers do controlador será executada
router.get('/', userController.getAllUsers);

// Rota para buscar um usuário pelo ID - GET /api/users/:id
// O :id é um parâmetro, como se fosse o número de uma casa
router.get('/:id', userController.getUserById);

// Rota para adicionar um novo usuário - POST /api/users
// Quando enviarmos dados para esta URL, a função createUser será executada
router.post('/', userController.createUser);

// Rota para fazer login - POST /api/users/login
// É como ter uma porta especial só para entrar na casa
router.post('/login', userController.login);

// Rota para atualizar um usuário existente - PUT /api/users/:id
// É como reformar uma casa específica
router.put('/:id', userController.updateUser);

// Rota para deletar um usuário - DELETE /api/users/:id
// É como demolir uma casa específica
router.delete('/:id', userController.deleteUser);

// Exportamos as rotas para usá-las no arquivo principal
// É como dar o mapa para o chefe da cidade
module.exports = router;