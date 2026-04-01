# Revisão — 5a Aula

**Data de avaliação:** 30/03/2026
**Prazo de entrega:** 29/03/2026 (nota cheia: 0,5 pts; após prazo: −0,1/dia, mínimo 0,0)
**Fuso horário:** BRT = UTC−3

---

## Critérios Avaliados

| # | Critério | Descrição |
|---|---|---|
| 1 | Pasta `5a-aula` | Branch contém pasta nomeada exatamente `5a-aula` |
| 2 | `index.html` | Arquivo `index.html` presente dentro da pasta (ou descendente) |
| 3 | Backend (`index.js` ou equiv.) | Arquivo de backend Node.js/Express presente |
| 4 | Fetch interno | `index.html` ou JS carregado por ele contém `fetch` apontando para API interna (localhost/caminho relativo) |
| 5 | Segunda entidade | Backend expõe ao menos GET e POST para uma **segunda entidade** (não precisa ser `/usuarios` — qualquer entidade distinta) |
| 6 | Relacionamento | Backend e/ou frontend vincula as duas entidades (ex: livros de um autor, obras de um artista, moedas de um país) |

---

## Sem Entrega

Nenhum arquivo em `5a-aula/` foi encontrado:

- **dyego-schulz**
- **antonio-marcos-goulart**
- **ariel-oliveira**
- **beatriz-mendonca**
- **carlos-souza**
- **cristian-m-bianco**
- **davi-beckhauser**
- **eric-loli**
- **luis-filipe-bmuller**
- **marcelo-ballmann**
- **matheus-lessa**
- **otavio-eyng**
- **renan-volpato**
- **weslei-silva**
- **yala-pereira**

---

## Apenas uma Entidade (sem segunda entidade ou relacionamento)

Entregaram a pasta, mas o backend tem apenas uma entidade principal sem segunda entidade vinculada:

- **daniel-bagio-monteguti** — CRUD para `/dados` apenas, sem segunda entidade
- **ana-luiza-batista** — CRUD para `/pessoa` apenas (módulos nome.js/idade.js/foto.js são campos da mesma entidade, não entidades distintas)
- **diana-alves** — CRUD para `/paises` apenas, sem segunda entidade
- **jose-felisbino** — `/personagens` + `/planetas`, mas planetas têm apenas GET como filtro, sem CRUD próprio nem relacionamento bidirecional
- **lola-tramontin** — apenas `/campeao`; frontend com um único botão "Buscar"; implementação muito superficial
- **jose-herdt** — CRUD completo de `/usuarios`, mas sem segunda entidade vinculada
- **vinicius-mattei** — CRUD completo de `/usuarios`, mas sem segunda entidade vinculada; frontend exibe apenas a lista de usuários

---

## Endpoints de Usuários Incompletos / Casos Parciais

- **anna-rocha** — `/usuarios` tem apenas GET; sem POST, PUT ou DELETE para usuários (o módulo de carros tem CRUD completo, mas usuários só têm leitura)
- **lara-scremin** — `/users` tem apenas GET e GET por ID; sem POST, PUT ou DELETE para usuários
- **leticia-oliveira** — `/dados/usuario` aceita apenas POST com nome (string, sem ID), e `/dados` tem GET e DELETE; estrutura de usuários muito simplificada
- **lucca-muller** — `/usuarios` tem GET e POST, mas sem PUT ou DELETE; itens têm GET e POST e DELETE, mas sem PUT
- **eduardo-jacob** — `/usuarios` tem GET e GET por usuário, mas o POST responde com `'deveria criar um usuário'` (stub); estrutura parcialmente implementada
- **marcos-bianco** — `/usuarios` tem apenas GET (list e por ID e por produtos); sem POST, PUT ou DELETE para usuários
- **miguel-boeng** — `/usuarios` tem GET e POST e DELETE, mas sem PUT/PATCH

---

## Implementação com Tecnologia Diferente de Node.js/Express

- **vitor-souza-vieira** — utiliza Django (Python) em vez de Node.js/Express; possui CRUD de `/carros` mas sem rotas de usuários; `fetch` usa caminhos relativos (servido pelo próprio Django), portanto é interno

---

## Tabela Completa

