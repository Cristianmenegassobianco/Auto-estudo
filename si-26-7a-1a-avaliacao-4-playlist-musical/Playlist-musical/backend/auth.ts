import jwt from 'jsonwebtoken';

const SECRET = 'minha_chave_secreta_super_segura';

export const gerarToken = (payload: any) => {
    return jwt.sign(payload, SECRET, { expiresIn: '1h' });
};

export const verificarToken = (token: string) => {
    try {
        return jwt.verify(token, SECRET);
    } catch (e) {
        return null;
    }
};
