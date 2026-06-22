import express, { Request, Response } from 'express';
import db from './db';
import { Musica } from './musica';

const router = express.Router();

export interface Playlist {
    id: number;
    nome: string;
    descricao: string;
    musicas?: Musica[];
}

router.get('/', (req: Request, res: Response) => {
    try {
        const playlists = db.prepare('SELECT * FROM playlists').all() as Playlist[];
        for (const playlist of playlists) {
            playlist.musicas = db.prepare(`
                SELECT m.* FROM musicas m
                JOIN playlist_musicas pm ON m.id = pm.musica_id
                WHERE pm.playlist_id = ?
            `).all(playlist.id) as Musica[];
        }
        res.json(playlists);
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

router.get('/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const playlist = db.prepare('SELECT * FROM playlists WHERE id = ?').get(id) as Playlist | undefined;
        if (!playlist) {
            return res.status(404).json({ erro: 'Playlist não encontrada' });
        }
        playlist.musicas = db.prepare(`
                SELECT m.* FROM musicas m
                JOIN playlist_musicas pm ON m.id = pm.musica_id
                WHERE pm.playlist_id = ?
            `).all(id) as Musica[];
        res.json(playlist);
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

router.post('/', (req: Request, res: Response) => {
    const { nome, descricao, musicas: musicasIds } = req.body;

    if (!nome || !descricao) {
        return res.status(400).json({ erro: 'Nome e descrição são obrigatórios' });
    }

    try {
        const insertPlaylist = db.prepare('INSERT INTO playlists (nome, descricao) VALUES (?, ?)');
        const insertRelation = db.prepare('INSERT INTO playlist_musicas (playlist_id, musica_id) VALUES (?, ?)');

        const transaction = db.transaction((nomeVal: string, descVal: string, ids: number[]) => {
            const info = insertPlaylist.run(nomeVal, descVal);
            const playlistId = Number(info.lastInsertRowid);

            for (const mId of ids) {
                const musicaExiste = db.prepare('SELECT id FROM musicas WHERE id = ?').get(mId);
                if (musicaExiste) {
                    insertRelation.run(playlistId, mId);
                }
            }
            return playlistId;
        });

        const ids: number[] = Array.isArray(musicasIds) ? musicasIds.map(Number) : [];
        const playlistId = transaction(nome, descricao, ids);

        const novaPlaylist = db.prepare('SELECT * FROM playlists WHERE id = ?').get(playlistId) as Playlist;
        novaPlaylist.musicas = db.prepare(`
            SELECT m.* FROM musicas m
            JOIN playlist_musicas pm ON m.id = pm.musica_id
            WHERE pm.playlist_id = ?
        `).all(playlistId) as Musica[];

        res.status(201).json(novaPlaylist);
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

router.put('/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { nome, descricao, musicas: musicasIds } = req.body;

    if (!nome || !descricao) {
        return res.status(400).json({ erro: 'Nome e descrição são obrigatórios' });
    }

    try {
        const updatePlaylist = db.prepare('UPDATE playlists SET nome = ?, descricao = ? WHERE id = ?');
        const deleteRelations = db.prepare('DELETE FROM playlist_musicas WHERE playlist_id = ?');
        const insertRelation = db.prepare('INSERT INTO playlist_musicas (playlist_id, musica_id) VALUES (?, ?)');

        const transaction = db.transaction((pId: number, nomeVal: string, descVal: string, ids: number[]) => {
            const info = updatePlaylist.run(nomeVal, descVal, pId);
            if (info.changes === 0) {
                throw new Error('Playlist não encontrada');
            }

            deleteRelations.run(pId);

            for (const mId of ids) {
                const musicaExiste = db.prepare('SELECT id FROM musicas WHERE id = ?').get(mId);
                if (musicaExiste) {
                    insertRelation.run(pId, mId);
                }
            }
        });

        const ids: number[] = Array.isArray(musicasIds) ? musicasIds.map(Number) : [];
        transaction(id, nome, descricao, ids);

        const playlistAtualizada = db.prepare('SELECT * FROM playlists WHERE id = ?').get(id) as Playlist;
        playlistAtualizada.musicas = db.prepare(`
            SELECT m.* FROM musicas m
            JOIN playlist_musicas pm ON m.id = pm.musica_id
            WHERE pm.playlist_id = ?
        `).all(id) as Musica[];

        res.json(playlistAtualizada);
    } catch (error: any) {
        if (error.message === 'Playlist não encontrada') {
            return res.status(404).json({ erro: error.message });
        }
        res.status(500).json({ erro: error.message });
    }
});

router.delete('/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const stmt = db.prepare('DELETE FROM playlists WHERE id = ?');
        const info = stmt.run(id);
        if (info.changes === 0) {
            return res.status(404).json({ erro: 'Playlist não encontrada' });
        }
        res.json({ mensagem: 'Playlist removida com sucesso' });
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

export default router;
