"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarToken = exports.gerarToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = 'minha_chave_secreta_super_segura';
const gerarToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, SECRET, { expiresIn: '1h' });
};
exports.gerarToken = gerarToken;
const verificarToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, SECRET);
    }
    catch (e) {
        return null;
    }
};
exports.verificarToken = verificarToken;
