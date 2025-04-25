// Importamos o módulo dotenv para usar variáveis de ambiente
// É como se estivéssemos carregando os segredos que estão no arquivo .env
require('dotenv').config();

// Importamos o Express, que é um framework para criar servidores web
const express = require('express');

// Importamos o CORS, que permite que outros sites acessem nossa API
const cors = require('cors');

// Importamos nossa função de conexão com o banco de dados
// CORRIGIDO: O caminho estava com um ponto sem a barra
const connectDB = require('./config/database.js');

// Importamos as rotas de filmes que criamos
// CORRIGIDO: O caminho estava com um ponto sem a barra
const filmRoutes = require('./routes/FilmRoutes.js');

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
  res.send('Bem-vindo à API de Filmes! Use /api/films para acessar os recursos.');
});

// Todas as rotas de filmes começarão com /api/films
// Por exemplo: GET /api/films, POST /api/films, etc.
app.use('/api/films', filmRoutes);

// Iniciamos o servidor na porta definida
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port} 🚀`);
  console.log(`Use http://localhost:${port}/api/films para acessar a API de filmes`);
});