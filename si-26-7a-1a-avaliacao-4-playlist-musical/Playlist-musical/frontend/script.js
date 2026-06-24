const API = "";
const GRAPHQL_API = "/graphql";

async function remoteLog(msg) {
    try {
        await fetch(`${API}/log`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ msg })
        });
    } catch(e) {
        console.error("Falha ao enviar log remoto:", e);
    }
}

let editandoArtistaId = null;
let editandoAlbumId = null;
let editandoMusicaId = null;
let editandoPlaylistId = null;

async function gqlQuery(query, variables = {}) {
    const token = sessionStorage.getItem('playlist-token');
    const response = await fetch(GRAPHQL_API, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "x-access-token": token || ""
        },
        credentials: "include",
        body: JSON.stringify({ query, variables })
    });
    
    if (response.status === 401 || response.status === 403) {
        mostrarLogin();
        throw new Error("Não autorizado");
    }
    
    return await response.json();
}

async function fazerLogin() {
    const usuario = document.getElementById('loginUsuario').value;
    const senha = document.getElementById('loginSenha').value;

    console.log("Tentando logar com:", usuario);

    const response = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ usuario, senha })
    });

    const resJson = await response.json();

    if (response.ok && resJson.token) {
        console.log("deu bom o login!");
        sessionStorage.setItem('playlist-token', resJson.token);
        sessionStorage.setItem('playlist-refreshToken', resJson.refreshToken);
        mostrarApp();
        carregarTudo();
    } else {
        alert(resJson.erro || "Eita, login falhou. Confere a senha aí.");
    }
}

async function logout() {
    console.log("saindo...");
    const refreshToken = sessionStorage.getItem('playlist-refreshToken');
    await fetch(`${API}/logout`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: refreshToken }),
        credentials: 'include'
    });
    sessionStorage.removeItem('playlist-token');
    sessionStorage.removeItem('playlist-refreshToken');
    mostrarLogin();
}

function mostrarLogin() {
    document.getElementById('loginSection').classList.remove('hidden');
    document.getElementById('appContent').classList.add('hidden');
    document.getElementById('btnLogout').classList.add('hidden');
}

function mostrarApp() {
    document.getElementById('loginSection').classList.add('hidden');
    document.getElementById('appContent').classList.remove('hidden');
    document.getElementById('btnLogout').classList.remove('hidden');
}

async function carregarTudo() {
    await carregarArtistas();
    await carregarAlbuns();
    await carregarMusicas();
    await carregarPlaylists();
}

