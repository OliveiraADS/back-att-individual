// Importamos o modelo de filme que criamos
const Film = require('../models/Film');

// Criamos um objeto que vai conter todas as funções do controlador
const filmController = {
  
  // Função para listar todos os filmes
  getAllFilms: async (req, res) => {
    try {
      // Buscamos todos os filmes no banco de dados
      const films = await Film.find();
      
      // Enviamos os filmes como resposta
      res.send(films);
      
      // Mostramos uma mensagem de sucesso no console
      console.log('Filmes listados com sucesso! 📋');
    } catch (error) {
      // Se der erro, enviamos uma mensagem de erro
      res.status(500).send("Erro ao listar filmes: " + error.message);
      console.error('Erro ao listar filmes:', error);
    }
  },
  
  // Função para adicionar um novo filme
  createFilm: async (req, res) => {
    try {
      // Criamos um novo filme com os dados enviados na requisição
      const film = new Film({
        title: req.body.title,
        subtitle: req.body.subtitle, // O valor padrão é definido no modelo
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
      });
      
      // Salvamos o filme no banco de dados
      await film.save();
      
      // Enviamos uma mensagem de sucesso como resposta
      res.status(201).send("Filme salvo com sucesso! 🎬");
      console.log('Novo filme adicionado:', film.title);
    } catch (error) {
      // Se der erro, enviamos uma mensagem de erro
      res.status(500).send("Erro ao salvar filme: " + error.message);
      console.error('Erro ao salvar filme:', error);
    }
  },
  
  // Função para atualizar um filme existente
  updateFilm: async (req, res) => {
    try {
      // Buscamos o filme pelo ID e atualizamos com os novos dados
      const film = await Film.findByIdAndUpdate(
        req.params.id, // ID do filme a ser atualizado
        {
          title: req.body.title,
          subtitle: req.body.subtitle,
          description: req.body.description,
          image_url: req.body.image_url,
          trailer_url: req.body.trailer_url
        },
        { new: true } // Esta opção faz retornar o documento atualizado
      );
      
      // Se o filme não for encontrado
      if (!film) {
        return res.status(404).send("Filme não encontrado! 😕");
      }
      
      // Enviamos o filme atualizado como resposta
      res.send(film);
      console.log('Filme atualizado:', film.title);
    } catch (error) {
      // Se der erro, enviamos uma mensagem de erro
      res.status(500).send("Erro ao atualizar filme: " + error.message);
      console.error('Erro ao atualizar filme:', error);
    }
  },
  
  // Função para deletar um filme
  deleteFilm: async (req, res) => {
    try {
      // Buscamos o filme pelo ID e o deletamos
      const film = await Film.findByIdAndDelete(req.params.id);
      
      // Se o filme não for encontrado
      if (!film) {
        return res.status(404).send("Filme não encontrado! 😕");
      }
      
      // Enviamos o filme deletado como resposta
      res.send(film);
      console.log('Filme deletado:', film.title);
    } catch (error) {
      // Se der erro, enviamos uma mensagem de erro
      res.status(500).send("Erro ao deletar filme: " + error.message);
      console.error('Erro ao deletar filme:', error);
    }
  }
};

// Exportamos o controlador para usá-lo em outros arquivos
module.exports = filmController;