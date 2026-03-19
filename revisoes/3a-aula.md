# Revisão 3ª Aula

## Critérios Avaliados

- **Pasta**: deve ser exatamente `3a-aula`
- **Arquivo**: deve conter `3a-aula/index.html`
- **Frontend**: `index.html` (ou script carregado por ele) com `fetch` para **API local** (localhost) e manipulação do DOM
- **Backend**: `index.js` ou `server.js` (dentro de `3a-aula`) com Node.js + Express, endpoint `GET` retornando uma lista
- **Prazo**: entregue até 11/03 → **0,5 pontos**; após isso, desconto de **0,1 por dia de atraso**

---

## Estudantes Que Não Seguiram os Padrões

### ❌ Sem Entrega (8 estudantes)

| Estudante | Situação |
|-----------|----------|
| **ariel-oliveira** | Sem pasta `3a-aula` |
| **beatriz-mendonca** | Sem pasta `3a-aula` |
| **carlos-souza** | Sem pasta `3a-aula` |
| **dyego-schulz** | Sem pasta `3a-aula` |
| **eric-loli** | Sem pasta `3a-aula` |
| **marcelo-ballmann** | Sem pasta `3a-aula` |
| **marcos-bianco** | Sem pasta `3a-aula` |
| **otavio-eyng** | Sem pasta `3a-aula` |

### ❌ Nome da Pasta Incorreto (3 estudantes)

| Estudante | Pasta Usada | Pasta Esperada |
|-----------|-------------|----------------|
| **alehandro-leandro** | `3-aula` | `3a-aula` |
| **alerrandro-bp** | `3-aula` | `3a-aula` |
| **rian-machado** | `3-aula` | `3a-aula` |

### ❌ `index.html` Ausente ou em Subpasta (5 estudantes)

| Estudante | Situação |
|-----------|----------|
| **alerrandro-bp** | `3-aula/index.html` existe mas está vazio |
| **antonio-marcos-goulart** | Conteúdo todo em `3a-aula/localStorage/` (subpasta) |
| **cristian-m-bianco** | Arquivo nomeado `perfil.html`, sem `index.html` |
| **vinicius-mendes-tomaz** | Conteúdo todo em `3a-aula/api.3a-aula/` (subpasta) |
| **yala-pereira** | `index.html` em `3a-aula/public/` (subpasta) |

### ❌ Frontend Não Consome API Local (14 estudantes)

| Estudante | O que faz | Situação |
|-----------|-----------|----------|
| **alehandro-leandro** | APIs externas (cão, raposa, piada) | Sem fetch para localhost |
| **arthur-fuchter** | PokeAPI externa | Sem fetch para localhost |
| **cristian-m-bianco** | API externa (apilayer) | Sem fetch para localhost |
| **daniel-ascari** | `randomuser.me` | Sem fetch para localhost |
| **diana-alves** | `restcountries.com` | Frontend não consome a API local criada |
| **eduardo-jacob** | `randomuser.me` + `randomfox` | Frontend não consome a API local criada |
| **elisa-alberton** | `randomuser.me` | Sem fetch para localhost |
| **gabriel-carlin** | `metmuseum.org` | Frontend não consome a API local criada |
| **gabriel-coelho** | `./fatos.json` (arquivo local, não servidor) | Sem servidor; leitura direta de JSON |
| **lola-tramontin** | `randomuser.me` | Sem fetch para localhost |
| **luis-henrique** | `randomuser.me` | Frontend não consome a API local criada |
| **luiz-honorato** | `randomuser.me` | Frontend não consome a API local criada |
| **matheus-lessa** | `randomuser.me` | Sem fetch para localhost |
| **miguel-boeng** | `randomuser.me` | Sem fetch para localhost |

### ❌ Sem Backend ou Backend Incompleto (12 estudantes)

| Estudante | Situação |
|-----------|----------|
| **alehandro-leandro** | Sem `index.js`; `src.js` apenas faz fetches externos |
| **alerrandro-bp** | Sem backend |
| **anna-rocha** | Fetch para localhost correto, mas sem backend |
| **arthur-fuchter** | Sem backend |
| **daniel-arceno** | Backend Express existe, mas com erros de código (veja seção atenção) |
| **elisa-alberton** | `index.js` commitado vazio |
| **gabriel-coelho** | Sem backend |
| **leticia-oliveira** | Backend usa `http` nativo (não Express) |
| **lola-tramontin** | Sem backend |
| **matheus-lessa** | Backend usa `http` nativo e retorna HTML em vez de lista |
| **miguel-boeng** | Sem backend |
| **yala-pereira** | Backend usa `http` nativo (não Express) |

