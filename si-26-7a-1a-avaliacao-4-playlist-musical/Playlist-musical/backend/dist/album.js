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
        const albuns = db_1.default.prepare('SELECT * FROM albuns').all();
        res.json(albuns);
    }
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});
router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    try {
        const album = db_1.default.prepare('SELECT * FROM albuns WHERE id = ?').get(id);
        if (!album) {
            return res.status(404).json({ erro: 'Álbum não encontrado' });
        }
        res.json(album);
    }
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});
router.post('/', (req, res) => {
    const { titulo, ano, idArtista } = req.body;
    if (!titulo || !ano || !idArtista) {
        return res.status(400).json({ erro: 'Título, ano e idArtista são obrigatórios' });
    }
    try {
        const artistaExiste = db_1.default.prepare('SELECT id FROM artistas WHERE id = ?').get(idArtista);
        if (!artistaExiste) {
            return res.status(400).json({ erro: 'Artista informado não existe' });
        }
        const stmt = db_1.default.prepare('INSERT INTO albuns (titulo, ano, idArtista) VALUES (?, ?, ?)');
        const info = stmt.run(titulo, Number(ano), Number(idArtista));
        const novoAlbum = {
            id: Number(info.lastInsertRowid),
            titulo,
            ano: Number(ano),
            idArtista: Number(idArtista)
        };
        res.status(201).json(novoAlbum);
    }
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});
router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const { titulo, ano, idArtista } = req.body;
    if (!titulo || !ano || !idArtista) {
        return res.status(400).json({ erro: 'Título, ano e idArtista são obrigatórios' });
    }
    try {
        const artistaExiste = db_1.default.prepare('SELECT id FROM artistas WHERE id = ?').get(idArtista);
        if (!artistaExiste) {
            return res.status(400).json({ erro: 'Artista informado não existe' });
        }
        const stmt = db_1.default.prepare('UPDATE albuns SET titulo = ?, ano = ?, idArtista = ? WHERE id = ?');
        const info = stmt.run(titulo, Number(ano), Number(idArtista), id);
        if (info.changes === 0) {
            return res.status(404).json({ erro: 'Álbum não encontrado' });
        }
        res.json({ id, titulo, ano: Number(ano), idArtista: Number(idArtista) });
    }
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    try {
        const stmt = db_1.default.prepare('DELETE FROM albuns WHERE id = ?');
        const info = stmt.run(id);
        if (info.changes === 0) {
            return res.status(404).json({ erro: 'Álbum não encontrado' });
        }
        res.json({ mensagem: 'Álbum removido com sucesso' });
    }
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});
exports.default = router;