window.onload = async function () {
    document.getElementById('btnEntrar').addEventListener('click', fazerLogin);
    document.getElementById('btnLogout').addEventListener('click', logout);
    document.getElementById('btnSalvarArtista').addEventListener('click', cadastrarArtista);
    document.getElementById('btnSalvarAlbum').addEventListener('click', cadastrarAlbum);
    document.getElementById('btnSalvarMusica').addEventListener('click', cadastrarMusica);
    document.getElementById('btnSalvarPlaylist').addEventListener('click', cadastrarPlaylist);

    document.getElementById('listaArtistas').addEventListener('click', async (e) => {
        const target = e.target;
        await remoteLog("Clique na lista de Artistas: tag=" + target.tagName + ", class=" + target.className + ", id=" + target.getAttribute('data-id'));
        if (target.classList.contains('btn-excluir')) {
            const id = target.getAttribute('data-id');
            try {
                await remoteLog("Chamando mutation deletarArtista para ID=" + id);
                const res = await gqlQuery(`mutation($id: ID!) { deletarArtista(id: $id) }`, { id });
                await remoteLog("Resposta da mutation deletarArtista: " + JSON.stringify(res));
                await carregarTudo();
            } catch (err) {
                await remoteLog("Erro ao deletar artista: " + err.message);
            }
        } else if (target.classList.contains('btn-editar')) {
            const id = target.getAttribute('data-id');
            const nome = target.getAttribute('data-nome');
            const genero = target.getAttribute('data-genero');

            document.getElementById('nomeArtista').value = nome;
            document.getElementById('generoArtista').value = genero;
            editandoArtistaId = id;
            document.getElementById('btnSalvarArtista').innerText = "Atualizar Artista";
        }
    });

    document.getElementById('listaAlbuns').addEventListener('click', async (e) => {
        const target = e.target;
        await remoteLog("Clique na lista de Álbuns: tag=" + target.tagName + ", class=" + target.className + ", id=" + target.getAttribute('data-id'));
        if (target.classList.contains('btn-excluir')) {
            const id = target.getAttribute('data-id');
            try {
                await remoteLog("Chamando mutation deletarAlbum para ID=" + id);
                const res = await gqlQuery(`mutation($id: ID!) { deletarAlbum(id: $id) }`, { id });
                await remoteLog("Resposta da mutation deletarAlbum: " + JSON.stringify(res));
                await carregarTudo();
            } catch (err) {
                await remoteLog("Erro ao deletar álbum: " + err.message);
            }
        } else if (target.classList.contains('btn-editar')) {
            const id = target.getAttribute('data-id');
            const titulo = target.getAttribute('data-titulo');
            const ano = target.getAttribute('data-ano');
            const idArtista = target.getAttribute('data-idartista');

            document.getElementById('tituloAlbum').value = titulo;
            document.getElementById('anoAlbum').value = ano;
            document.getElementById('idArtistaAlbum').value = idArtista;
            editandoAlbumId = id;
            document.getElementById('btnSalvarAlbum').innerText = "Atualizar Álbum";
        }
    });

    document.getElementById('listaMusicas').addEventListener('click', async (e) => {
        const target = e.target;
        await remoteLog("Clique na lista de Músicas: tag=" + target.tagName + ", class=" + target.className + ", id=" + target.getAttribute('data-id'));
        if (target.classList.contains('btn-excluir')) {
            const id = target.getAttribute('data-id');
            try {
                await remoteLog("Chamando mutation deletarMusica para ID=" + id);
                const res = await gqlQuery(`mutation($id: ID!) { deletarMusica(id: $id) }`, { id });
                await remoteLog("Resposta da mutation deletarMusica: " + JSON.stringify(res));
                await carregarTudo();
            } catch (err) {
                await remoteLog("Erro ao deletar música: " + err.message);
            }
        } else if (target.classList.contains('btn-editar')) {
            const id = target.getAttribute('data-id');
            const titulo = target.getAttribute('data-titulo');
            const duracao = target.getAttribute('data-duracao');
            const idArtista = target.getAttribute('data-idartista');
            const idAlbum = target.getAttribute('data-idalbum');

            document.getElementById('tituloMusica').value = titulo;
            document.getElementById('duracaoMusica').value = duracao;
            document.getElementById('idArtistaMusica').value = idArtista;
            document.getElementById('idAlbumMusica').value = idAlbum;
            editandoMusicaId = id;
            document.getElementById('btnSalvarMusica').innerText = "Atualizar Música";
        }
    });

    document.getElementById('listaPlaylists').addEventListener('click', async (e) => {
        const target = e.target;
        await remoteLog("Clique na lista de Playlists: tag=" + target.tagName + ", class=" + target.className + ", id=" + target.getAttribute('data-id'));
        if (target.classList.contains('btn-excluir')) {
            const id = target.getAttribute('data-id');
            try {
                await remoteLog("Chamando mutation deletarPlaylist para ID=" + id);
                const res = await gqlQuery(`mutation($id: ID!) { deletarPlaylist(id: $id) }`, { id });
                await remoteLog("Resposta da mutation deletarPlaylist: " + JSON.stringify(res));
                await carregarPlaylists();
            } catch (err) {
                await remoteLog("Erro ao deletar playlist: " + err.message);
            }
        } else if (target.classList.contains('btn-editar')) {
            const id = target.getAttribute('data-id');
            const nome = target.getAttribute('data-nome');
            const descricao = target.getAttribute('data-descricao');
            const musicasIds = (target.getAttribute('data-musicas') || "").split(",").filter(Boolean);

            document.getElementById('nomePlaylist').value = nome;
            document.getElementById('descricaoPlaylist').value = descricao;
            
            const checkboxes = document.querySelectorAll('#checkboxMusicas input[type="checkbox"]');
            checkboxes.forEach(cb => {
                cb.checked = musicasIds.includes(cb.value);
            });

            editandoPlaylistId = id;
            document.getElementById('btnSalvarPlaylist').innerText = "Atualizar Playlist";
        }
    });

    try {
        await carregarTudo();
        mostrarApp();
    } catch (e) {
        mostrarLogin();
    }
};