| Aluno | Pasta ✅/❌ | index.html ✅/❌ | Backend ✅/❌ | Fetch interno ✅/❌ | Usuários ✅/❌ | Relacionamento ✅/❌ | Data do commit (BRT) | Atraso | Nota |
|---|---|---|---|---|---|---|---|---|---|
| daniel-bagio-monteguti | ✅ | ✅ | ✅ server.js | ✅ script.js | ❌ | ❌ | 25/03 21:28 | Não | — |
| dyego-schulz | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | — | — | 0,0 |
| alehandro-leandro | ✅ | ✅ | ✅ server.js | ✅ usuarios.js | ✅ | ✅ | 27/03 10:36 | Não | 0,5 |
| alerrandro-bp | ✅ | ✅ | ✅ index.js | ✅ index.html | ✅ | ✅ | 25/03 21:06 | Não | 0,5 |
| ana-luiza-batista | ✅ | ✅ | ✅ index.js | ✅ index.html | ❌ | ❌ | 25/03 21:23 | Não | — |
| andre-becker | ✅ | ✅ | ✅ index.js | ✅ index.html | ✅ pessoas/livros | ✅ | 25/03 20:38 | Não | 0,5 |
| anna-rocha | ✅ | ✅ | ✅ index.js | ✅ index.html | ✅ carros/usuarios | ✅ | 25/03 20:30 | Não | 0,5 |
| antonio-marcos-goulart | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | — | — | 0,0 |
| ariel-oliveira | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | — | — | 0,0 |
| arthur-fuchter | ✅ | ✅ | ✅ index.js | ✅ index.html | ✅ | ✅ | 25/03 21:29 | Não | 0,5 |
| beatriz-mendonca | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | — | — | 0,0 |
| carlos-souza | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | — | — | 0,0 |
| caue-castanhel | ✅ | ✅ frontend/ | ✅ backend/server.js | ✅ frontend/index.html | ✅ | ✅ | 28/03 16:20 | Não | 0,5 |
| cristian-m-bianco | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | — | — | 0,0 |
| daniel-arceno | ✅ | ✅ | ✅ index.js | ✅ index.html | ✅ | ✅ | 26/03 22:18 | Não | 0,5 |
| daniel-ascari | ✅ | ✅ | ✅ index.js | ✅ script.js | ✅ | ✅ | 25/03 21:32 | Não | 0,5 |
| davi-beckhauser | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | — | — | 0,0 |
| diana-alves | ✅ | ✅ | ✅ index.js | ✅ script.js | ❌ | ❌ | 25/03 21:20 | Não | — |
| eduardo-jacob | ✅ | ✅ | ✅ index.js | ✅ index.html | ✅ usuarios/carros | ✅ | 25/03 21:23 | Não | 0,5 |
| elisa-alberton | ✅ | ✅ | ✅ index.js | ✅ index.html | ✅ | ✅ | 25/03 21:12 | Não | 0,5 |
| eric-loli | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | — | — | 0,0 |
| gabriel-carlin | ✅ | ✅ | ✅ index.js | ✅ index.html | ✅ artistas/obras | ✅ | 25/03 21:25 | Não | 0,5 |
| gabriel-coelho | ✅ | ✅ | ✅ server.js | ✅ javascript.js | ✅ | ✅ | 25/03 20:32 | Não | 0,5 |
| gustavo-bianco | ✅ | ✅ | ✅ API/index.js | ✅ index.html | ✅ | ✅ emails/usuário | 25/03 21:00 | Não | 0,5 |
| jose-felisbino | ✅ | ✅ | ✅ index.js | ✅ script.js | ❌ | ❌ | 25/03 21:23 | Não | — |
| jose-herdt | ✅ | ✅ | ✅ index.js | ✅ index.html | ✅ | ❌ | 25/03 20:42 | Não | — |
| kaua-oenning | ✅ | ✅ | ✅ index.js | ✅ index.html | ✅ paises/moedas | ✅ | 25/03 20:17 | Não | 0,5 |
| lara-scremin | ✅ | ✅ | ✅ index.js | ✅ index.html | ✅ countries/users | ✅ | 25/03 20:21 | Não | 0,5 |
| leticia-oliveira | ✅ | ✅ | ✅ server.js | ✅ script.js | ⚠️ parcial | ✅ | 25/03 20:46 | Não | — |
| lola-tramontin | ✅ | ✅ | ✅ tmp-api/index.js | ✅ index.html | ❌ | ❌ | 25/03 21:43 | Não | — |
| lucca-muller | ✅ | ✅ | ✅ server.js | ✅ index.html | ✅ usuarios/itens | ✅ | 25/03 20:07 | Não | 0,5 |
| luis-filipe-bmuller | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | — | — | 0,0 |
| luis-henrique | ✅ | ✅ | ✅ index.js | ✅ index.html | ✅ usuarios/pets | ✅ | 26/03 20:11 | Não | 0,5 |
| luiz-honorato | ✅ | ✅ | ✅ index.js | ✅ index.html | ❌ | ✅ jogadores/nacional. | 30/03 19:10 | 1 dia | — |
| marcelo-ballmann | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | — | — | 0,0 |
| marcos-bianco | ✅ | ✅ | ✅ index.js | ✅ index.html | ✅ usuarios/produtos | ✅ | 29/03 23:25 | Não | 0,5 |
| matheus-lessa | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | — | — | 0,0 |
| miguel-boeng | ✅ | ✅ | ✅ node.js | ✅ index.html | ✅ usuarios/carros | ✅ | 29/03 22:36 | Não | 0,5 |
| otavio-eyng | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | — | — | 0,0 |
| renan-volpato | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | — | — | 0,0 |
| rian-machado | ✅ | ✅ | ✅ index.js | ✅ script.js | ✅ CRUD | ✅ filmes/usuário | 28/03 16:55 | Não | 0,5 |
| vinicius-mattei | ✅ | ✅ | ✅ index.js | ✅ script.js | ✅ CRUD | ❌ | 25/03 21:12 | Não | — |
| vinicius-mendes-tomaz | ✅ | ✅ | ✅ index.js | ✅ script.js | ✅ CRUD | ✅ | 25/03 21:01 | Não | 0,5 |
| vitor-souza-vieira | ✅ | ✅ core/templates/ | ✅ Django/Python | ✅ relativo | ❌ | ❌ | 27/03 17:08 | Não | — |
| welquer-esser | ✅ | ✅ | ✅ index.js | ✅ index.html | ✅ GET+POST | ✅ | 25/03 18:22 | Não | — (prof.) |
| weslei-silva | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | — | — | 0,0 |
| yala-pereira | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | — | — | 0,0 |
| yuri-raldi | ✅ | ✅ | ✅ server.js | ✅ index.html | ✅ CRUD | ✅ musicas/usuário | 25/03 21:27 | Não | 0,5 |