### ❌ Backend Retorna Dado Incorreto (3 estudantes)

| Estudante | Situação |
|-----------|----------|
| **cristian-m-bianco** | GET retorna string `'ola!'` em vez de lista |
| **daniel-ascari** | GET retorna objeto único via `req.body`, não lista |
| **eduardo-jacob** | GET retorna string `'olá'` em vez de lista |

---

## Pontuação — Todos os Estudantes

| Estudante | Pasta | index.html | Fetch local | DOM | Backend Express | Data do Commit | Atraso | Nota |
|-----------|:---:|:---:|:---:|:---:|:---:|----------------|--------|:----:|
| **alehandro-leandro** | ❌ | ✅ | ❌ | ✅ | ❌ | 12/03 (15:24) | 1 dia | — |
| **alerrandro-bp** | ❌ | ❌ | ❌ | ❌ | ❌ | 11/03 (20:57) | 0 dias | — |
| **ana-luiza-batista** | ✅ | ✅ | ✅ | ✅ | ✅ | 11/03 (20:18) | 0 dias | 0,5 |
| **andre-becker** | ✅ | ✅ | ✅ | ✅ | ✅ | 11/03 (20:29) | 0 dias | 0,5 |
| **anna-rocha** | ✅ | ✅ | ✅ | ✅ | ❌ | 11/03 (19:59) | 0 dias | 0,5 |
| **antonio-marcos-goulart** | ✅ | ❌ | ✅ | ✅ | ✅ | 14/03 (09:12) | 3 dias | 0,1 |
| **ariel-oliveira** | ❌ | ❌ | ❌ | ❌ | ❌ | sem entrega | — | 0,0 |
| **arthur-fuchter** | ✅ | ✅ | ❌ | ✅ | ❌ | 11/03 (20:06) | 0 dias | — |
| **beatriz-mendonca** | ❌ | ❌ | ❌ | ❌ | ❌ | sem entrega | — | 0,0 |
| **carlos-souza** | ❌ | ❌ | ❌ | ❌ | ❌ | sem entrega | — | 0,0 |
| **caue-castanhel** | ✅ | ✅ | ✅ | ✅ | ✅ | 11/03 (21:16) | 0 dias | 0,5 |
| **cristian-m-bianco** | ✅ | ❌ | ❌ | ✅ | ❌ | 11/03 (21:49) | 0 dias | — |
| **daniel-arceno** | ✅ | ✅ | ❌ | ✅ | ❌ | 11/03 (21:39) | 0 dias | — |
| **daniel-ascari** | ✅ | ✅ | ❌ | ✅ | ❌ | 11/03 (21:18) | 0 dias | 0,3 |
| **daniel-bagio-monteguti** | ✅ | ✅ | ❌ | ✅ | ✅ | 11/03 (21:44) | 0 dias | 0,3 |
| **davi-beckhauser** | ✅ | ❌ | ✅ | ✅ | ✅ | 17/03 (17:19) | 6 dias | 0,0 |
| **diana-alves** | ✅ | ✅ | ❌ | ✅ | ✅ | 11/03 (20:12) | 0 dias | 0,4 |
| **dyego-schulz** | ❌ | ❌ | ❌ | ❌ | ❌ | sem entrega | — | 0,0 |
| **eduardo-jacob** | ✅ | ✅ | ❌ | ✅ | ❌ | 11/03 (21:42) | 0 dias | — |
| **elisa-alberton** | ✅ | ✅ | ❌ | ✅ | ❌ | 11/03 (21:20) | 0 dias | — |
| **eric-loli** | ❌ | ❌ | ❌ | ❌ | ❌ | sem entrega | — | 0,0 |
| **gabriel-carlin** | ✅ | ✅ | ❌ | ✅ | ✅ | 11/03 (20:18) | 0 dias | 0,3 |
| **gabriel-coelho** | ✅ | ✅ | ❌ | ✅ | ❌ | 11/03 (20:01) | 0 dias | — |
| **gustavo-bianco** | ✅ | ✅ | ✅ | ✅ | ✅ | 11/03 (20:09) | 0 dias | 0,5 |
| **jose-felisbino** | ✅ | ✅ | ✅ | ✅ | ✅ | 11/03 (19:52) | 0 dias | 0,5 |
| **jose-herdt** | ✅ | ✅ | ✅ | ✅ | ✅ | 11/03 (21:40) | 0 dias | 0,5 |
| **kaua-oenning** | ✅ | ✅ | ✅ | ✅ | ✅ | 11/03 (20:09) | 0 dias | 0,5 |
| **lara-scremin** | ✅ | ✅ | ✅ | ✅ | ✅ | 11/03 (21:38) | 0 dias | 0,5 |
| **leticia-oliveira** | ✅ | ✅ | ✅ | ✅ | ❌ | 11/03 (19:04) | 0 dias | — |
| **lola-tramontin** | ✅ | ✅ | ❌ | ✅ | ❌ | 11/03 (20:11) | 0 dias | 0,3 |
| **lucca-muller** | ✅ | ✅ | ✅ | ✅ | ✅ | 11/03 (19:57) | 0 dias | 0,5 |
| **luis-filipe-bmuller** | ✅ | ✅ | ✅ | ✅ | ✅ | 13/03 (14:56) | 2 dias | 0,5 |
| **luis-henrique** | ✅ | ✅ | ❌ | ✅ | ✅ | 11/03 (20:22) | 0 dias | — |
| **luiz-honorato** | ✅ | ✅ | ❌ | ✅ | ✅ | 11/03 (20:08) | 0 dias | 0,3 |
| **marcelo-ballmann** | ❌ | ❌ | ❌ | ❌ | ❌ | sem entrega | — | 0,0 |
| **marcos-bianco** | ❌ | ❌ | ❌ | ❌ | ❌ | sem entrega | — | 0,0 |
| **matheus-lessa** | ✅ | ✅ | ❌ | ✅ | ❌ | 11/03 (21:41) | 0 dias | 0,3 |
| **miguel-boeng** | ✅ | ✅ | ❌ | ✅ | ❌ | 11/03 (20:18) | 0 dias | — |
| **otavio-eyng** | ❌ | ❌ | ❌ | ❌ | ❌ | sem entrega | — | 0,0 |
| **renan-volpato** | ✅ | ✅ | ❌ | ✅ | ❌ | 11/03 (21:06) | 0 dias | 0,3 |
| **rian-machado** | ❌ | ❌ | ❌ | ❌ | ✅ | 11/03 (21:29) | 0 dias | — |
| **vinicius-mattei** | ✅ | ✅ | ✅ | ✅ | ✅ | 11/03 (21:36) | 0 dias | 0,5 |
| **vinicius-mendes-tomaz** | ✅ | ❌ | ✅ | ✅ | ✅ | 11/03 (21:36) | 0 dias | 0,5 |
| **vitor-souza-vieira** | ✅ | ✅ | ✅ | ✅ | ✅ | 11/03 (19:21) | 0 dias | 0,5 |
| **welquer-esser** | ✅ | ✅ | ❌ | ✅ | ✅ | 17/03 (20:00) | 6 dias | 0,0 |
| **weslei-silva** | ✅ | ✅ | ❌ | ✅ | ❌ | 17/03 (19:04) | 6 dias | 0,0 |
| **yala-pereira** | ✅ | ❌ | ✅ | ✅ | ❌ | 11/03 (21:37) | 0 dias | — |
| **yuri-raldi** | ✅ | ✅ | ✅ | ✅ | ✅ | 11/03 (21:37) | 0 dias | 0,5 |

