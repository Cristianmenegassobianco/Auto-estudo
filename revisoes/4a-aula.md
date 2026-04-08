# Revisão — 4ª Aula

## Critérios avaliados

| Critério | Descrição |
|---|---|
| **Pasta** | Existe pasta chamada exatamente `4a-aula` no branch |
| **index.html** | Existe arquivo `index.html` dentro da pasta (ou descendente) |
| **index.js** | Existe arquivo `index.js` ou equivalente com implementação Node/Express |
| **Fetch interno** | O `fetch` no frontend aponta para `localhost` / URL relativa (API própria) |
| **CRUD HTTP** | O backend expõe GET, POST, PUT ou PATCH, e DELETE |
| **CRUD Frontend** | O frontend chama GET, POST, PUT ou PATCH, e DELETE via fetch |

**Prazo:** 22/03/2025 — entrega até essa data = 0,5 pt; após = −0,1 por dia de atraso (mínimo 0,0).
*(Datas registradas em BRT = UTC−3)*

---

## Situações identificadas

### Sem entrega (sem pasta `4a-aula`)

- **dyego-schulz** — branch existe, mas não contém a pasta `4a-aula`.
- **ariel-oliveira** — branch existe, mas não contém a pasta `4a-aula`.
- **carlos-souza** — branch existe, mas não contém a pasta `4a-aula`.
- **cristian-m-bianco** — branch existe, mas não contém a pasta `4a-aula`.
- **eric-loli** — branch existe, mas não contém a pasta `4a-aula`.
- **marcelo-ballmann** — branch existe, mas não contém a pasta `4a-aula`.
- **otavio-eyng** — branch existe, mas não contém a pasta `4a-aula`.

### Pasta entregue como submódulo Git

- **arthur-fuchter** — a entrada `4a-aula` no tree é do tipo `commit` (submódulo Git), não uma pasta real. Os arquivos não são acessíveis. Requer verificação manual.

### index.html ausente ou vazio

- **davi-beckhauser** — o arquivo HTML se chama `indexApi.html`, não `index.html`. O arquivo `index.html` não existe na pasta.
- **antonio-marcos-goulart** — o arquivo HTML se chama `4a-aula..html` (nome com ponto duplo), não `index.html`.
- **weslei-silva** — existe `index.html` mas está **vazio** (arquivo sem conteúdo). O backend (`index_aula_pratica.js`) não se chama `index.js`.

### Backend sem todos os métodos HTTP CRUD

- **alerrandro-bp** — o arquivo de backend se chama `inde.js` (sem `x`) e implementa apenas GET. Não há POST, PUT/PATCH, nem DELETE.
- **leticia-oliveira** — `server.js` implementa apenas GET e DELETE. Faltam POST e PUT/PATCH.
- **weslei-silva** — `index_aula_pratica.js` implementa GET e PUT, mas falta POST e DELETE.

### Frontend não chama todos os métodos CRUD

- **andre-becker** — o frontend em `index.html` faz apenas GET (fetch simples sem método), sem chamar POST, PUT/PATCH ou DELETE. O backend (`index.js`) tem GET, PUT e DELETE, mas a página não os usa.
- **lola-tramontin** — o `index.html` busca apenas GET (via `fetch(API)`) e POST (via fetch em `additionar` de `exemplo-index.js` que **não é carregado** pelo HTML). A lógica real de fetch do frontend está apenas no `tmp-api/index.js` que é código de servidor, não carregado pelo browser.
- **matheus-lessa** — o `index.html` usa URLs relativas (`/produtos`) sem `localhost` explícito, e faz GET, POST, PUT e DELETE — válido pois o backend serve o HTML estático. ✅ *(sem problema)*

### Implementação com erros no backend

- **renan-volpato** — o método `put` em `index.js` tenta usar as variáveis `nome` e `preco` **antes** de declará-las com `const { nome, preco } = req.body` (referência antes da declaração `const`). Isso causaria `ReferenceError` em runtime para qualquer chamada PUT.
- **weslei-silva** — `index_aula_pratica.js`: o endpoint `PUT /usuario` substitui o array `usuarios` por um objeto literal (perde todos os dados); o endpoint `DELETE /usuario/:codigo` existe mas não envia resposta (`resposta.send()`).

