// Importamos o mongoose para criar nosso modelo
// Mongoose é como um tradutor que nos ajuda a falar com o banco de dados MongoDB
const mongoose = require('mongoose');

// Verificamos se o mongoose está carregando corretamente
console.log("Mongoose carregado:", typeof mongoose);

// Criamos um esquema, que é como um molde para fazer bolinhos
// Esse molde vai dizer como todos os usuários devem ser
const userSchema = new mongoose.Schema({
  // O nome do usuário, que será um texto simples (como "João")
  nome: {
    type: String,           // O tipo é texto
    required: true          // É obrigatório, não podemos deixar em branco
  },
  
  // O nome completo do usuário, que também é um texto (como "João Silva Oliveira")
  nomeCompleto: {
    type: String,           // O tipo é texto
    required: true          // É obrigatório, não podemos deixar em branco
  },
  
  // O email do usuário, que também é um texto (como "joao@email.com")
  email: {
    type: String,           // O tipo é texto
    required: true,         // É obrigatório, não podemos deixar em branco
    unique: true            // Cada email deve ser único, não pode ter dois iguais
  },
  
  // A senha do usuário, que também é um texto (como "senha123")
  senha: {
    type: String,           // O tipo é texto
    required: true          // É obrigatório, não podemos deixar em branco
  },
  
  // A data em que o usuário foi criado no sistema
  dataCriacao: {
    type: Date,             // O tipo é data (dia, mês, ano, hora...)
    default: Date.now       // Se não informarmos uma data, vai usar a data atual
  }
});

// Criamos o modelo a partir do esquema
// 'user' é o nome da coleção no MongoDB (como uma gaveta onde guardamos todos os usuários)
// userSchema é a estrutura que definimos acima (nosso molde de bolinhos)
const User = mongoose.model('user', userSchema);

// Verificamos se o modelo foi criado corretamente
console.log("Modelo User criado:", typeof User, Object.keys(User));

// Exportamos o modelo para usá-lo em outros arquivos
// É como emprestar o molde para outra pessoa fazer bolinhos também
module.exports = User;