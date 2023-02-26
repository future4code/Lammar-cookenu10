# API - Lammar-Cookenu10
## Repositório da API do projeto Cookenu.

:green_book: [Documentação para a API](https://documenter.getpostman.com/view/22376211/2s93CHuFSJ)

:satellite: [Link deploy Render](https://cookenu10.onrender.com)

### Como usar
- Clone o repositório
- Na pasta raiz rode `npm i` (ou equivalente) para instalar as dependências
- Crie um arquivo .env na raiz do projeto e preencha os parâmetros:
    - Dados do seu bando de dados
        - DB_HOST=""
        - DB_USER=""
        - DB_PASSWORD=""
        - DB_DATABASE=""
    - Jason Web Token
        - JWT_KEY="" (String "key" para que o JWT utilize na criação do token)
    - Nodemailer (Opcional)
        - NODEMAILER_USER = seu@email.com (Opcional)
        - NODEMAILER_PASS = suaSenhaDeAplicativo (Opcional)
        
- Rode `npm run migrations` na pasta raiz para criar as tabelas no banco de dados (MySQL).
- Rode `npm run start` na pasta raiz para iniciar o servidor
- Teste os endpoints através do arquivo request.rest, Postman ou equivalente.

### Desenvolvimento
- Arquitetura Limpa (Clean Architecture)
- POO (OOP)

### Dependências
* Express
* Cors
* Knex
* MySQL
* Typescript
* UUID
* JWT
* Nodemailer


### Endpoints disponíveis
* User
  - Get user profile
  - Get other user's profile
  - Get feed
  - Sign Up
  - Login
  - Follow user
  - Unfollow user
  - Delete account
  - Redefine password
  
 * Recipe
   - Search recipe
   - Create recipe
   - Edit recipe
   - Delete recipe


---
:computer: Desenvolvido por Rafael Castro.
