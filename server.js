import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';

import userRoutes from './src/server/routes/user.js';
import triagemRoutes from './src/server/routes/triagem_routes.js';
import pesquisaRoutes from './src/server/routes/pesquisa_routes.js';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === Banco de Dados ===
const db = new sqlite3.Database('./src/database/triagem.db');

const schemaPath = path.join(__dirname, 'src', 'database', 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf-8');

db.exec(schema, (err) => {
  if (err) {
    console.error('Erro ao executar schema.sql:', err.message);
  } else {
    console.log('Schema aplicado com sucesso.');
  }
});

// === App Express ===
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// === Servir arquivos estáticos (HTML, CSS, JS) ===
app.use(express.static(path.join(__dirname, 'src', 'pages')));

// === Rotas da API ===
app.use('/api', userRoutes);         // rotas de login/autenticação
app.use('/api', triagemRoutes(db));  // rotas de triagem (com acesso ao banco)
app.use('/api', pesquisaRoutes(db)); // rotas de pesquisa (com acesso ao banco)

// === Página inicial ===
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'pages', 'index.html'));
});

// === Iniciar servidor ===
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
