import express from 'express';
import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import triagemRoutes from "./src/server/routes/triagem_routes.js";
import pesquisaRoutes from "./src/server/routes/pesquisa_routes.js";

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

// === Servidor Express ===
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src', 'pages')));
app.use(triagemRoutes(db));
app.use(pesquisaRoutes(db));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'pages', 'index.html'));
});


// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
