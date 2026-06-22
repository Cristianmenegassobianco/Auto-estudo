import Database from 'better-sqlite3';

const db = new Database('playlist.db');

db.pragma('foreign_keys = ON');

db.exec(`
    CREATE TABLE IF NOT EXISTS artistas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        generoMusical TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS albuns (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        ano INTEGER NOT NULL,
        idArtista INTEGER NOT NULL,
        FOREIGN KEY(idArtista) REFERENCES artistas(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS musicas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        duracao TEXT NOT NULL,
        idArtista INTEGER NOT NULL,
        idAlbum INTEGER NOT NULL,
        FOREIGN KEY(idArtista) REFERENCES artistas(id) ON DELETE CASCADE,
        FOREIGN KEY(idAlbum) REFERENCES albuns(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS playlists (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        descricao TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS playlist_musicas (
        playlist_id INTEGER NOT NULL,
        musica_id INTEGER NOT NULL,
        PRIMARY KEY (playlist_id, musica_id),
        FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE,
        FOREIGN KEY(musica_id) REFERENCES musicas(id) ON DELETE CASCADE
    );
`);

export default db;
