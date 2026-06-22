"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    try {
        const playlists = db_1.default.prepare('SELECT * FROM playlists').all();
        for (const playlist of playlists) {
            playlist.musicas = db_1.default.prepare(`
                SELECT m.* FROM musicas m
                JOIN playlist_musicas pm ON m.id = pm.musica_id
                WHERE pm.playlist_id = ?
            `).all(playlist.id);
        }
        res.json(playlists);
    }
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});
router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    try {
        const playlist = db_1.default.prepare('SELECT * FROM playlists WHERE id = ?').get(id);
        if (!playlist) {
            return res.status(404).json({ erro: 'Playlist não encontrada' });
        }
        playlist.musicas = db_1.default.prepare(`
                SELECT m.* FROM musicas m
                JOIN playlist_musicas pm ON m.id = pm.musica_id
                WHERE pm.playlist_id = ?
            `).all(id);
        res.json(playlist);
    }
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});
router.post('/', (req, res) => {
    const { nome, descricao, musicas: musicasIds } = req.body;
    if (!nome || !descricao) {
        return res.status(400).json({ erro: 'Nome e descrição são obrigatórios' });
    }
    try {
        const insertPlaylist = db_1.default.prepare('INSERT INTO playlists (nome, descricao) VALUES (?, ?)');
        const insertRelation = db_1.default.prepare('INSERT INTO playlist_musicas (playlist_id, musica_id) VALUES (?, ?)');
        const transaction = db_1.default.transaction((nomeVal, descVal, ids) => {
            const info = insertPlaylist.run(nomeVal, descVal);
            const playlistId = Number(info.lastInsertRowid);
            for (const mId of ids) {
                const musicaExiste = db_1.default.prepare('SELECT id FROM musicas WHERE id = ?').get(mId);
                if (musicaExiste) {
                    insertRelation.run(playlistId, mId);
                }
            }
            return playlistId;
        });
        const ids = Array.isArray(musicasIds) ? musicasIds.map(Number) : [];
        const playlistId = transaction(nome, descricao, ids);
        const novaPlaylist = db_1.default.prepare('SELECT * FROM playlists WHERE id = ?').get(playlistId);
        novaPlaylist.musicas = db_1.default.prepare(`
            SELECT m.* FROM musicas m
            JOIN playlist_musicas pm ON m.id = pm.musica_id
            WHERE pm.playlist_id = ?
        `).all(playlistId);
        res.status(201).json(novaPlaylist);
    }
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});
router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const { nome, descricao, musicas: musicasIds } = req.body;
    if (!nome || !descricao) {
        return res.status(400).json({ erro: 'Nome e descrição são obrigatórios' });
    }
    try {
        const updatePlaylist = db_1.default.prepare('UPDATE playlists SET nome = ?, descricao = ? WHERE id = ?');
        const deleteRelations = db_1.default.prepare('DELETE FROM playlist_musicas WHERE playlist_id = ?');
        const insertRelation = db_1.default.prepare('INSERT INTO playlist_musicas (playlist_id, musica_id) VALUES (?, ?)');
        const transaction = db_1.default.transaction((pId, nomeVal, descVal, ids) => {
            const info = updatePlaylist.run(nomeVal, descVal, pId);
            if (info.changes === 0) {
                throw new Error('Playlist não encontrada');
            }
            deleteRelations.run(pId);
            for (const mId of ids) {
                const musicaExiste = db_1.default.prepare('SELECT id FROM musicas WHERE id = ?').get(mId);
                if (musicaExiste) {
                    insertRelation.run(pId, mId);
                }
            }
        });
        const ids = Array.isArray(musicasIds) ? musicasIds.map(Number) : [];
        transaction(id, nome, descricao, ids);
        const playlistAtualizada = db_1.default.prepare('SELECT * FROM playlists WHERE id = ?').get(id);
        playlistAtualizada.musicas = db_1.default.prepare(`
            SELECT m.* FROM musicas m
            JOIN playlist_musicas pm ON m.id = pm.musica_id
            WHERE pm.playlist_id = ?
        `).all(id);
        res.json(playlistAtualizada);
    }
    catch (error) {
        if (error.message === 'Playlist não encontrada') {
            return res.status(404).json({ erro: error.message });
        }
        res.status(500).json({ erro: error.message });
    }
});
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    try {
        const stmt = db_1.default.prepare('DELETE FROM playlists WHERE id = ?');
        const info = stmt.run(id);
        if (info.changes === 0) {
            return res.status(404).json({ erro: 'Playlist não encontrada' });
        }
        res.json({ mensagem: 'Playlist removida com sucesso' });
    }
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});
exports.default = router;
