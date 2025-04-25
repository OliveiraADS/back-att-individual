// Importamos o mongoose, que é uma biblioteca que nos ajuda a trabalhar com o MongoDB
const mongoose = require('mongoose');

// Aqui pegamos a URL do banco de dados das variáveis de ambiente
const dbURI = process.env.MONGODB_URI;

// Esta função vai conectar nosso programa ao banco de dados MongoDB
const connectDB = async () => {
  try {
    // Tentamos nos conectar ao banco de dados
    await mongoose.connect(dbURI);
    
    // Se der certo, mostramos esta mensagem no console
    console.log('MongoDB conectado com sucesso! 😁');
  } catch (error) {
    // Se der erro, mostramos o erro no console
    console.error('Erro ao conectar ao MongoDB:', error.message);
    
    // E encerramos o programa com código de erro
    process.exit(1);
  }
};

// Exportamos a função para que outros arquivos possam usá-la
module.exports = connectDB;

