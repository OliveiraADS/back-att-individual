// Importamos o mongoose para criar nosso modelo
const mongoose = require('mongoose');

// Criamos um esquema, que é como um molde para nossos documentos
// Um esquema descreve a estrutura que nossos dados terão no banco
const filmSchema = new mongoose.Schema({
  // O título do filme, que será um texto
  title: {
    type: String,
    required: true // Isso significa que o título é obrigatório
  },
  
  // O subtítulo do filme, que também é um texto
  subtitle: {
    type: String,
    default: "Sem subtítulo" // Se não informarmos um subtítulo, será "Sem subtítulo"
  },
  
  // A descrição do filme
  description: {
    type: String,
    required: true // A descrição também é obrigatória
  },
  
  // URL da imagem do filme
  image_url: {
    type: String
  },
  
  // URL do trailer do filme
  trailer_url: {
    type: String
  },
  
  // Data em que o filme foi adicionado ao banco
  createdAt: {
    type: Date,
    default: Date.now // Define a data atual quando um filme é criado
  }
});

// Criamos o modelo a partir do esquema
// 'film' é o nome da coleção no MongoDB
// filmSchema é a estrutura que definimos acima
const Film = mongoose.model('film', filmSchema);

// Exportamos o modelo para usá-lo em outros arquivos
module.exports = Film;