### Casos que requerem atenção do professor

- **alerrandro-bp** — arquivo de backend mal nomeado (`inde.js`), implementação incompleta.
- **arthur-fuchter** — entrega como submódulo Git, conteúdo inacessível.
- **leticia-oliveira** — backend incompleto (faltam POST e PUT/PATCH).
- **weslei-silva** — `index.html` vazio, backend mal nomeado e incompleto.

---

## Tabela completa

| Aluno | Pasta ✅/❌ | index.html ✅/❌ | index.js ✅/❌ | Fetch interno ✅/❌ | CRUD HTTP ✅/❌ | CRUD Frontend ✅/❌ | Data do commit (BRT) | Atraso | Nota |
|---|---|---|---|---|---|---|---|---|---|
| daniel-bagio-monteguti | ✅ | ✅ | ✅ (`server.js`) | ✅ | ✅ | ✅ | 18/03/2026 21:34 | — | 0,5 |
| dyego-schulz | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | — | — | 0,0 |
| alehandro-leandro | ✅ | ✅ | ✅ (`server.js`+`api.js`+`app.js`) | ✅ | ✅ | ✅ | 18/03/2026 19:24 | — | 0,5 |
| alerrandro-bp | ✅ | ✅ | ❌ (`inde.js`, só GET) | ✅ | ❌ | ❌ | 18/03/2026 21:11 | — | — |
| ana-luiza-batista | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 18/03/2026 21:23 | — | 0,5 |
| andre-becker | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ (só GET no frontend) | 22/03/2026 23:20 | +1 dia | 0,4 |
| anna-rocha | ✅ | ✅ | ✅ (`api/index.js`) | ✅ | ✅ | ✅ | 18/03/2026 21:07 | — | 0,5 |
| antonio-marcos-goulart | ✅ | ❌ (`4a-aula..html`) | ✅ (`index.js`+`crud.js`) | ✅ | ✅ | ✅ | 21/03/2026 14:13 | — | — |
| ariel-oliveira | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | — | — | 0,0 |
| arthur-fuchter | ⚠️ (submódulo) | ❌ | ❌ | ❌ | ❌ | ❌ | 25/03/2026 21:35 | — | — |
| beatriz-mendonca | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 19/03/2026 22:26¹ | — | 0,5 |
| carlos-souza | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | — | — | 0,0 |
| caue-castanhel | ✅ | ✅ (`frontend/index.html`) | ✅ (`backend/server.js`) | ✅ | ✅ | ✅ | 18/03/2026 23:24 | — | 0,5 |
| cristian-m-bianco | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | — | — | 0,0 |
| daniel-arceno | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 19/03/2026 09:17 | — | 0,5 |
| daniel-ascari | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (`script.js` carregado pelo HTML) | 18/03/2026 21:02 | — | 0,5 |
| davi-beckhauser | ✅ | ❌ (`indexApi.html`) | ✅ (`server.js`) | ✅ | ✅ | ✅ | 22/03/2026 19:28 | — | — |
| diana-alves | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 18/03/2026 21:26 | — | 0,5 |
| eduardo-jacob | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 18/03/2026 21:43 | — | 0,5 |
| elisa-alberton | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 22/03/2026 21:00 | — | 0,5 |
| eric-loli | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | — | — | 0,0 |
| gabriel-carlin | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 22/03/2026 20:13 | — | 0,5 |
| gabriel-coelho | ✅ | ✅ | ✅ (`server.js`; fetch em `javascript.js`) | ✅ | ✅ | ✅ | 19/03/2026 00:54 | — | 0,5 |
| gustavo-bianco | ✅ | ✅ | ✅ (`API/index.js`) | ✅ | ✅ | ✅ | 18/03/2026 21:28 | — | 0,5 |
| jose-felisbino | ✅ | ✅ | ✅ (`api/index.js`; fetch em `script.js`) | ✅ | ✅ | ✅ | 18/03/2026 19:31 | — | 0,5 |
| jose-herdt | ✅ | ✅ | ✅ (`server.js`) | ✅ | ✅ | ✅ | 18/03/2026 20:20 | — | 0,5 |
| kaua-oenning | ✅ | ✅ (`script.js` carregado) | ✅ (`api/index.js`) | ✅ | ✅ | ✅ | 21/03/2026 21:07 | — | 0,5 |
| lara-scremin | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 18/03/2026 21:43 | — | 0,5 |
| leticia-oliveira | ✅ | ✅ | ✅ (`server.js`, incompleto) | ✅ | ❌ (sem POST, sem PUT/PATCH) | ❌ | 25/03/2026 20:17 | — | — |
| lola-tramontin | ✅ | ✅ | ✅ (`tmp-api/index.js`) | ✅ | ✅ | ❌ (HTML só faz GET; frontend com CRUD está em exemplo-index.js não carregado) | 18/03/2026 20:45 | — | — |
| lucca-muller | ✅ | ✅ | ✅ (`server.js`) | ✅ | ✅ | ✅ | 25/03/2026 20:34 | +3 dias | 0,2 |
| luis-filipe-bmuller | ✅ | ✅ | ✅ (`server.js`) | ✅ | ✅ | ✅ | 19/03/2026 00:02 | — | 0,5 |
| luis-henrique | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 20/03/2026 18:57 | — | 0,5 |
| luiz-honorato | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 18/03/2026 21:40 | — | 0,5 |
| marcelo-ballmann | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | — | — | 0,0 |
| marcos-bianco | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 22/03/2026 20:43 | — | 0,5 |
| matheus-lessa | ✅ | ✅ | ✅ (`api/index.js`) | ✅ (URL relativa, backend serve HTML) | ✅ | ✅ | 18/03/2026 21:41 | — | 0,5 |
| miguel-boeng | ✅ | ✅ | ✅ (`node.js`) | ✅ | ✅ | ✅ | 22/03/2026 23:35 | +1 dia | 0,4 |
| otavio-eyng | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | — | — | 0,0 |
| renan-volpato | ✅ | ✅ | ✅ (PUT com erro em runtime) | ✅ | ⚠️ (PUT causa ReferenceError) | ✅ | 18/03/2026 20:29 | — | 0,5 |
| rian-machado | ✅ | ✅ | ✅ (`script.js` carregado) | ✅ | ✅ | ✅ | 18/03/2026 19:48 | — | 0,5 |
| vinicius-mattei | ✅ | ✅ | ✅ (`script.js` carregado) | ✅ | ✅ | ✅ | 18/03/2026 21:18 | — | 0,5 |
| vinicius-mendes-tomaz | ✅ | ✅ | ✅ (`script.js` carregado) | ✅ | ✅ | ✅ | 18/03/2026 20:58 | — | 0,5 |
| vitor-souza-vieira | ✅ | ✅ | ✅ (`server.js`) | ✅ | ✅ | ✅ | 18/03/2026 21:34 | — | 0,5 |
| welquer-esser | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 18/03/2026 20:34 | — | 0,5 |
| weslei-silva | ✅ | ❌ (vazio) | ❌ (`index_aula_pratica.js`, incompleto) | — | ❌ | ❌ | 18/03/2026 19:51 | — | — |
| yala-pereira | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 25/03/2026 20:59 | +3 dias | 0,2 |
| yuri-raldi | ✅ | ✅ | ✅ (`server.js`) | ✅ | ✅ | ✅ | 18/03/2026 21:38 | — | 0,5 |

