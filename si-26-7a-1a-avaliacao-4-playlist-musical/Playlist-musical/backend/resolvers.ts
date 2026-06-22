import db from './db';

export const resolvers = {
  Query: {
    artistas: () => db.prepare('SELECT * FROM artistas').all(),
    artista: (_: any, { id }: { id: string }) => db.prepare('SELECT * FROM artistas WHERE id = ?').get(id),
    
    albuns: () => db.prepare('SELECT * FROM albuns').all(),
    album: (_: any, { id }: { id: string }) => db.prepare('SELECT * FROM albuns WHERE id = ?').get(id),
    
    musicas: () => db.prepare('SELECT * FROM musicas').all(),
    musica: (_: any, { id }: { id: string }) => db.prepare('SELECT * FROM musicas WHERE id = ?').get(id),
    
    playlists: () => {
      const playlists = db.prepare('SELECT * FROM playlists').all() as any[];
      return playlists.map(p => ({
        ...p,
        musicas: db.prepare(`
          SELECT m.* FROM musicas m
          JOIN playlist_musicas pm ON m.id = pm.musica_id
          WHERE pm.playlist_id = ?
        `).all(p.id)
      }));
    },
    playlist: (_: any, { id }: { id: string }) => {
      const p = db.prepare('SELECT * FROM playlists WHERE id = ?').get(id) as any;
      if (!p) return null;
      p.musicas = db.prepare(`
        SELECT m.* FROM musicas m
        JOIN playlist_musicas pm ON m.id = pm.musica_id
        WHERE pm.playlist_id = ?
      `).all(p.id);
      return p;
    },
  },
  Mutation: {
    criarArtista: (_: any, { nome, generoMusical }: any) => {
      const info = db.prepare('INSERT INTO artistas (nome, generoMusical) VALUES (?, ?)').run(nome, generoMusical);
      return db.prepare('SELECT * FROM artistas WHERE id = ?').get(info.lastInsertRowid);
    },
    atualizarArtista: (_: any, { id, nome, generoMusical }: any) => {
      db.prepare('UPDATE artistas SET nome = ?, generoMusical = ? WHERE id = ?').run(nome, generoMusical, id);
      return db.prepare('SELECT * FROM artistas WHERE id = ?').get(id);
    },
    deletarArtista: (_: any, { id }: { id: string }) => {
      console.log(`[BACKEND] Tentando deletar Artista ID: ${id}`);
      try {
        const info = db.prepare('DELETE FROM artistas WHERE id = ?').run(id);
        console.log(`[BACKEND] Artista ID ${id} deletado. Linhas afetadas: ${info.changes}`);
        return "Artista deletado com sucesso";
      } catch (err: any) {
        console.error(`[BACKEND] Erro ao deletar Artista ID ${id}:`, err);
        throw err;
      }
    },

    criarAlbum: (_: any, { titulo, ano, idArtista }: any) => {
      const info = db.prepare('INSERT INTO albuns (titulo, ano, idArtista) VALUES (?, ?, ?)').run(titulo, ano, idArtista);
      return db.prepare('SELECT * FROM albuns WHERE id = ?').get(info.lastInsertRowid);
    },
    atualizarAlbum: (_: any, { id, titulo, ano, idArtista }: any) => {
      db.prepare('UPDATE albuns SET titulo = ?, ano = ?, idArtista = ? WHERE id = ?').run(titulo, ano, idArtista, id);
      return db.prepare('SELECT * FROM albuns WHERE id = ?').get(id);
    },
    deletarAlbum: (_: any, { id }: { id: string }) => {
      console.log(`[BACKEND] Tentando deletar Álbum ID: ${id}`);
      try {
        const info = db.prepare('DELETE FROM albuns WHERE id = ?').run(id);
        console.log(`[BACKEND] Álbum ID ${id} deletado. Linhas afetadas: ${info.changes}`);
        return "Álbum deletado com sucesso";
      } catch (err: any) {
        console.error(`[BACKEND] Erro ao deletar Álbum ID ${id}:`, err);
        throw err;
      }
    },

    criarMusica: (_: any, { titulo, duracao, idArtista, idAlbum }: any) => {
      const info = db.prepare('INSERT INTO musicas (titulo, duracao, idArtista, idAlbum) VALUES (?, ?, ?, ?)').run(titulo, duracao, idArtista, idAlbum);
      return db.prepare('SELECT * FROM musicas WHERE id = ?').get(info.lastInsertRowid);
    },
    atualizarMusica: (_: any, { id, titulo, duracao, idArtista, idAlbum }: any) => {
      db.prepare('UPDATE musicas SET titulo = ?, duracao = ?, idArtista = ?, idAlbum = ? WHERE id = ?').run(titulo, duracao, idArtista, idAlbum, id);
      return db.prepare('SELECT * FROM musicas WHERE id = ?').get(id);
    },
    deletarMusica: (_: any, { id }: { id: string }) => {
      console.log(`[BACKEND] Tentando deletar Música ID: ${id}`);
      try {
        const info = db.prepare('DELETE FROM musicas WHERE id = ?').run(id);
        console.log(`[BACKEND] Música ID ${id} deletado. Linhas afetadas: ${info.changes}`);
        return "Música deletada com sucesso";
      } catch (err: any) {
        console.error(`[BACKEND] Erro ao deletar Música ID ${id}:`, err);
        throw err;
      }
    },

    criarPlaylist: (_: any, { nome, descricao, musicas }: any) => {
      const info = db.prepare('INSERT INTO playlists (nome, descricao) VALUES (?, ?)').run(nome, descricao);
      const playlistId = info.lastInsertRowid;
      
      if (musicas && musicas.length > 0) {
        const insertStmt = db.prepare('INSERT INTO playlist_musicas (playlist_id, musica_id) VALUES (?, ?)');
        musicas.forEach((mId: string) => {
          insertStmt.run(playlistId, mId);
        });
      }
      
      return resolvers.Query.playlist(null, { id: playlistId.toString() });
    },
    atualizarPlaylist: (_: any, { id, nome, descricao, musicas }: any) => {
      db.prepare('UPDATE playlists SET nome = ?, descricao = ? WHERE id = ?').run(nome, descricao, id);
      
      if (musicas) {
        db.prepare('DELETE FROM playlist_musicas WHERE playlist_id = ?').run(id);
        const insertStmt = db.prepare('INSERT INTO playlist_musicas (playlist_id, musica_id) VALUES (?, ?)');
        musicas.forEach((mId: string) => {
          insertStmt.run(id, mId);
        });
      }
      
      return resolvers.Query.playlist(null, { id });
    },
    deletarPlaylist: (_: any, { id }: { id: string }) => {
      console.log(`[BACKEND] Tentando deletar Playlist ID: ${id}`);
      try {
        const info = db.prepare('DELETE FROM playlists WHERE id = ?').run(id);
        console.log(`[BACKEND] Playlist ID ${id} deletada. Linhas afetadas: ${info.changes}`);
        return "Playlist deletada com sucesso";
      } catch (err: any) {
        console.error(`[BACKEND] Erro ao deletar Playlist ID ${id}:`, err);
        throw err;
      }
    }
  },
  Album: {
    artista: (album: any) => db.prepare('SELECT * FROM artistas WHERE id = ?').get(album.idArtista)
  },
  Musica: {
    artista: (musica: any) => db.prepare('SELECT * FROM artistas WHERE id = ?').get(musica.idArtista),
    album: (musica: any) => db.prepare('SELECT * FROM albuns WHERE id = ?').get(musica.idAlbum)
  }
};
