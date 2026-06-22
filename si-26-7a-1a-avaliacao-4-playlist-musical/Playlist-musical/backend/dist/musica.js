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
        const musicas = db_1.default.prepare('SELECT * FROM musicas').all();
        res.json(musicas);
    }
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});
router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    try {
        const musica = db_1.default.prepare('SELECT * FROM musicas WHERE id = ?').get(id);
        if (!musica) {
            return res.status(404).json({ erro: 'Música não encontrada' });
        }
        res.json(musica);
    }
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});
router.post('/', (req, res) => {
    const { titulo, duracao, idArtista, idAlbum } = req.body;
    if (!titulo || !duracao || !idArtista || !idAlbum) {
        return res.status(400).json({
            erro: 'Título, duração, idArtista e idAlbum são obrigatórios'
        });
    }
    try {
        const artistaExiste = db_1.default.prepare('SELECT id FROM artistas WHERE id = ?').get(idArtista);
        const albumExiste = db_1.default.prepare('SELECT id FROM albuns WHERE id = ?').get(idAlbum);
        if (!artistaExiste) {
            return res.status(400).json({ erro: 'Artista informado não existe' });
        }
        if (!albumExiste) {
            return res.status(400).json({ erro: 'Álbum informado não existe' });
        }
        const stmt = db_1.default.prepare('INSERT INTO musicas (titulo, duracao, idArtista, idAlbum) VALUES (?, ?, ?, ?)');
        const info = stmt.run(titulo, duracao, Number(idArtista), Number(idAlbum));
        const novaMusica = {
            id: Number(info.lastInsertRowid),
            titulo,
            duracao,
            idArtista: Number(idArtista),
            idAlbum: Number(idAlbum)
        };
        res.status(201).json(novaMusica);
    }
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});
router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const { titulo, duracao, idArtista, idAlbum } = req.body;
    if (!titulo || !duracao || !idArtista || !idAlbum) {
        return res.status(400).json({
            erro: 'Título, duração, idArtista e idAlbum são obrigatórios'
        });
    }
    try {
        const artistaExiste = db_1.default.prepare('SELECT id FROM artistas WHERE id = ?').get(idArtista);
        const albumExiste = db_1.default.prepare('SELECT id FROM albuns WHERE id = ?').get(idAlbum);
        if (!artistaExiste) {
            return res.status(400).json({ erro: 'Artista informado não existe' });
        }
        if (!albumExiste) {
            return res.status(400).json({ erro: 'Álbum informado não existe' });
        }
        const stmt = db_1.default.prepare('UPDATE musicas SET titulo = ?, duracao = ?, idArtista = ?, idAlbum = ? WHERE id = ?');
        const info = stmt.run(titulo, duracao, Number(idArtista), Number(idAlbum), id);
        if (info.changes === 0) {
            return res.status(404).json({ erro: 'Música não encontrada' });
        }
        res.json({ id, titulo, duracao, idArtista: Number(idArtista), idAlbum: Number(idAlbum) });
    }
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    try {
        const stmt = db_1.default.prepare('DELETE FROM musicas WHERE id = ?');
        const info = stmt.run(id);
        if (info.changes === 0) {
            return res.status(404).json({ erro: 'Música não encontrada' });
        }
        res.json({ mensagem: 'Música removida com sucesso' });
    }
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});
exports.default = router;
