import express, { Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { gerarToken, verificarToken } from './auth';
import path from 'path';
import artistaRouter from './artista';
import albumRouter from './album';
import musicaRouter from './musica';
import playlistRouter from './playlist';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const REFRESH_SECRET = 'minha_chave_refresh_super_segura';
const refreshTokens: string[] = [];

const usuarios: any[] = [];
const criarUsuarios = async () => {
    const senha = await bcrypt.hash('admin', 10);
    usuarios.push({
        usuario: 'admin',
        senha: senha
    });
};
criarUsuarios();

async function startServer() {
    const app = express();

    app.use(cors({
        origin: 'http://localhost:3001', 
        credentials: true
    }));
    
    app.use(express.json());
    app.use(cookieParser());

    app.use('/api/artistas', artistaRouter);
    app.use('/api/albuns', albumRouter);
    app.use('/api/musicas', musicaRouter);
    app.use('/api/playlists', playlistRouter);

    app.post('/log', (req: Request, res: Response) => {
        console.log('[CLIENT-LOG]', req.body.msg);
        res.sendStatus(200);
    });

    const authMiddleware = (req: Request, res: Response, next: any) => {
        if (req.path === '/login' || req.path === '/log' || req.path === '/' || req.path.includes('.html') || req.path.includes('.js') || req.path.includes('.css')) {
            return next();
        }

        const token = req.headers['x-access-token'] as string || req.cookies?.auth_token;
        if (!token || !verificarToken(token)) {
            return res.status(401).json({ erro: 'Opa, não autorizado. Faz login aí primeiro.' });
        }
        next();
    };

    app.use(authMiddleware);

    app.post('/login', async (req: Request, res: Response) => {
        const { usuario, senha } = req.body;
        
        const user = usuarios.find((u) => u.usuario === usuario);

        if (user && await bcrypt.compare(senha, user.senha)) {
            const token = gerarToken({ id: 1, usuario });
            const refreshToken = jwt.sign({ id: 1, usuario }, REFRESH_SECRET, { expiresIn: '7d' });
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

    app.post('/refresh', (req: Request, res: Response) => {
        const { token } = req.body;
        if (!token) return res.sendStatus(401);
        if (!refreshTokens.includes(token)) return res.sendStatus(403);

        jwt.verify(token, REFRESH_SECRET, (err: any, user: any) => {
            if (err) return res.sendStatus(403);
            const newToken = gerarToken({ id: user.id, usuario: user.usuario });
            res.json({ token: newToken });
        });
    });

    app.post('/logout', (req: Request, res: Response) => {
        const { token } = req.body;
        const index = refreshTokens.indexOf(token);
        if (index > -1) refreshTokens.splice(index, 1);
        res.clearCookie('auth_token');
        res.json({ mensagem: 'Logout realizado' });
    });

    app.use((req, res, next) => {
        res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'");
        next();
    });

    const frontendPath = path.join(process.cwd(), '../frontend');
    app.use(express.static(frontendPath));

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();

    // @ts-ignore
    app.use('/graphql', expressMiddleware(server));

    const PORT = process.env.PORT || 3001;
    http.createServer(app).listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
        console.log(`GraphQL pronto em http://localhost:${PORT}/graphql`);
    });
}

startServer();
