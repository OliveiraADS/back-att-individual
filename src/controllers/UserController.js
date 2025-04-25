// Importamos o modelo de usuário que criamos
// É como pegar o molde de bolinhos para fazer vários bolinhos
const User = require('../models/User');

// Verificação para garantir que o modelo está carregando corretamente
console.log("Modelo User carregado:", typeof User, Object.keys(User));

// Criamos um objeto que vai conter todas as funções do controlador
// É como uma caixa de ferramentas com várias ferramentas diferentes
const userController = {
  
  // Função para listar todos os usuários
  // É como abrir a gaveta e ver todos os usuários que temos
  getAllUsers: async (req, res) => {
    try {
      // Buscamos todos os usuários no banco de dados
      // É como pedir para alguém: "me mostra todos os usuários que você tem"
      const users = await User.find().select('-senha'); // Não mostramos a senha por segurança
      
      // Enviamos os usuários como resposta
      // É como entregar a lista de usuários para quem pediu
      res.send(users);
      
      // Mostramos uma mensagem de sucesso no console
      console.log('Usuários listados com sucesso! 👨‍👩‍👧‍👦');
    } catch (error) {
      // Se der erro, enviamos uma mensagem de erro
      // É como dizer: "Ops, não consegui encontrar os usuários!"
      res.status(500).send("Erro ao listar usuários: " + error.message);
      console.error('Erro ao listar usuários:', error);
    }
  },
  
  // Função para adicionar um novo usuário
  // É como criar um novo bonequinho e colocar na gaveta
  createUser: async (req, res) => {
    try {
      // Verificamos se as senhas batem (a senha e a confirmação)
      // É como verificar se duas peças de quebra-cabeça encaixam
      if (req.body.senha !== req.body.confirmaSenha) {
        return res.status(400).send("As senhas não coincidem! 🔑");
      }
      
      // Verificamos se já existe um usuário com este email
      // É como olhar na gaveta se já tem um boneco com o mesmo nome
      const usuarioExistente = await User.findOne({ email: req.body.email });
      if (usuarioExistente) {
        return res.status(400).send("Este email já está sendo usado! 📧");
      }
      
      // Criamos um novo usuário com os dados enviados na requisição
      // É como pegar massinha e fazer um boneco seguindo um desenho
      const user = new User({
        nome: req.body.nome,                 // O nome simples
        nomeCompleto: req.body.nomeCompleto, // O nome completo
        email: req.body.email,               // O email (novo campo!)
        senha: req.body.senha                // A senha (novo campo!)
        // A data de criação é automática, não precisamos informar
      });
      
      // Salvamos o usuário no banco de dados
      // É como guardar o boneco na gaveta
      await user.save();
      
      // Criamos uma cópia do usuário sem a senha para enviar como resposta
      // É como tirar uma foto do boneco, mas sem mostrar uma parte dele
      const userSemSenha = {
        _id: user._id,
        nome: user.nome,
        nomeCompleto: user.nomeCompleto,
        email: user.email,
        dataCriacao: user.dataCriacao
      };
      
      // Enviamos uma mensagem de sucesso como resposta
      // É como dizer: "Prontinho! Usuário criado!"
      res.status(201).send({
        message: "Usuário salvo com sucesso! 👤",
        user: userSemSenha // Enviamos o usuário sem a senha
      });
      console.log('Novo usuário adicionado:', user.nome);
    } catch (error) {
      // Se der erro, enviamos uma mensagem de erro
      // É como dizer: "Puxa, não consegui criar o usuário..."
      res.status(500).send("Erro ao salvar usuário: " + error.message);
      console.error('Erro ao salvar usuário:', error);
    }
  },
  
  // Função para fazer login
  // É como verificar se a pessoa tem a chave certa para entrar na casa
  login: async (req, res) => {
    try {
      console.log('Tentativa de login recebida:', req.body.email);
      
      // Buscamos um usuário com o email informado
      // É como procurar na gaveta um boneco com um nome específico
      const user = await User.findOne({ email: req.body.email });
      
      console.log('Usuário encontrado:', user ? 'Sim' : 'Não');
      
      // Se não encontrarmos o usuário ou a senha estiver errada
      // É como dizer: "Não conheço você ou sua chave está errada"
      if (!user || user.senha !== req.body.senha) {
        console.log('Senha incorreta ou usuário não encontrado');
        return res.status(401).send("Email ou senha incorretos! 🔒");
      }
      
      // Criamos uma cópia do usuário sem a senha para enviar como resposta
      // É como tirar uma foto do boneco, mas sem mostrar uma parte dele
      const userSemSenha = {
        _id: user._id,
        nome: user.nome,
        nomeCompleto: user.nomeCompleto,
        email: user.email,
        dataCriacao: user.dataCriacao
      };
      
      console.log('Login bem-sucedido para:', user.email);
      
      // Enviamos o usuário como resposta (sem a senha)
      // É como dizer: "Você pode entrar! Aqui está seu crachá"
      res.send({
        message: "Login realizado com sucesso! 🎉",
        user: userSemSenha
      });
      console.log('Usuário fez login:', user.nome);
    } catch (error) {
      // Se der erro, enviamos uma mensagem de erro
      console.error('Erro ao processar login:', error);
      res.status(500).send("Erro ao fazer login: " + error.message);
      console.error('Erro ao fazer login:', error);
    }
  },
  
  // Função para buscar um usuário pelo ID
  // É como procurar um boneco específico na gaveta
  getUserById: async (req, res) => {
    try {
      // Buscamos o usuário pelo ID
      // É como pedir: "Me dá aquele boneco com a etiqueta número 123"
      // Usamos o método findOne com _id para substituir o findById
      const user = await User.findOne({_id: req.params.id}).select('-senha');
      
      // Se o usuário não for encontrado
      // É como não achar o boneco que você estava procurando
      if (!user) {
        return res.status(404).send("Usuário não encontrado! 😕");
      }
      
      // Enviamos o usuário como resposta
      // É como entregar o boneco para quem pediu
      res.send(user);
    } catch (error) {
      // Se der erro, enviamos uma mensagem de erro
      res.status(500).send("Erro ao buscar usuário: " + error.message);
      console.error('Erro ao buscar usuário:', error);
    }
  },
  
  // Função para atualizar um usuário existente
  // É como mudar o penteado ou a roupa de um boneco
  updateUser: async (req, res) => {
    try {
      // Se quiser mudar a senha, verificamos se as senhas batem
      // É como verificar se a nova chave funciona
      if (req.body.senha && req.body.senha !== req.body.confirmaSenha) {
        return res.status(400).send("As senhas não coincidem! 🔑");
      }
      
      // Preparamos os dados que vamos atualizar
      // É como separar as novas roupas que o boneco vai usar
      const dadosAtualizados = {
        nome: req.body.nome,
        nomeCompleto: req.body.nomeCompleto,
        email: req.body.email
      };
      
      // Só incluímos a senha se ela foi enviada
      // É como só trocar a fechadura se tiver uma chave nova
      if (req.body.senha) {
        dadosAtualizados.senha = req.body.senha;
      }
      
      // Buscamos o usuário pelo ID e atualizamos com os novos dados
      // É como pegar o boneco da gaveta e mudar algumas partes dele
      // Substituímos findByIdAndUpdate por findOneAndUpdate com _id
      const user = await User.findOneAndUpdate(
        {_id: req.params.id}, // ID do usuário a ser atualizado
        dadosAtualizados,
        { new: true } // Esta opção faz retornar o documento atualizado
      ).select('-senha'); // Não mostramos a senha
      
      // Se o usuário não for encontrado
      // É como procurar um boneco que não existe
      if (!user) {
        return res.status(404).send("Usuário não encontrado! 😕");
      }
      
      // Enviamos o usuário atualizado como resposta
      // É como mostrar o boneco depois das mudanças
      res.send(user);
      console.log('Usuário atualizado:', user.nome);
    } catch (error) {
      // Se der erro, enviamos uma mensagem de erro
      res.status(500).send("Erro ao atualizar usuário: " + error.message);
      console.error('Erro ao atualizar usuário:', error);
    }
  },
  
  // Função para deletar um usuário
  // É como jogar um boneco fora quando não queremos mais
  deleteUser: async (req, res) => {
    try {
      // Buscamos o usuário pelo ID e o deletamos
      // É como pegar um boneco específico e jogar no lixo
      // Substituímos findByIdAndDelete por findOneAndDelete com _id
      const user = await User.findOneAndDelete({_id: req.params.id});
      
      // Se o usuário não for encontrado
      // É como não achar o boneco que você queria jogar fora
      if (!user) {
        return res.status(404).send("Usuário não encontrado! 😕");
      }
      
      // Enviamos o usuário deletado como resposta (sem a senha)
      // É como mostrar o boneco que jogamos fora (só para confirmar)
      const userSemSenha = {
        _id: user._id,
        nome: user.nome,
        nomeCompleto: user.nomeCompleto,
        email: user.email,
        dataCriacao: user.dataCriacao
      };
      
      res.send(userSemSenha);
      console.log('Usuário deletado:', user.nome);
    } catch (error) {
      // Se der erro, enviamos uma mensagem de erro
      res.status(500).send("Erro ao deletar usuário: " + error.message);
      console.error('Erro ao deletar usuário:', error);
    }
  }
};

// Exportamos o controlador para usá-lo em outros arquivos
// É como empacotar nossa caixa de ferramentas para levar para outro lugar
module.exports = userController;