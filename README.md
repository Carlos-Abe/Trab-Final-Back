# Trab-Final-Back

# Titulo:
FreeTech API – Sistema de Gestão de Freelancers

# Descrição:
A FreeTech API é uma aplicação backend desenvolvida em Node.js + Express + MongoDB, criada para gerenciar freelancers, tarefas e projetos.
O sistema oferece funcionalidades de autenticação, cadastros, validações, controles de tarefas e projetos, além de documentação via Swagger.

Este repositório contém toda a API, incluindo testes automatizados, middleware de autenticação, validações e arquitetura organizada por camadas.

# Estrutura do Repositório
```
freetech-api/
├── src/
│   ├── config/
│   │   └── db.js
│
│   ├── controllers/
│   │   ├── usuarioController.js
│   │   ├── projetoController.js
│   │   ├── tarefaController.js
│   │   ├── freelancerController.js
│   │   └── authController.js
│
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── validateRequest.js
│   │   └── errorHandler.js
│
│   ├── models/
│   │   ├── usuarioModel.js
│   │   ├── projetoModel.js
│   │   ├── tarefaModel.js
│   │   └── freelancerModel.js
│
│   ├── routes/
│   │   ├── usuarioRoutes.js
│   │   ├── projetoRoutes.js
│   │   ├── tarefaRoutes.js
│   │   ├── freelancerRoutes.js
│   │   ├── authRoutes.js
│   │   └── index.js
│
│   └── tests/
│       ├── freelancer.test.js
│       ├── projeto.test.js
│       └── tarefa.test.js
│
├── app.js
├── swagger.yaml
├── server.js
├── package.json
├── .env
└── README.md
```

# URL Base da API
  A URL base (base URL) é o endereço principal onde a FreeTech API pode ser acessada.

  Se você estiver rodando localmente, a URL padrão é:
  http://localhost:3000

## Exemplo de endpoint completo:
   GET http://localhost:3000/api/tarefas

# Instalação das Dependências
  
## Produção
   npm install
   npm install dotenv mongoose jsonwebtoken bcrypt joi

## Desenvolvimento
   npm install --save-dev jest nodemon supertest mongodb-memory-server

# Executando o Projeto

## Modo desenvolvimento (com nodemon)
   npm run dev

## Modo produção
    npm start

# Conexão com o Banco de Dados
  O arquivo responsável pela conexão é:
  src/config/db.js

  Ele inicializa a conexão com o MongoDB usando Mongoose.

# Execução de Testes
A FreeTech API possui testes automatizados implementados com Jest e Supertest, garantindo a qualidade das rotas e funcionalidades principais.

## Instalar Dependências de Teste
   Caso ainda não estejam instaladas:
   pm install --save-dev jest supertest

   As configurações do Jest ficam definidas no package.json.
   ```json
    "scripts": {
        "start": "node server.js",
        "dev": "nodemon server.js",
        "test": "jest --watchAll"
    },
```
# Endpoints Principais
  A FreeTech API disponibiliza rotas REST para gerenciamento de usuários, autenticação, tarefas, projetos e freelancers.

## usuário
### Registrar Usuário
    POST /api/usuarios/registrar

### Login (gera token JWT)
    POST /api/usuarios/login

## Autenticação
### Autenticar usuário
    POST /api/auth/login

    Retorna um JWT, usado para acessar rotas protegidas.

# Documentação da API (Swagger)
  A FreeTech API conta com documentação interativa utilizando Swagger.yaml, permitindo visualizar e testar todos os endpoints diretamente pelo navegador.

  A interface Swagger UI será exibida, permitindo:

- Visualizar todas as rotas
- Testar endpoints
- Ver exemplos de requisição
- Analisar respostas e status codes


## Arquivo de Documentação
   A especificação da API está definida em:
   swagger.yaml

   Esse arquivo contém todos os endpoints, modelos e respostas da API.

## Acesso à Documentação
   Após iniciar o servidor, acesse:
   http://localhost:3000/api-docs

  

## Integração no Código
   A integração do Swagger ocorre no arquivo:

   app.js

   Usando os pacotes:

   - swagger-ui-express
   - yaml

# Issues e Responsáveis

## Issue 01 – Configurações iniciais
Responsável: Carlos

Tarefas:
- Criar o arquivo package.json e definir scripts iniciais;
- Instalar dependências principais (express, dotenv, mongoose, nodemon);
- Criar o arquivo server.js com configuração da porta;
- Criar a pasta src/config/db.js;
- Criar o arquivo de variáveis de ambiente .env;
- Testar inicialização do servidor com npm start.

## Issue 02 – Modelo de Usuário
Responsável: Carlos

Tarefas:
- Criar o arquivo usuarioModel.js;
- Definir campos obrigatórios: nome, email, senha, data de criação;
- Implementar validação de email e senha com Mongoose;
- Adicionar criptografia de senha com bcrypt,

## Issue 03 – Autenticação (Login e Cadastro)
Responsável: Carlos

Tarefas:
- Instalar jsonwebtoken e bcryptjs;
- Criar rota /api/login no usuarioController.js;
- Validar credenciais de usuário e senha;
- Gerar token JWT com tempo de expiração.

## Issue 04 – CRUD de Tarefas
Responsável: Airton

Tarefas:
- Criar tarefaModel.js;
- Criar rotas de criação, listagem, atualização e exclusão;
- Validar dados de entrada com middleware antes de salvar.

## Issue 05 – Testes de Tarefas
Responsável: Airton

Tarefas:
- Criar testes com Jest e Supertest;
- Criar arquivo tarefa.test.js;
- Escrever casos de teste para GET, POST, PUT e DELETE
- Analisar cobertura de testes

