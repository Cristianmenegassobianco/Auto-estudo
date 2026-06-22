<<<<<<< HEAD
## Conteúdo programado
- Apresentação da disciplina
- Prática de versionamento de arquivos com Git
    - criar branch com seu `[nome-sobrenome]`
    - para cada aula, criar uma pasta na sua branch seguindo o padrão: `#a-aula`
        - Exemplos: `1a-aula`, `2a-aula`...
- Alinhamento de conteúdo, conhecimento e expectativas com a turma
    - criar um arquivo index.html na pasta 1a-aula, dentro da sua branch, e responder a pergunta: `Até o final do semestre, o que quero entender?` (utilizar tags HTML `<ul>` e `<li>`)
- Copiar projeto final do semestre anterior para sua branch > pasta 1a-aula > e executá-lo

## Sugestões
- Utilize o site [roadmap.sh](https://roadmap.sh) como guia para aprender a respeito de software

## Anotações de aula
=======
# 1a Avaliação — Playlist Musical
### Equipe: 4 pessoas | Tempo: 2 horas

## Objetivo

Construir uma pequena API com dados em memória e um frontend que a consome via `fetch`.

## Ideia

Sistema para gerenciar artistas, suas músicas e montar playlists personalizadas com as músicas cadastradas.

### Entidades

- **Artista** — `id`, `nome`, `gênero musical`
- **Álbum** — `id`, `título`, `ano`, `idArtista`
- **Música** — `id`, `título`, `duração`, `idArtista`, `idÁlbum`
- **Playlist** — `id`, `nome`, `descrição`, `músicas[]`

## Divisão sugerida

- **1–3 integrantes:** backend — rotas `GET`, `POST`, `PUT/PATCH`, `DELETE` por entidade
- **1–2 integrantes:** frontend — listagem e formulário de cadastro por entidade
- **(+1 integrante em grupos maiores):** persistência com `LocalStorage` ou `SessionStorage`

## Entregável

- Repositório com ao menos um commit de cada integrante
- Aplicação rodando localmente sem erros

## Equipe

> Preencha com os nomes dos integrantes e o que cada um implementará.

| Integrante | O que implementará |
|---|---|
| Cristian Bianco | entidades backend |
| Gustavo Bianco | backend rotas |
| Vinicius Mattei | frontend |
>>>>>>> 572db611d12f7f852576702b8bdffe64ab3c5a8a

## Instruções de Implantação e Execução com Docker

### Como rodar localmente com Docker
1. Crie um arquivo `.env` na pasta `Playlist-musical` (use o `.env.example` como referência).
2. Na raiz da pasta `Playlist-musical`, execute o comando:
   ```bash
   docker-compose up --build
   ```
3. A aplicação estará disponível em `http://localhost:3001`

### Variáveis de Ambiente
As seguintes variáveis devem ser configuradas no seu arquivo `.env` para funcionamento correto (veja `Playlist-musical/.env.example`):
- `PORT`: Porta onde o backend rodará (padrão: 3001)
- `JWT_SECRET` e `JWT_REFRESH_SECRET`: Chaves secretas para geração de tokens JWT.
- Variáveis do banco de dados (ex: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`).

### Link da aplicação em produção
*A ser preenchido após o deploy na plataforma escolhida (ex: Render, Railway, Fly.io).*
Link: `[insira seu link aqui]`
