# MedClinic API

API para gerenciamento de uma clínica médica de pequeno porte. Este repositório contempla a **primeira etapa** do projeto: a base de autenticação e autorização do sistema (cadastro de usuários, login com JWT e controle de acesso baseado em perfis - RBAC). As funcionalidades de domínio da clínica (especialidades, médicos, pacientes e consultas) serão implementadas em uma etapa futura, sobre esta mesma base.

## Tecnologias utilizadas

- Node.js
- TypeScript
- Express.js
- TypeORM
- PostgreSQL
- JWT (jsonwebtoken)
- bcrypt
- dotenv

## Arquitetura

O projeto segue uma arquitetura em camadas (MVC), com separação clara de responsabilidades:

src/
├── config/
├── database/ # Configuracao do DataSource (TypeORM)
├── entities/ # Entidades do banco de dados
├── middlewares/ # Autenticacao, autorizacao (RBAC) e tratamento de erros
├── controllers/ # Recebem requisicoes HTTP e retornam respostas
├── services/ # Regras de negocio
├── repositories/ # Comunicacao com o banco via TypeORM
├── routes/ # Definicao dos endpoints
├── utils/ # Funcoes auxiliares (hash, JWT, AppError)
└── server.ts # Ponto de entrada da aplicacao


**Fluxo de execução:** Cliente HTTP → Route → Middleware (Auth/RBAC) → Controller → Service → Repository (TypeORM) → PostgreSQL

## Como executar o projeto

### Pré-requisitos

- Node.js (v18+)
- PostgreSQL instalado e em execução

### Passo a passo

1. Clone o repositório:
```bash
   git clone https://github.com/LucasdeSouzaPeixoto/medclinic-api.git
   cd medclinic-api
```

2. Instale as dependências:
```bash
   npm install
```

3. Crie um banco de dados PostgreSQL chamado `medclinic` (via pgAdmin ou psql).

4. Copie o arquivo `.env.example` para `.env` e preencha com os dados do seu banco:
```bash
   cp .env.example .env
```

   Variáveis necessárias:

PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=sua_senha
DB_NAME=medclinic
JWT_SECRET=uma_chave_secreta
JWT_EXPIRES_IN=1h


5. Execute a aplicação em modo desenvolvimento:
```bash
   npm run dev
```

   O TypeORM criará automaticamente a tabela `usuarios` no banco (via `synchronize: true`, adequado para o ambiente de desenvolvimento desta etapa).

6. A API estará disponível em `http://localhost:3000`.

### Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Executa a aplicação em modo desenvolvimento (com reload automático) |
| `npm run build` | Compila o TypeScript para JavaScript (pasta `dist/`) |
| `npm start` | Executa a aplicação já compilada (produção) |

## Perfis de acesso (RBAC)

| Perfil | Descrição |
|---|---|
| `admin` | Acesso completo, incluindo rotas administrativas |
| `atendente` | Acesso operacional restrito (perfil padrão no cadastro) |

## Endpoints

### Autenticação

**`POST /auth/register`** — Cadastra um novo usuário.

Body:
```json
{
  "nome": "Nome do Usuario",
  "email": "usuario@email.com",
  "senha": "senha123"
}
```
Resposta (`201 Created`): dados do usuário criado (sem a senha).

---

**`POST /auth/login`** — Autentica um usuário e retorna um token JWT.

Body:
```json
{
  "email": "usuario@email.com",
  "senha": "senha123"
}
```
Resposta (`200 OK`):
```json
{ "token": "..." }
```

### Verificação de autenticação/autorização

**`GET /users/me`** — Retorna os dados do usuário autenticado a partir do token. Requer header `Authorization: Bearer <token>`.

**`GET /admin/ping`** — Endpoint protegido, acessível apenas por usuários com perfil `admin`.

## Tratamento de erros

Erros de negócio (validação, credenciais inválidas, permissão negada, e-mail duplicado) são tratados de forma centralizada e retornam respostas JSON estruturadas com os status HTTP apropriados:

| Status | Quando ocorre |
|---|---|
| `400` | Dados inválidos ou campos obrigatórios ausentes |
| `401` | Token ausente/inválido/expirado, ou credenciais de login inválidas |
| `403` | Usuário autenticado sem permissão para o recurso (RBAC) |
| `409` | Tentativa de cadastro com e-mail já existente |
| `500` | Erro interno não tratado |

## Estrutura do banco de dados

A tabela `usuarios` é criada automaticamente pelo TypeORM (`synchronize: true`) ao rodar a aplicação em desenvolvimento. Alternativamente, o script `src/database/scripts/create-tables.sql` documenta a estrutura equivalente e pode ser executado manualmente no PostgreSQL, se preferido.

## Autor

Lucas de Souza Peixoto