function renderizarArtistas(artistas) {
    const lista = document.getElementById("listaArtistas");
    lista.innerHTML = "";
    artistas.forEach((artista) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>ID:</strong> ${artista.id} <br>
            <strong>Nome:</strong> ${artista.nome} <br>
            <strong>Gênero:</strong> ${artista.generoMusical}
            <div class="item-acoes">
                <button class="btn-acao btn-editar" data-id="${artista.id}" data-nome="${artista.nome}" data-genero="${artista.generoMusical}">Editar</button>
                <button class="btn-acao btn-excluir" data-id="${artista.id}">Excluir</button>
            </div>
        `;
        lista.appendChild(li);
    });
}

function renderizarAlbuns(albuns) {
    const lista = document.getElementById("listaAlbuns");
    lista.innerHTML = "";
    albuns.forEach((album) => {
        const li = document.createElement("li");
        const nomeArtista = album.artista ? album.artista.nome : 'ID: ' + album.idArtista;
        li.innerHTML = `
            <strong>ID:</strong> ${album.id} <br>
            <strong>Título:</strong> ${album.titulo} <br>
            <strong>Ano:</strong> ${album.ano} <br>
            <strong>Artista:</strong> ${nomeArtista}
            <div class="item-acoes">
                <button class="btn-acao btn-editar" data-id="${album.id}" data-titulo="${album.titulo}" data-ano="${album.ano}" data-idartista="${album.idArtista}">Editar</button>
                <button class="btn-acao btn-excluir" data-id="${album.id}">Excluir</button>
            </div>
        `;
        lista.appendChild(li);
    });
}

function renderizarMusicas(musicas) {
    const lista = document.getElementById("listaMusicas");
    lista.innerHTML = "";
    const checkboxMusicas = document.getElementById("checkboxMusicas");
    checkboxMusicas.innerHTML = "";

    musicas.forEach((musica) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>ID:</strong> ${musica.id} <br>
            <strong>Título:</strong> ${musica.titulo} <br>
            <strong>Duração:</strong> ${musica.duracao} <br>
            <strong>Artista ID:</strong> ${musica.idArtista} | <strong>Álbum ID:</strong> ${musica.idAlbum}
            <div class="item-acoes">
                <button class="btn-acao btn-editar" data-id="${musica.id}" data-titulo="${musica.titulo}" data-duracao="${musica.duracao}" data-idartista="${musica.idArtista}" data-idalbum="${musica.idAlbum}">Editar</button>
                <button class="btn-acao btn-excluir" data-id="${musica.id}">Excluir</button>
            </div>
        `;
        lista.appendChild(li);

        const div = document.createElement("div");
        div.className = "checkbox-item";
        div.innerHTML = `<input type="checkbox" value="${musica.id}" id="musica-${musica.id}"><label for="musica-${musica.id}">${musica.titulo}</label>`;
        checkboxMusicas.appendChild(div);
    });
}

