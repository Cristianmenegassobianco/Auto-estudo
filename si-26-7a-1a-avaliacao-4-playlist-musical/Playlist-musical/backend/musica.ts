import express, { Request, Response } from 'express';
import db from './db';

const router = express.Router();

export interface Musica {
    id: number;
    titulo: string;
    duracao: string;
    idArtista: number;
    idAlbum: number;
}

router.get('/', (req: Request, res: Response) => {
    try {
        const musicas = db.prepare('SELECT * FROM musicas').all() as Musica[];
        res.json(musicas);
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

router.get('/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const musica = db.prepare('SELECT * FROM musicas WHERE id = ?').get(id) as Musica | undefined;
        if (!musica) {
            return res.status(404).json({ erro: 'Música não encontrada' });
        }
        res.json(musica);
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

router.post('/', (req: Request, res: Response) => {
    const { titulo, duracao, idArtista, idAlbum } = req.body;

    if (!titulo || !duracao || !idArtista || !idAlbum) {
        return res.status(400).json({
            erro: 'Título, duração, idArtista e idAlbum são obrigatórios'
        });
    }

    try {
        const artistaExiste = db.prepare('SELECT id FROM artistas WHERE id = ?').get(idArtista);
        const albumExiste = db.prepare('SELECT id FROM albuns WHERE id = ?').get(idAlbum);

        if (!artistaExiste) {
            return res.status(400).json({ erro: 'Artista informado não existe' });
        }

        if (!albumExiste) {
            return res.status(400).json({ erro: 'Álbum informado não existe' });
        }

        const stmt = db.prepare('INSERT INTO musicas (titulo, duracao, idArtista, idAlbum) VALUES (?, ?, ?, ?)');
        const info = stmt.run(titulo, duracao, Number(idArtista), Number(idAlbum));
        const novaMusica: Musica = {
            id: Number(info.lastInsertRowid),
            titulo,
            duracao,
            idArtista: Number(idArtista),
            idAlbum: Number(idAlbum)
        };
        res.status(201).json(novaMusica);
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

router.put('/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { titulo, duracao, idArtista, idAlbum } = req.body;

    if (!titulo || !duracao || !idArtista || !idAlbum) {
        return res.status(400).json({
            erro: 'Título, duração, idArtista e idAlbum são obrigatórios'
        });
    }

    try {
        const artistaExiste = db.prepare('SELECT id FROM artistas WHERE id = ?').get(idArtista);
        const albumExiste = db.prepare('SELECT id FROM albuns WHERE id = ?').get(idAlbum);

        if (!artistaExiste) {
            return res.status(400).json({ erro: 'Artista informado não existe' });
        }

        if (!albumExiste) {
            return res.status(400).json({ erro: 'Álbum informado não existe' });
        }

        const stmt = db.prepare('UPDATE musicas SET titulo = ?, duracao = ?, idArtista = ?, idAlbum = ? WHERE id = ?');
        const info = stmt.run(titulo, duracao, Number(idArtista), Number(idAlbum), id);
        if (info.changes === 0) {
            return res.status(404).json({ erro: 'Música não encontrada' });
        }
        res.json({ id, titulo, duracao, idArtista: Number(idArtista), idAlbum: Number(idAlbum) });
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

router.delete('/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const stmt = db.prepare('DELETE FROM musicas WHERE id = ?');
        const info = stmt.run(id);
        if (info.changes === 0) {
            return res.status(404).json({ erro: 'Música não encontrada' });
        }
        res.json({ mensagem: 'Música removida com sucesso' });
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

export default router;
