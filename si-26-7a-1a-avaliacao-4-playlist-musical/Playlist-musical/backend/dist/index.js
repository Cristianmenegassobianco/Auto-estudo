"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const schema_1 = require("./schema");
const resolvers_1 = require("./resolvers");
const auth_1 = require("./auth");
const path_1 = __importDefault(require("path"));
const artista_1 = __importDefault(require("./artista"));
const album_1 = __importDefault(require("./album"));
const musica_1 = __importDefault(require("./musica"));
const playlist_1 = __importDefault(require("./playlist"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const REFRESH_SECRET = 'minha_chave_refresh_super_segura';
const refreshTokens = [];
const usuarios = [];
const criarUsuarios = async () => {
    const senha = await bcryptjs_1.default.hash('admin', 10);
    usuarios.push({
        usuario: 'admin',
        senha: senha
    });
};
criarUsuarios();
async function startServer() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: 'http://localhost:3001',
        credentials: true
    }));
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use('/api/artistas', artista_1.default);
    app.use('/api/albuns', album_1.default);
    app.use('/api/musicas', musica_1.default);
    app.use('/api/playlists', playlist_1.default);
    app.post('/log', (req, res) => {
        console.log('[CLIENT-LOG]', req.body.msg);
        res.sendStatus(200);
    });
    const authMiddleware = (req, res, next) => {
        if (req.path === '/login' || req.path === '/log' || req.path === '/' || req.path.includes('.html') || req.path.includes('.js') || req.path.includes('.css')) {
            return next();
        }
        const token = req.headers['x-access-token'] || req.cookies?.auth_token;
        if (!token || !(0, auth_1.verificarToken)(token)) {
            return res.status(401).json({ erro: 'Opa, não autorizado. Faz login aí primeiro.' });
        }
        next();
    };
    app.use(authMiddleware);
    app.post('/login', async (req, res) => {
        const { usuario, senha } = req.body;
        const user = usuarios.find((u) => u.usuario === usuario);
        if (user && await bcryptjs_1.default.compare(senha, user.senha)) {
            const token = (0, auth_1.gerarToken)({ id: 1, usuario });
            const refreshToken = jsonwebtoken_1.default.sign({ id: 1, usuario }, REFRESH_SECRET, { expiresIn: '7d' });
            refreshTokens.push(refreshToken);
            // Mantendo cookie para compatibilidade, mas também retornando o token no JSON
            res.cookie('auth_token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 3600000
            });
            return res.json({ mensagem: 'Show, login deu certo!', token, refreshToken });
        }
        res.status(401).json({ erro: 'Credenciais erradas, tenta de novo.' });
    });
    app.post('/refresh', (req, res) => {
        const { token } = req.body;
        if (!token)
            return res.sendStatus(401);
        if (!refreshTokens.includes(token))
            return res.sendStatus(403);
        jsonwebtoken_1.default.verify(token, REFRESH_SECRET, (err, user) => {
            if (err)
                return res.sendStatus(403);
            const newToken = (0, auth_1.gerarToken)({ id: user.id, usuario: user.usuario });
            res.json({ token: newToken });
        });
    });
    app.post('/logout', (req, res) => {
        const { token } = req.body;
        const index = refreshTokens.indexOf(token);
        if (index > -1)
            refreshTokens.splice(index, 1);
        res.clearCookie('auth_token');
        res.json({ mensagem: 'Logout realizado' });
    });
    app.use((req, res, next) => {
        res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'");
        next();
    });
    const frontendPath = path_1.default.join(process.cwd(), '../frontend');
    app.use(express_1.default.static(frontendPath));
    const server = new server_1.ApolloServer({
        typeDefs: schema_1.typeDefs,
        resolvers: resolvers_1.resolvers,
    });
    await server.start();
    // @ts-ignore
    app.use('/graphql', (0, express4_1.expressMiddleware)(server));
    http_1.default.createServer(app).listen(3001, () => {
        console.log('Servidor rodando em http://localhost:3001');
        console.log('GraphQL pronto em http://localhost:3001/graphql');
    });
}
startServer();
