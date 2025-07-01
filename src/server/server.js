import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';

import userRoutes from './routes/user.js';
import triagemRoutes from './routes/triagem_routes.js';
import pesquisaRoutes from './routes/pesquisa_routes.js';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === Banco de Dados ===
const dbDir = path.resolve(__dirname, '../database');
if (!fs.existsSync(dbDir)) {
  console.error('Pasta do banco de dados não encontrada em:', dbDir);
  process.exit(1);
}
const dbPath = path.join(dbDir, 'triagem.db');
const db = new sqlite3.Database(dbPath);
const schemaPath = path.join(dbDir, 'schema.sql');
if (!fs.existsSync(schemaPath)) {
  console.error('Arquivo schema.sql não encontrado em:', schemaPath);
  process.exit(1);
}
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
app.use(express.static(path.resolve(__dirname, '../pages')));

// === Rotas da API ===
app.use('/api', userRoutes);         // rotas de login/autenticação
app.use('/api', triagemRoutes(db));  // rotas de triagem (com acesso ao banco)
app.use('/api', pesquisaRoutes(db)); // rotas de pesquisa (com acesso ao banco)

// === Página inicial ===
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../pages/index.html'));
});

// === Iniciar servidor ===
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