¹ Beatriz Mendonca: commit registrado em `+0000` (UTC), convertido para BRT (UTC−3) = 19/03/2026 às 22:26.

---

## Casos que requerem atenção

### alerrandro-bp
O arquivo de backend se chama `inde.js` (falta o `x` — provavelmente erro de digitação ao commitar). O conteúdo implementa apenas um endpoint GET (`app.get('/')`) que faz proxy para API externa de moedas. Não há POST, PUT/PATCH nem DELETE. O frontend também chama apenas GET. **Nota sugerida: —** (requer decisão do professor sobre aceitar entrega parcial ou considerar como sem implementação adequada).

### antonio-marcos-goulart
O HTML foi commitado como `4a-aula..html` (ponto duplo no nome), não como `index.html`. A lógica de frontend CRUD (GET, POST, PUT, DELETE) está em `crud.js`, carregado pelo `4a-aula..html`. O backend (`index.js`) possui todos os endpoints CRUD. A entrega está funcional mas o nome do arquivo HTML não atende ao requisito. **Nota sugerida: —** (professor decide se aceita arquivo com nome incorreto; implementação em si está correta).

### arthur-fuchter
A entrada `4a-aula` no repositório é um **submódulo Git** (tipo `commit` na árvore), não uma pasta convencional. O conteúdo não pode ser lido via `git show`. A data de commit aponta para 25/03/2026 (3 dias de atraso). **Nota sugerida: —** (requer verificação manual do repositório referenciado pelo submódulo para avaliar a implementação).

