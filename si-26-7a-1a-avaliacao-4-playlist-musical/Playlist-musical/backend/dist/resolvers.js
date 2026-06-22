"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const db_1 = __importDefault(require("./db"));
exports.resolvers = {
    Query: {
        artistas: () => db_1.default.prepare('SELECT * FROM artistas').all(),
        artista: (_, { id }) => db_1.default.prepare('SELECT * FROM artistas WHERE id = ?').get(id),
        albuns: () => db_1.default.prepare('SELECT * FROM albuns').all(),
        album: (_, { id }) => db_1.default.prepare('SELECT * FROM albuns WHERE id = ?').get(id),
        musicas: () => db_1.default.prepare('SELECT * FROM musicas').all(),
        musica: (_, { id }) => db_1.default.prepare('SELECT * FROM musicas WHERE id = ?').get(id),
        playlists: () => {
            const playlists = db_1.default.prepare('SELECT * FROM playlists').all();
            return playlists.map(p => ({
                ...p,
                musicas: db_1.default.prepare(`
          SELECT m.* FROM musicas m
          JOIN playlist_musicas pm ON m.id = pm.musica_id
          WHERE pm.playlist_id = ?
        `).all(p.id)
            }));
        },
        playlist: (_, { id }) => {
            const p = db_1.default.prepare('SELECT * FROM playlists WHERE id = ?').get(id);
            if (!p)
                return null;
            p.musicas = db_1.default.prepare(`
        SELECT m.* FROM musicas m
        JOIN playlist_musicas pm ON m.id = pm.musica_id
        WHERE pm.playlist_id = ?
      `).all(p.id);
            return p;
        },
    },
    Mutation: {
        criarArtista: (_, { nome, generoMusical }) => {
            const info = db_1.default.prepare('INSERT INTO artistas (nome, generoMusical) VALUES (?, ?)').run(nome, generoMusical);
            return db_1.default.prepare('SELECT * FROM artistas WHERE id = ?').get(info.lastInsertRowid);
        },
        atualizarArtista: (_, { id, nome, generoMusical }) => {
            db_1.default.prepare('UPDATE artistas SET nome = ?, generoMusical = ? WHERE id = ?').run(nome, generoMusical, id);
            return db_1.default.prepare('SELECT * FROM artistas WHERE id = ?').get(id);
        },
        deletarArtista: (_, { id }) => {
            console.log(`[BACKEND] Tentando deletar Artista ID: ${id}`);
            try {
                const info = db_1.default.prepare('DELETE FROM artistas WHERE id = ?').run(id);
                console.log(`[BACKEND] Artista ID ${id} deletado. Linhas afetadas: ${info.changes}`);
                return "Artista deletado com sucesso";
            }
            catch (err) {
                console.error(`[BACKEND] Erro ao deletar Artista ID ${id}:`, err);
                throw err;
            }
        },
        criarAlbum: (_, { titulo, ano, idArtista }) => {
            const info = db_1.default.prepare('INSERT INTO albuns (titulo, ano, idArtista) VALUES (?, ?, ?)').run(titulo, ano, idArtista);
            return db_1.default.prepare('SELECT * FROM albuns WHERE id = ?').get(info.lastInsertRowid);
        },
        atualizarAlbum: (_, { id, titulo, ano, idArtista }) => {
            db_1.default.prepare('UPDATE albuns SET titulo = ?, ano = ?, idArtista = ? WHERE id = ?').run(titulo, ano, idArtista, id);
            return db_1.default.prepare('SELECT * FROM albuns WHERE id = ?').get(id);
        },
        deletarAlbum: (_, { id }) => {
            console.log(`[BACKEND] Tentando deletar Álbum ID: ${id}`);
            try {
                const info = db_1.default.prepare('DELETE FROM albuns WHERE id = ?').run(id);
                console.log(`[BACKEND] Álbum ID ${id} deletado. Linhas afetadas: ${info.changes}`);
                return "Álbum deletado com sucesso";
            }
            catch (err) {
                console.error(`[BACKEND] Erro ao deletar Álbum ID ${id}:`, err);
                throw err;
            }
        },
        criarMusica: (_, { titulo, duracao, idArtista, idAlbum }) => {
            const info = db_1.default.prepare('INSERT INTO musicas (titulo, duracao, idArtista, idAlbum) VALUES (?, ?, ?, ?)').run(titulo, duracao, idArtista, idAlbum);
            return db_1.default.prepare('SELECT * FROM musicas WHERE id = ?').get(info.lastInsertRowid);
        },
        atualizarMusica: (_, { id, titulo, duracao, idArtista, idAlbum }) => {
            db_1.default.prepare('UPDATE musicas SET titulo = ?, duracao = ?, idArtista = ?, idAlbum = ? WHERE id = ?').run(titulo, duracao, idArtista, idAlbum, id);
            return db_1.default.prepare('SELECT * FROM musicas WHERE id = ?').get(id);
        },
        deletarMusica: (_, { id }) => {
            console.log(`[BACKEND] Tentando deletar Música ID: ${id}`);
            try {
                const info = db_1.default.prepare('DELETE FROM musicas WHERE id = ?').run(id);
                console.log(`[BACKEND] Música ID ${id} deletado. Linhas afetadas: ${info.changes}`);
                return "Música deletada com sucesso";
            }
            catch (err) {
                console.error(`[BACKEND] Erro ao deletar Música ID ${id}:`, err);
                throw err;
            }
        },
        criarPlaylist: (_, { nome, descricao, musicas }) => {
            const info = db_1.default.prepare('INSERT INTO playlists (nome, descricao) VALUES (?, ?)').run(nome, descricao);
            const playlistId = info.lastInsertRowid;
            if (musicas && musicas.length > 0) {
                const insertStmt = db_1.default.prepare('INSERT INTO playlist_musicas (playlist_id, musica_id) VALUES (?, ?)');
                musicas.forEach((mId) => {
                    insertStmt.run(playlistId, mId);
                });
            }
            return exports.resolvers.Query.playlist(null, { id: playlistId.toString() });
        },
        atualizarPlaylist: (_, { id, nome, descricao, musicas }) => {
            db_1.default.prepare('UPDATE playlists SET nome = ?, descricao = ? WHERE id = ?').run(nome, descricao, id);
            if (musicas) {
                db_1.default.prepare('DELETE FROM playlist_musicas WHERE playlist_id = ?').run(id);
                const insertStmt = db_1.default.prepare('INSERT INTO playlist_musicas (playlist_id, musica_id) VALUES (?, ?)');
                musicas.forEach((mId) => {
                    insertStmt.run(id, mId);
                });
            }
            return exports.resolvers.Query.playlist(null, { id });
        },
        deletarPlaylist: (_, { id }) => {
            console.log(`[BACKEND] Tentando deletar Playlist ID: ${id}`);
            try {
                const info = db_1.default.prepare('DELETE FROM playlists WHERE id = ?').run(id);
                console.log(`[BACKEND] Playlist ID ${id} deletada. Linhas afetadas: ${info.changes}`);
                return "Playlist deletada com sucesso";
            }
            catch (err) {
                console.error(`[BACKEND] Erro ao deletar Playlist ID ${id}:`, err);
                throw err;
            }
        }
    },
    Album: {
        artista: (album) => db_1.default.prepare('SELECT * FROM artistas WHERE id = ?').get(album.idArtista)
    },
    Musica: {
        artista: (musica) => db_1.default.prepare('SELECT * FROM artistas WHERE id = ?').get(musica.idArtista),
        album: (musica) => db_1.default.prepare('SELECT * FROM albuns WHERE id = ?').get(musica.idAlbum)
    }
};