---

## Casos que Requerem Atenção

### 1. daniel-bagio-monteguti
Backend com CRUD completo (GET, POST, PUT, DELETE) para a entidade `/dados`, mas sem qualquer rota de usuários. O frontend (script.js) faz fetch para localhost. Não atende o requisito de endpoints de usuários nem de relacionamento. **Decisão necessária:** 0,0 ou nota parcial por ter entregado CRUD funcional sem a parte de usuários.

### 2. ana-luiza-batista
Implementou CRUD para `/pessoa` com módulos separados (nome.js, idade.js, foto.js), bom nível de organização. A entidade "pessoa" serve como a entidade principal, mas não há separação de "usuários" como entidade distinta nem entidade secundária. **Decisão necessária:** aceitar como suficiente ou exigir endpoint separado de usuários com relacionamento.

### 3. andre-becker ✅ → 0,5
Backend com CRUD completo de `/pessoas` e `/livros` com relacionamento (`pessoaId`). Duas entidades distintas com vínculo implementado. O `GET /` faz proxy de `randomuser.me` no backend para popular a lista inicial, mas o frontend faz fetch apenas para localhost. Atende o critério de duas entidades + relacionamento. **Nota: 0,5**

### 4. anna-rocha ✅ → 0,5
CRUD completo de `/carros` + `/usuarios` (GET) com relacionamento via `?usuario=X`. Duas entidades distintas com vínculo implementado. **Nota: 0,5**

### 5. eduardo-jacob ✅ → 0,5
`/usuarios` (GET + GET por usuário) e `/carros` (CRUD completo) com relacionamento. O POST de usuários é um stub, mas a relação funciona corretamente no frontend. Duas entidades distintas com vínculo implementado. **Nota: 0,5**

### 7. gabriel-carlin ✅ → 0,5
Backend com `/artistas` (CRUD: GET, POST, PUT, DELETE) e `/obras` (CRUD) com relacionamento (`artistaID`). Duas entidades distintas com vínculo implementado. O papel de "segunda entidade" é cumprido pelos artistas em relação às obras. Atende o critério. **Nota: 0,5**

### 8. jose-felisbino
Backend com CRUD de `/personagens` e módulo `/planetas` (apenas GET de personagens por planeta). Nenhuma rota de usuários. Frontend filtra personagens por planeta mas não exibe dados por usuário. **Decisão necessária:** 0,0 por ausência de usuários, ou nota parcial pelo CRUD de entidade principal.

### 8. jose-herdt
CRUD completo de `/usuarios` (GET, POST, PUT, DELETE) com filtro por nacionalidade. Porém não há entidade secundária vinculada — o exercício pede que usuários sejam associados a itens (ex: carros), o que não foi implementado. **Decisão necessária:** nota parcial (tem usuários, mas sem relacionamento) ou exigir a segunda entidade.

### 10. kaua-oenning ✅ → 0,5
Backend com CRUD de `/paises` e `/moedas` com relacionamento (`paisId`). Duas entidades distintas com vínculo implementado. Atende o critério. **Nota: 0,5**

