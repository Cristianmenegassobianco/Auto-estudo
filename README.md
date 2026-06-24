## Autoestudo 01 — Docker + Deploy
### Prazo: 24/06/2026

> Atividade **opcional** — vale até **2 pontos extras** (x2 para quem fez a revisão do ENADE) somados à menor nota.

---

### Objetivo

Containerizar a aplicação desenvolvida na 2a avaliação e publicá-la em um ambiente de produção acessível publicamente.

---

### Requisitos

1. **Crie um `Dockerfile`** para o backend da sua aplicação
   - A imagem deve instalar as dependências e executar o servidor corretamente
   - Utilize uma imagem base adequada (ex: `node:20-alpine`)

2. **Crie um `docker-compose.yml`** que suba o ambiente completo:
   - Backend
   - Banco de dados (o mesmo utilizado na 2a avaliação)
   - Variáveis de ambiente configuradas via `.env` (não commite o `.env`, use `.env.example`)

3. **Faça o deploy** da aplicação em uma plataforma gratuita:
   - Sugestões: [Render](https://render.com), [Railway](https://railway.app), [Fly.io](https://fly.io)
   - O banco de dados também deve estar acessível no ambiente de produção

4. **Atualize o `README.md`** da sua entrega com:
   - Instruções para rodar localmente via Docker (`docker-compose up`)
   - Link da aplicação em produção
   - Variáveis de ambiente necessárias (use `.env.example` como referência)

---

### Entrega

- **Crie uma branch** com base nesta (`autoestudo-1`), seguindo o padrão `autoestudo-1-[nome-sobrenome]` (ex: `autoestudo-1-joao-silva`)
- Commite o código dentro de uma pasta chamada `autoestudo-1`

---

### Sugestões de estudo

- [Documentação oficial do Docker](https://docs.docker.com/get-started/)
- [Docker Compose — getting started](https://docs.docker.com/compose/gettingstarted/)
- [Deploy no Render (Node.js)](https://render.com/docs/deploy-node-express-app)
- [Railway — Deploy from GitHub](https://docs.railway.app/getting-started)

---

## 🚀 Minha Entrega

### 🔗 Link em Produção
A aplicação está acessível publicamente no Railway através do link:
**https://auto-estudo-production.up.railway.app**

### 🐳 Como rodar localmente via Docker
Para rodar este projeto na sua máquina local utilizando o Docker, siga os passos abaixo:

1. Renomeie o arquivo `.env.example` para `.env` (ou crie um novo arquivo `.env` na mesma pasta baseando-se no de exemplo).
2. Abra o terminal na pasta onde o `docker-compose.yml` está localizado.
3. Execute o comando para subir os containers:
   ```bash
   docker-compose up --build
   ```
4. A aplicação estará rodando nas portas configuradas (ex: 3001 para o backend).

### ⚙️ Variáveis de Ambiente Necessárias
As seguintes variáveis de ambiente são exigidas para o funcionamento da aplicação (conforme referenciado no `.env.example`):
- Variáveis do banco de dados (ex: caminho do SQLite).
- Chave secreta do JWT (`JWT_SECRET`).
- Porta do servidor (`PORT`).
