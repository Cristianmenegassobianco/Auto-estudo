import express, { Request, Response } from 'express';
import db from './db';

const router = express.Router();

export interface Album {
    id: number;
    titulo: string;
    ano: number;
    idArtista: number;
}

router.get('/', (req: Request, res: Response) => {
    try {
        const albuns = db.prepare('SELECT * FROM albuns').all() as Album[];
        res.json(albuns);
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

router.get('/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const album = db.prepare('SELECT * FROM albuns WHERE id = ?').get(id) as Album | undefined;
        if (!album) {
            return res.status(404).json({ erro: 'Álbum não encontrado' });
        }
        res.json(album);
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

router.post('/', (req: Request, res: Response) => {
    const { titulo, ano, idArtista } = req.body;

    if (!titulo || !ano || !idArtista) {
        return res.status(400).json({ erro: 'Título, ano e idArtista são obrigatórios' });
    }

    try {
        const artistaExiste = db.prepare('SELECT id FROM artistas WHERE id = ?').get(idArtista);
        if (!artistaExiste) {
            return res.status(400).json({ erro: 'Artista informado não existe' });
        }

        const stmt = db.prepare('INSERT INTO albuns (titulo, ano, idArtista) VALUES (?, ?, ?)');
        const info = stmt.run(titulo, Number(ano), Number(idArtista));
        const novoAlbum: Album = {
            id: Number(info.lastInsertRowid),
            titulo,
            ano: Number(ano),
            idArtista: Number(idArtista)
        };
        res.status(201).json(novoAlbum);
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

router.put('/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { titulo, ano, idArtista } = req.body;

    if (!titulo || !ano || !idArtista) {
        return res.status(400).json({ erro: 'Título, ano e idArtista são obrigatórios' });
    }

    try {
        const artistaExiste = db.prepare('SELECT id FROM artistas WHERE id = ?').get(idArtista);
        if (!artistaExiste) {
            return res.status(400).json({ erro: 'Artista informado não existe' });
        }

        const stmt = db.prepare('UPDATE albuns SET titulo = ?, ano = ?, idArtista = ? WHERE id = ?');
        const info = stmt.run(titulo, Number(ano), Number(idArtista), id);
        if (info.changes === 0) {
            return res.status(404).json({ erro: 'Álbum não encontrado' });
        }
        res.json({ id, titulo, ano: Number(ano), idArtista: Number(idArtista) });
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

router.delete('/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const stmt = db.prepare('DELETE FROM albuns WHERE id = ?');
        const info = stmt.run(id);
        if (info.changes === 0) {
            return res.status(404).json({ erro: 'Álbum não encontrado' });
        }
        res.json({ mensagem: 'Álbum removido com sucesso' });
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

export default router;
