# Desafio final do programa Trilhas-MA
## Aplicação em grupo

## Descrição
Sistema web de triagem e pesquisa de satisfação em saúde, desenvolvido em Node.js/Express com SQLite e frontend em HTML/JS. Permite cadastro/login de usuários, envio e armazenamento de respostas de triagem e pesquisa, exibição de dicas de saúde, dashboard, autenticação JWT e integração frontend/backend.

## Funcionalidades
- Cadastro e login de usuários (com autenticação JWT)
- Triagem médica online (perguntas e respostas)
- Pesquisa de satisfação sobre serviços de saúde
- Dashboard com dados e mapa
- Saudação personalizada e logout
- Envio automático de e-mail ao usuário após triagem e pesquisa
- Rotas protegidas e rotas de desenvolvedor para consulta de usuários

## Tecnologias
- Node.js + Express
- SQLite
- HTML, CSS, JavaScript (frontend)
- JWT para autenticação
- Nodemailer para envio de e-mails

## Como rodar o projeto
1. Instale as dependências:
   ```
   npm install
   ```
2. Configure o arquivo `.env` com as variáveis necessárias (exemplo: JWT_SECRET, GMAIL_USER, GMAIL_PASS)
3. Inicie o servidor:
   ```
   npm start
   ```
4. Acesse o frontend pelo navegador (ex: `http://localhost:3000`)

## Observações
- Após o envio da triagem ou pesquisa, o usuário recebe um e-mail automático de confirmação/agradecimento.
- O sistema utiliza prepared statements para evitar SQL Injection.
- Rotas de desenvolvedor disponíveis para consulta de usuários: `GET /dev/users`


## Equipe
- Saúde Conectada - MA