function renderizarPlaylists(playlists) {
    const lista = document.getElementById("listaPlaylists");
    lista.innerHTML = "";
    playlists.forEach((playlist) => {
        const nomesMusicas = (playlist.musicas || []).map((m) => m.titulo).join(", ");
        const idsMusicas = (playlist.musicas || []).map((m) => m.id).join(",");
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>ID:</strong> ${playlist.id} <br>
            <strong>Nome:</strong> ${playlist.nome} <br>
            <strong>Descrição:</strong> ${playlist.descricao} <br>
            <strong>Músicas:</strong> ${nomesMusicas || "Nenhuma"}
            <div class="item-acoes">
                <button class="btn-acao btn-editar" data-id="${playlist.id}" data-nome="${playlist.nome}" data-descricao="${playlist.descricao}" data-musicas="${idsMusicas}">Editar</button>
                <button class="btn-acao btn-excluir" data-id="${playlist.id}">Excluir</button>
            </div>
        `;
        lista.appendChild(li);
    });
}

async function carregarArtistas() {
    const data = await gqlQuery(`{ artistas { id nome generoMusical } }`);
    if(data.data) renderizarArtistas(data.data.artistas);
}

async function cadastrarArtista() {
    const nome = document.getElementById("nomeArtista").value.trim();
    const generoMusical = document.getElementById("generoArtista").value.trim();
    if (!nome || !generoMusical) return alert("Preencha todos os campos");

    if (editandoArtistaId) {
        await gqlQuery(`mutation($id: ID!, $nome: String!, $genero: String!) { atualizarArtista(id: $id, nome: $nome, generoMusical: $genero) { id } }`, { id: editandoArtistaId, nome, genero: generoMusical });
        editandoArtistaId = null;
        document.getElementById('btnSalvarArtista').innerText = "Salvar Artista";
    } else {
        await gqlQuery(`mutation($nome: String!, $genero: String!) { criarArtista(nome: $nome, generoMusical: $genero) { id } }`, { nome, genero: generoMusical });
    }
    
    await carregarTudo();
    
    document.getElementById("nomeArtista").value = "";
    document.getElementById("generoArtista").value = "";
}

async function carregarAlbuns() {
    const data = await gqlQuery(`{ albuns { id titulo ano idArtista artista { nome } } }`);
    if(data.data) renderizarAlbuns(data.data.albuns);
}

async function cadastrarAlbum() {
    const titulo = document.getElementById("tituloAlbum").value.trim();
    const ano = parseInt(document.getElementById("anoAlbum").value.trim());
    const idArtista = document.getElementById("idArtistaAlbum").value.trim();
    if (!titulo || !ano || !idArtista) return alert("Preencha todos os campos");

    if (editandoAlbumId) {
        await gqlQuery(`mutation($id: ID!, $titulo: String!, $ano: Int!, $idA: ID!) { atualizarAlbum(id: $id, titulo: $titulo, ano: $ano, idArtista: $idA) { id } }`, { id: editandoAlbumId, titulo, ano, idA: idArtista });
        editandoAlbumId = null;
        document.getElementById('btnSalvarAlbum').innerText = "Salvar Álbum";
    } else {
        await gqlQuery(`mutation($titulo: String!, $ano: Int!, $idA: ID!) { criarAlbum(titulo: $titulo, ano: $ano, idArtista: $idA) { id } }`, { titulo, ano, idA: idArtista });
    }
    
    await carregarTudo();

    document.getElementById("tituloAlbum").value = "";
    document.getElementById("anoAlbum").value = "";
    document.getElementById("idArtistaAlbum").value = "";
}

async function carregarMusicas() {
    const data = await gqlQuery(`{ musicas { id titulo duracao idArtista idAlbum } }`);
    if(data.data) renderizarMusicas(data.data.musicas);
}

async function cadastrarMusica() {
    const titulo = document.getElementById("tituloMusica").value.trim();
    const duracao = document.getElementById("duracaoMusica").value.trim();
    const idArtista = document.getElementById("idArtistaMusica").value.trim();
    const idAlbum = document.getElementById("idAlbumMusica").value.trim();
    if (!titulo || !duracao || !idArtista || !idAlbum) return alert("Preencha todos os campos");

    if (editandoMusicaId) {
        await gqlQuery(`mutation($id: ID!, $t: String!, $d: String!, $ida: ID!, $idal: ID!) { atualizarMusica(id: $id, titulo: $t, duracao: $d, idArtista: $ida, idAlbum: $idal) { id } }`, { id: editandoMusicaId, t: titulo, d: duracao, ida: idArtista, idal: idAlbum });
        editandoMusicaId = null;
        document.getElementById('btnSalvarMusica').innerText = "Salvar Música";
    } else {
        await gqlQuery(`mutation($t: String!, $d: String!, $ida: ID!, $idal: ID!) { criarMusica(titulo: $t, duracao: $d, idArtista: $ida, idAlbum: $idal) { id } }`, { t: titulo, d: duracao, ida: idArtista, idal: idAlbum });
    }

    await carregarTudo();

    document.getElementById("tituloMusica").value = "";
    document.getElementById("duracaoMusica").value = "";
    document.getElementById("idArtistaMusica").value = "";
    document.getElementById("idAlbumMusica").value = "";
}

async function carregarPlaylists() {
    const data = await gqlQuery(`{ playlists { id nome descricao musicas { id titulo } } }`);
    if(data.data) renderizarPlaylists(data.data.playlists);
}

async function cadastrarPlaylist() {
    const nome = document.getElementById("nomePlaylist").value.trim();
    const descricao = document.getElementById("descricaoPlaylist").value.trim();
    const checkboxes = document.querySelectorAll('#checkboxMusicas input[type="checkbox"]:checked');
    const musicasIds = Array.from(checkboxes).map((cb) => cb.value);

    if (!nome || !descricao) return alert("Preencha os campos");

    if (editandoPlaylistId) {
        await gqlQuery(`mutation($id: ID!, $n: String!, $d: String!, $m: [ID!]) { atualizarPlaylist(id: $id, nome: $n, descricao: $d, musicas: $m) { id } }`, { id: editandoPlaylistId, n: nome, d: descricao, m: musicasIds });
        editandoPlaylistId = null;
        document.getElementById('btnSalvarPlaylist').innerText = "Salvar Playlist";
    } else {
        await gqlQuery(`mutation($n: String!, $d: String!, $m: [ID!]) { criarPlaylist(nome: $n, descricao: $d, musicas: $m) { id } }`, { n: nome, d: descricao, m: musicasIds });
    }
    
    await carregarPlaylists();

    document.getElementById("nomePlaylist").value = "";
    document.getElementById("descricaoPlaylist").value = "";
    checkboxes.forEach((cb) => cb.checked = false);
}
