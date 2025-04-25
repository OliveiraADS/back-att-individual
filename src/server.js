// Importamos o módulo dotenv para usar variáveis de ambiente
// É como se estivéssemos carregando os segredos que estão no arquivo .env
require('dotenv').config();

// Importamos o Express, que é um framework para criar servidores web
const express = require('express');

// Importamos o CORS, que permite que outros sites acessem nossa API
const cors = require('cors');

// Importamos nossa função de conexão com o banco de dados
const connectDB = require('./config/database.js');

// Importamos as rotas de filmes que criamos
const filmRoutes = require('./routes/FilmRoutes.js');

// Importamos as rotas de usuários que acabamos de criar
// É como adicionar um novo caminho no nosso mapa da cidade
const userRoutes = require('./routes/UserRoutes.js');

// Criamos uma aplicação Express
const app = express();

// Conectamos ao banco de dados
connectDB();

// Configuramos o Express para entender requisições com dados JSON
app.use(express.json());

// Configuramos o CORS para permitir que qualquer site acesse nossa API
app.use(cors());

// Definimos a porta que o servidor vai usar
// Usamos a variável de ambiente PORT ou o valor padrão 3000
const port = process.env.PORT || 3000;

// Criamos uma rota principal para quando alguém acessar http://localhost:3000/
app.get('/', (req, res) => {
  res.send('Bem-vindo à API! Use /api/films para acessar os filmes ou /api/users para acessar os usuários.');
});

// Todas as rotas de filmes começarão com /api/films
// Por exemplo: GET /api/films, POST /api/films, etc.
app.use('/api/films', filmRoutes);

// Todas as rotas de usuários começarão com /api/users
// Por exemplo: GET /api/users, POST /api/users, etc.
// É como criar um novo bairro na cidade só para usuários
app.use('/api/users', userRoutes);

// Iniciamos o servidor na porta definida
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port} 🚀`);
  console.log(`Use http://localhost:${port}/api/films para acessar a API de filmes`);
  console.log(`Use http://localhost:${port}/api/users para acessar a API de usuários`);
});