> Nota `—` = requer decisão do professor.

---

## ⚠️ Casos que Requerem Atenção

### 1. Sem entrega
- **ariel-oliveira**, **beatriz-mendonca**, **carlos-souza**, **dyego-schulz**, **eric-loli**, **marcelo-ballmann**, **marcos-bianco**, **otavio-eyng** — Sem nenhuma pasta `3a-aula` na branch.

### 2. Pasta incorreta
- **alehandro-leandro** — Usou `3-aula`. Sem backend. `src.js` consome apenas APIs externas. 1 dia atrasado.
- **alerrandro-bp** — Usou `3-aula`. `index.html` presente mas vazio (sem código).
- **rian-machado** — Usou `3-aula`. Sem nenhum HTML. Tem `index.js` com Express e GET retornando lista — apenas o backend foi entregue.

### 3. `index.html` em subpasta ou com outro nome
- **antonio-marcos-goulart** — Todo o conteúdo em `3a-aula/localStorage/` (subpasta extra). Fetch para `localhost:3000`, DOM e backend presentes. Entregue 3 dias após o prazo.
- **cristian-m-bianco** — Arquivo HTML nomeado `perfil.html`. Fetch para API externa (apilayer). Backend retorna string `'ola!'` em vez de lista.
- **vinicius-mendes-tomaz** — Todo o conteúdo em `3a-aula/api.3a-aula/` (subpasta extra). Fetch para localhost, DOM e backend funcionais.
- **yala-pereira** — `index.html` em `3a-aula/public/`. Backend usa `http` nativo (não Express), GET `/cidades` retorna lista.

