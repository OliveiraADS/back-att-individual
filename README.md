# Star Wars API - Backend

API RESTful para gerenciar uma coleção de filmes Star Wars e usuários. Este projeto foi desenvolvido como parte de um trabalho acadêmico, utilizando Node.js, Express e MongoDB.

## Demo Online

A API está disponível online em:
[https://starwars-api-5gzh.onrender.com](https://starwars-api-5gzh.onrender.com)

## Endpoints da API

### Filmes
- `GET /api/films` - Listar todos os filmes
- `GET /api/films/:id` - Obter um filme específico
- `POST /api/films` - Criar um novo filme
- `PUT /api/films/:id` - Atualizar um filme existente
- `DELETE /api/films/:id` - Excluir um filme

### Usuários
- `GET /api/users` - Listar todos os usuários
- `GET /api/users/:id` - Obter um usuário específico
- `POST /api/users` - Criar um novo usuário
- `POST /api/users/login` - Fazer login
- `PUT /api/users/:id` - Atualizar um usuário existente
- `DELETE /api/users/:id` - Excluir um usuário

## Estrutura do Projeto

```
starwars-api/
├── .env                 (Variáveis de ambiente)
├── .gitignore
├── package.json
├── server.js            (Arquivo principal)
├── config/
│   └── database.js      (Configuração de conexão com o banco de dados)
├── controllers/
│   ├── FilmController.js (Controlador de Filmes)
│   └── UserController.js (Controlador de Usuários)
├── models/
│   ├── Film.js          (Modelo de Filme)
│   └── User.js          (Modelo de Usuário)
└── routes/
    ├── FilmRoutes.js    (Rotas relacionadas aos Filmes)
    └── UserRoutes.js    (Rotas relacionadas aos Usuários)
```

## Modelos de Dados

### Filme (Film)
- `title`: String (obrigatório)
- `subtitle`: String (padrão: "Sem subtítulo")
- `description`: String (obrigatório)
- `image_url`: String
- `trailer_url`: String
- `createdAt`: Date (automático)

### Usuário (User)
- `nome`: String (obrigatório)
- `nomeCompleto`: String (obrigatório)
- `email`: String (obrigatório, único)
- `senha`: String (obrigatório)
- `dataCriacao`: Date (automático)

## Tecnologias Utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- cors

## Requisitos

- Node.js (v14.x ou superior)
- MongoDB (local ou Atlas)

## Instalação e Execução

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/starwars-api.git
cd starwars-api
```

2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
MONGODB_URI=mongodb+srv://seu_usuario:sua_senha@seu_cluster.mongodb.net/starwars-api
PORT=3000
```

4. Inicie o servidor:
```bash
npm start
```

5. O servidor estará disponível em `http://localhost:3000`

## Dependências

Instale as dependências necessárias com:
```bash
npm install express mongoose cors dotenv
```

Para desenvolvimento, é recomendado instalar também o nodemon:
```bash
npm install --save-dev nodemon
```

## Exemplos de Uso

### Criar um Usuário
```
POST /api/users
Content-Type: application/json

{
  "nome": "João",
  "nomeCompleto": "João Silva",
  "email": "joao@exemplo.com",
  "senha": "senha123",
  "confirmaSenha": "senha123"
}
```

### Login
```
POST /api/users/login
Content-Type: application/json

{
  "email": "joao@exemplo.com",
  "senha": "senha123"
}
```

### Criar um Filme
```
POST /api/films
Content-Type: application/json

{
  "title": "Star Wars: Episódio IV",
  "subtitle": "Uma Nova Esperança",
  "description": "A princesa Leia é mantida refém pelas forças imperiais comandadas por Darth Vader.",
  "image_url": "https://example.com/image.jpg",
  "trailer_url": "https://youtube.com/watch?v=1234567890"
}
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Autor

Seu Nome - [GitHub](https://github.com/seu-usuario)

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