### andre-becker
O frontend (`index.html`) executa apenas `fetch("http://localhost:3000/")` — uma única chamada GET. Não há chamadas POST, PUT/PATCH ou DELETE no frontend. O backend (`index.js`) tem GET, PUT e DELETE, mas o frontend não os utiliza. Ponto positivo: o servidor usa `randomuser.me` como proxy (GET interno válido). **Nota sugerida: —** (frontend não implementa CRUD completo).

### davi-beckhauser
O arquivo HTML entregue se chama `indexApi.html`, não `index.html`. O conteúdo é funcional com CRUD completo (GET, POST, PUT, DELETE no frontend e no backend `server.js`). A data de commit (22/03/2026 às 19:28 BRT) está dentro do prazo. **Nota sugerida: —** (professor decide se aceita arquivo com nome incorreto; implementação está correta e no prazo).

### leticia-oliveira
O `server.js` implementa apenas GET (`/dados`) e DELETE (`/dados`). Não há endpoints POST nem PUT/PATCH. O frontend (`script.js`) chama apenas GET e DELETE. A entrega é 3 dias após o prazo (25/03/2026). **Nota sugerida: —** (implementação incompleta + atraso).

### lola-tramontin
O `index.html` carrega `example-index.js` via tag `<script>` — esse arquivo, entretanto, não existe na pasta raiz de `4a-aula`; o arquivo disponível é `exemplo-index.js`. Além disso, o `index.html` em si faz apenas `fetch(API)` (GET). O CRUD completo existe no `tmp-api/index.js` (backend) e o código de fetch com POST/PUT/DELETE está no `exemplo-index.js`, mas este não é carregado corretamente pelo HTML. **Nota sugerida: —** (frontend não implementa CRUD completo na página entregue).

### renan-volpato
O endpoint `PUT /produto/:id` no `index.js` usa as variáveis `nome` e `preco` **antes** da linha `const { nome, preco } = req.body` (as linhas de validação com `if (!nome)` e `if (!preco)` aparecem antes da desestruturação). Em JavaScript com `const`, isso gera `ReferenceError: Cannot access 'nome' before initialization` em qualquer chamada PUT. Os demais endpoints (GET, POST, DELETE) funcionam corretamente. O frontend chama todos os métodos CRUD. **Nota sugerida: —** (bug crítico no PUT; professor decide se desconta ou aceita como entrega com erro).

### weslei-silva
O `index.html` está vazio (arquivo sem conteúdo). O `index_aula_pratica.js` (nome não conforme) é um módulo ES com `import` que implementa GET e PUT, mas falta POST e DELETE. Além disso, o endpoint PUT sobrescreve o array `usuarios` por um objeto (bug), e o DELETE não envia resposta HTTP. A entrega está no prazo. **Nota sugerida: —** (HTML vazio, backend mal nomeado e incompleto).

---

## Resumo por situação

| Situação | Quantidade |
|---|---|
| Entrega completa no prazo (0,5 pt) | 29 |
| Entrega completa com atraso | 3 (lucca-muller −3d, miguel-boeng −1d, yala-pereira −3d) |
| Sem entrega | 7 (dyego-schulz, ariel-oliveira, carlos-souza, cristian-m-bianco, eric-loli, marcelo-ballmann, otavio-eyng) |
| Requer decisão do professor | 9 (alerrandro-bp, antonio-marcos-goulart, arthur-fuchter, andre-becker, davi-beckhauser, leticia-oliveira, lola-tramontin, renan-volpato, weslei-silva) |

> **Nota:** o prazo é 22/03/2025 conforme o enunciado, mas todas as datas de commit são de 2026. Assumiu-se que o prazo real é **22/03/2026** e o cálculo de atraso foi feito com base nessa data.