### 4. Frontend usa API externa (deveria ser localhost)
- **arthur-fuchter** — Fetch para PokeAPI. Sem backend.
- **daniel-bagio-monteguti** — `index.html` faz fetch para `jsonplaceholder.typicode.com`. A versão correta (fetch para `localhost:3000/jogadores`) está em `api.html`. Backend Express presente e correto.
- **daniel-ascari** — Fetch para `randomuser.me`. Backend em `3a-aula.1/index.js` retorna objeto único via `req.body` em um GET (sem lista).
- **diana-alves** — Fetch para `restcountries.com`. Tem backend Express com lista, mas o frontend não o consome.
- **eduardo-jacob** — Fetch para `randomuser.me` e `randomfox`. Backend retorna string `'olá'` em vez de lista.
- **elisa-alberton** — Fetch para `randomuser.me`. `index.js` commitado vazio.
- **gabriel-carlin** — Fetch para `metmuseum.org`. Tem backend Express com lista de obras, mas o frontend não o consome.
- **gabriel-coelho** — Fetch para `./fatos.json` (leitura direta de arquivo local, não servidor HTTP). Sem backend.
- **lola-tramontin** — Fetch para `randomuser.me`. Sem backend.
- **luis-henrique** — Fetch para `randomuser.me`. Tem backend Express com lista de usuários, mas o frontend não o consome.
- **luiz-honorato** — Fetch para `randomuser.me`. Tem backend Express com lista, mas o frontend não o consome.
- **matheus-lessa** — Fetch para `randomuser.me`. Backend usa `http` nativo e retorna HTML em vez de lista JSON.
- **miguel-boeng** — Fetch para `randomuser.me`. Sem backend.

### 5. Backend incompleto ou sem Express
- **anna-rocha** — Fetch para `localhost:3000/usuarios` correto. Sem nenhum backend.
- **daniel-arceno** — Fetch com URL incompleta: `fetch('localhost:3000/...')` sem `http://` (falha no browser). Backend em `api/index.js` tem erros: `const users` definido depois de `app.get` (ReferenceError em runtime).
- **leticia-oliveira** — Fetch para localhost correto. Backend usa módulo `http` nativo (não Express). GET `/dados` retorna array/histórico — funcionalmente parecido, mas sem Express.
- **renan-volpato** — Fetch para API externa em `index.html`. Backend Express existe em `server/index.js`, mas GET `/` retorna objeto único, não lista.

### 6. Atrasados com nota zero (independente de outros problemas)
- **davi-beckhauser** — 6 dias de atraso (17/03). `indexApi.html` em vez de `index.html`.
- **welquer-esser** — 6 dias de atraso (17/03). Fetch para `randomuser.me` (externa). Backend Express com lista correto.
- **weslei-silva** — 6 dias de atraso (17/03). Fetch para `randomuser.me`. Sem backend.

### 7. Observações sem impacto na nota
- **jose-herdt**, **lucca-muller**, **vinicius-mattei** — `node_modules` commitado. Devem adicionar `node_modules` ao `.gitignore`.

---

## Resumo

| Situação | Qtd |
|----------|:---:|
| ✅ No prazo e correto | 12 |
| ⏰ Atrasado com nota reduzida | 1 (luis-filipe-bmuller → 0,3) |
| ⏰ Atrasado — nota zero | 3 |
| ❌ Sem entrega | 8 |
| ❓ Requer decisão do professor | 24 |
| **Total** | **48** |