### 11. lara-scremin ✅ → 0,5
Backend com `/countries` (CRUD) e `/users` (GET e GET por ID). Frontend exibe países filtrados por usuário selecionado. Duas entidades distintas com relacionamento implementado. **Nota: 0,5**

### 11. leticia-oliveira
Backend com `/dados` (GET retorna IP + lista de usuários) e `/dados/usuario` (POST que adiciona nome à lista) e `/dados` DELETE. Implementação peculiar: usuários são apenas uma lista de strings sem ID, sem GET individual, PUT ou DELETE. Frontend exibe a lista de usuários retornada dentro do objeto de dados. O relacionamento é implícito (usuários fazem parte da resposta da entidade principal). **Decisão necessária:** aceitar como criativo porém válido, ou exigir estrutura mais convencional de usuários com CRUD completo.

### 12. lola-tramontin
Backend com CRUD de `/campeao` (personagens de LoL) sem nenhuma rota de usuários. Frontend com apenas um botão "Buscar" que exibe o nome do primeiro campeão. O código no `index.html` é quase idêntico ao exemplo da aula (inclusive com os comentários didáticos do professor). Implementação muito superficial. **Decisão necessária:** 0,0 por não atender os requisitos, ou nota mínima por ter entregado algo funcional.

### 13. lucca-muller ✅ → 0,5
`/usuarios` (GET+POST) e `/itens` (GET+POST+DELETE) com relacionamento. Frontend exibe usuários e itens vinculados. Duas entidades distintas com vínculo implementado. **Nota: 0,5**

### 14. luis-henrique ✅ → 0,5
`/usuarios` (GET+POST+DELETE) e `/pets` (CRUD) com relacionamento por `codigoUsuario`. Frontend exibe usuários e filtra pets. Duas entidades distintas com vínculo implementado. **Nota: 0,5**

### 15. luiz-honorato
Backend com CRUD de jogadores (`GET`, `GET/:id`, `POST`, `PUT`, `DELETE`) e módulo `/nacionalidade/:pais` para filtrar por país. Não há rota de `/usuarios` — jogadores é a entidade principal. Commit em 30/03 às 19:10 BRT = **1 dia de atraso** (−0,1). **Decisão necessária:** avaliar ausência de usuários + calcular nota com desconto.

### 16. marcos-bianco ✅ → 0,5
`/usuarios` (GET) e `/produtos` (GET+POST) com relacionamento. Frontend exibe produtos vinculados a usuários. Duas entidades distintas com vínculo implementado. Dentro do prazo (29/03 23:25). **Nota: 0,5**

### 17. miguel-boeng ✅ → 0,5
`/usuarios` (GET+POST+DELETE) e `/carros` (GET+POST+DELETE) com relacionamento. Frontend exibe usuários e carros vinculados. Duas entidades distintas com vínculo implementado. **Nota: 0,5**

### 18. vinicius-mattei
Backend com CRUD completo de `/usuarios` (GET, GET por id, POST, PUT, DELETE). Não há entidade secundária vinculada. Frontend exibe e manipula usuários, mas não exibe itens/carros associados. **Decisão necessária:** aceitar somente CRUD de usuários como suficiente, ou exigir a segunda entidade com relacionamento.

### 19. vitor-souza-vieira
Utiliza Django (Python) em vez de Node.js/Express. Tem CRUD de `/carros` mas sem usuários. O fetch é por caminhos relativos, o que é tecnicamente interno. **Decisão necessária:** aceitar tecnologia diferente (penaliza apenas por ausência de usuários), ou considerar que o requisito era Node.js/Express especificamente.

### 20. welquer-esser
É o próprio professor. Implementação de referência com `/usuarios` (GET, GET por usuário/carros, POST stub) e `/carros` (CRUD) com relacionamento. Registrado aqui apenas para completude. **Não entra na avaliação.**

---

## Resumo

| Situação | Quantidade |
|---|---|
| Sem entrega (pasta `5a-aula` ausente) | 15 |
| Entrega completa e no prazo (0,5 pts) | 22 |
| Entrega com atraso (luiz-honorato, −0,1) | 1 |
| Casos que requerem decisão do professor | 9 |
| Professor (welquer-esser, não avaliado) | 1 |
| **Total de branches** | **48** |

### Entregas com nota 0,5 confirmada

alehandro-leandro, alerrandro-bp, andre-becker, anna-rocha, arthur-fuchter, caue-castanhel, daniel-arceno, daniel-ascari, eduardo-jacob, elisa-alberton, gabriel-carlin, gabriel-coelho, gustavo-bianco, kaua-oenning, lara-scremin, lucca-muller, luis-henrique, marcos-bianco, miguel-boeng, rian-machado, vinicius-mendes-tomaz, yuri-raldi

*(22 alunos — critério: duas entidades com relacionamento, independente de serem "usuários")*
