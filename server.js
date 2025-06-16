// TESTANDO O EXPRESS
import express from 'express';
import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === Banco de Dados ===
const db = new sqlite3.Database('./triagem.db');

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

app.post('/triagem', (req, res) => {
  const { respostas, tipo } = req.body;
  const stmt = db.prepare("INSERT INTO triagem (pergunta, resposta) VALUES (?, ?)");

  for (const pergunta in respostas) {
    const resposta = respostas[pergunta];
    stmt.run(pergunta, resposta);
  }

  stmt.finalize((err) => {
    if (err) {
      console.error('Erro ao salvar triagem:', err.message);
      res.status(500).send('Erro ao salvar triagem');
    } else {
      res.status(200).send('Triagem registrada com sucesso');
    }
  });
});

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
