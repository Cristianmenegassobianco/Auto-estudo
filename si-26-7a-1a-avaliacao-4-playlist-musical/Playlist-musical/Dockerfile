FROM node:20-alpine

# Cria a pasta da aplicação
WORKDIR /app

# Copia os arquivos do frontend para que o backend possa servi-los
COPY frontend ./frontend

# Configura o backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install

# Copia o restante do código do backend
COPY backend/ .

# Expõe a porta
EXPOSE 3001

# Inicia o servidor
CMD ["npm", "start"]
