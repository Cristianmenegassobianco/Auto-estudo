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
        const artistas = db_1.default.prepare('SELECT * FROM artistas').all();
        res.json(artistas);
    }
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});
router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    try {
        const artista = db_1.default.prepare('SELECT * FROM artistas WHERE id = ?').get(id);
        if (!artista) {
            return res.status(404).json({ erro: 'Artista não encontrado' });
        }
        res.json(artista);
    }
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});
router.post('/', (req, res) => {
    const { nome, generoMusical } = req.body;
    if (!nome || !generoMusical) {
        return res.status(400).json({ erro: 'Nome e gênero musical são obrigatórios' });
    }
    try {
        const stmt = db_1.default.prepare('INSERT INTO artistas (nome, generoMusical) VALUES (?, ?)');
        const info = stmt.run(nome, generoMusical);
        const novoArtista = {
            id: Number(info.lastInsertRowid),
            nome,
            generoMusical
        };
        res.status(201).json(novoArtista);
    }
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});
router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const { nome, generoMusical } = req.body;
    if (!nome || !generoMusical) {
        return res.status(400).json({ erro: 'Nome e gênero musical são obrigatórios' });
    }
    try {
        const stmt = db_1.default.prepare('UPDATE artistas SET nome = ?, generoMusical = ? WHERE id = ?');
        const info = stmt.run(nome, generoMusical, id);
        if (info.changes === 0) {
            return res.status(404).json({ erro: 'Artista não encontrado' });
        }
        res.json({ id, nome, generoMusical });
    }
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    try {
        const stmt = db_1.default.prepare('DELETE FROM artistas WHERE id = ?');
        const info = stmt.run(id);
        if (info.changes === 0) {
            return res.status(404).json({ erro: 'Artista não encontrado' });
        }
        res.json({ mensagem: 'Artista removido com sucesso' });
    }
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});
exports.default = router;
