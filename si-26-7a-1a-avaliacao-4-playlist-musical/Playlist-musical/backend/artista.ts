import express, { Request, Response } from 'express';
import db from './db';

const router = express.Router();

export interface Artista {
    id: number;
    nome: string;
    generoMusical: string;
}

router.get('/', (req: Request, res: Response) => {
    try {
        const artistas = db.prepare('SELECT * FROM artistas').all() as Artista[];
        res.json(artistas);
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

router.get('/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const artista = db.prepare('SELECT * FROM artistas WHERE id = ?').get(id) as Artista | undefined;
        if (!artista) {
            return res.status(404).json({ erro: 'Artista não encontrado' });
        }
        res.json(artista);
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

router.post('/', (req: Request, res: Response) => {
    const { nome, generoMusical } = req.body;

    if (!nome || !generoMusical) {
        return res.status(400).json({ erro: 'Nome e gênero musical são obrigatórios' });
    }

    try {
        const stmt = db.prepare('INSERT INTO artistas (nome, generoMusical) VALUES (?, ?)');
        const info = stmt.run(nome, generoMusical);
        const novoArtista: Artista = {
            id: Number(info.lastInsertRowid),
            nome,
            generoMusical
        };
        res.status(201).json(novoArtista);
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

router.put('/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { nome, generoMusical } = req.body;

    if (!nome || !generoMusical) {
        return res.status(400).json({ erro: 'Nome e gênero musical são obrigatórios' });
    }

    try {
        const stmt = db.prepare('UPDATE artistas SET nome = ?, generoMusical = ? WHERE id = ?');
        const info = stmt.run(nome, generoMusical, id);
        if (info.changes === 0) {
            return res.status(404).json({ erro: 'Artista não encontrado' });
        }
        res.json({ id, nome, generoMusical });
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

router.delete('/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const stmt = db.prepare('DELETE FROM artistas WHERE id = ?');
        const info = stmt.run(id);
        if (info.changes === 0) {
            return res.status(404).json({ erro: 'Artista não encontrado' });
        }
        res.json({ mensagem: 'Artista removido com sucesso' });
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
});

export default router;