## Issue 06 – Middleware de Autenticação.
Responsável: Carlos

Tarefas:
- Criar authMiddleware.js;
- Aplicar middleware nas rotas de tarefas e projetos;
- Testar cenário com token inválido ou ausente.

## Issue 07 – Validações e Tratamento de Erros.
Responsável: Carlos

Tarefas:
- Criar validações com Joi;
- Instalar joi;
- Implementar errorHandler.js;
- Garantir respostas padronizadas em JSON.

## Issue 08 – CRUD de Projetos
Responsável: Airton

Tarefas:
- Criar projetoModel.js;
- Criar projetoController.js;
- Criar rotas /api/projetos;
- Validar campos obrigatórios na criação;
- Criar testes com Jest e Supertest.

## Issue 09 – CRUD de Freelancer
Responsável: Airton

Tarefas:
- Criar freelancerModel.js;
- Criar freelancerController.js;
- Integrar rotas no sistema;
- Testar com Postman;
- Criar testes com Jest e Supertest.

## Issue 10 – Documentação
Responsável: Airton

Tarefas:
- Instalar swagger-ui-express e yaml;
- Criar arquivo swagger.yaml;
- Integrar documentação na rota /api-docs;
- Atualizar README.

# Exemplos de Uso da API
A seguir estão exemplos reais de requisições e respostas dos principais endpoints da FreeTech API.

Eles podem ser utilizados no Postman, Insomnia, Thunder Client ou diretamente pelo Swagger. Neste projeto foi utilizado especificamente a extensão Postman do VSCode
1. Registrar Usuário

    POST /api/auth/registrar
    Body
    ```json
    {
        "nome": "Ana Silva",
        "email": "ana@mail.com",
        "senha": "123456",
        "perfil": "freelancer"
    }
    ```
    Resposta
     ```json
    {
         "mensagem": "Usuário registrado com sucesso"
    }
    ```

2. Login (Autenticação)
   
   Requisição

   POST /api/auth/login

   Body
   ```json
    {        
        "email": "ana@mail.com",
        "senha": "123456"
    }
    ```
    Resposta
     ```json
    {
        "token": "jwt-gerado-aqui"
    }
    ```
    O token deve ser enviado no header:

    Authorization: Bearer SEU_TOKEN

3. Atualizar usuário

   Requisição

   PUT / api/usuarios/:id

    Body
   ```json
    {        
        "nome": "Ana Silva Souza",
        "email": "ana.souza@mail.com",
        "senha": "novaSenha123",
        "perfil": "freelancer
    }
    ```
    Resposta
     ```json
    {
        "mensagem": "Usuário atualizado com sucesso",
        "usuario": {
            "_id": "691fcfba9634454da4340a23",
            "nome": "Ana Silva Souza",
            "email": "ana.souza@mail.com",
            "perfil": "freelancer"
        }
    }
    ```

4. Excluir usuário (DELETAR)

   Requisição

   PUT / api/usuarios/:id

   Authorization: Bearer SEU_TOKEN

   Body

   Não é necessário enviar body, apenas o ID no endpoint.

   Resposta

     ```json
    {
        "mensagem": "Usuário deletado com sucesso"
    }
    ```

5. Criar Tarefa

   Requisição

   POST /api/tarefas

   Authorization: Bearer SEU_TOKEN

   Content-Type: application/json

   Body
      ```json
    {
          "titulo": "Implementar autenticação",
          "descricao": "Adicionar JWT e middleware",
          "status": "pendente",
          "responsavel": "Carlos"
    }
    ```
    Resposta
    ```json
    {
        "mensagem": "Tarefa criada com sucesso",
        "tarefa": {
            "_id": "6759a81e23d45",
            "titulo": "Implementar autenticação",
            "descricao": "Adicionar JWT e middleware",
            "status": "pendente",
            "responsavel": "Carlos"
        }
    }
    ```

6. Criar Projeto

   POST /api/projetos

   Authorization: Bearer SEU_TOKEN

   Content-Type: application/json 

    Body
   ```json
    {
        "nome": "Sistema de Freelancers",
        "cliente": "Empresa X",
        "prazo": "2025-12-31",
        "status": "em andamento"
    }
   ```
   Resposta
   ```json
    {
       "mensagem": "Projeto criado com sucesso",
        "projeto": {
            "_id": "6759b9102da90",
            "nome": "Sistema de Freelancers",
            "cliente": "Empresa X",
            "prazo": "2025-12-31",
            "status": "em andamento"
        }
    }
   ```

5. Criar Freelancer 

   POST /api/freelancers

   Authorization: Bearer SEU_TOKEN

   Content-Type: application/json

   Body
   ```json
   {
        "nome": "Lucas Pereira",
        "area": "Desenvolvedor Fullstack",
        "disponibilidade": "Integral",
        "nota": 4.8
    }
   ```
   Resposta
   ```json
   {
        "mensagem": "Freelancer cadastrado com sucesso",
        "freelancer": {
            "_id": "6759c0102abc2",
            "nome": "Lucas Pereira",
            "area": "Desenvolvedor Fullstack",
            "disponibilidade": "Integral",
            "nota": 4.8
        }
    }
   ```

6. Listar Tarefas (exemplo de rota pública ou autenticada)

   GET /api/tarefas

   Authorization: Bearer SEU_TOKEN

   Resposta
   ```json
   [
        {
            "_id": "675bb305428d1",
            "titulo": "Implementar autenticação",
            "descricao": "Adicionar JWT e middleware",
            "status": "pendente",
            "responsavel": "Carlos"
        }
   ]
   ```

   