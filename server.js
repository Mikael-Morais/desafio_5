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

// Servir arquivos estáticos da pasta src/pages
app.use(express.static(path.join(__dirname, 'src', 'pages')));

// Redirecionar / para index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'pages', 'index.html'));
});

app.post('/api/triagem', (req, res) => {
  const { respostas, usuario_id } = req.body;
  console.log('Respostas recebidas:', respostas); // Diagnóstico
  if (!Array.isArray(respostas)) {
    return res.status(400).json({ erro: 'Respostas devem ser um array.' });
  }
 
  const perguntasTriagem = [
    "Você está com febre alta?",
    "Está com dificuldade para respirar?",
    "Está com dores no peito?",
    "Tem histórico de doenças crônicas?",
    "Está com vômitos ou diarreia?",
    "Você está com tosse persistente?",
    "Você teve contato com alguém doente recentemente?",
    "Você sente cansaço extremo?",
    "Você está com manchas pelo corpo?",
    "Está com sangramento ou secreções anormais?"
  ];
  const stmt = db.prepare("INSERT INTO triagem (usuario_id, pergunta, resposta) VALUES (?, ?, ?)");
  respostas.forEach((resposta, idx) => {
    stmt.run(null, perguntasTriagem[idx], resposta);
  });
  stmt.finalize((err) => {
    if (err) {
      console.error('Erro ao salvar triagem:', err.message);
      res.status(500).json({ erro: 'Erro ao salvar triagem' });
    } else {
      res.status(200).json({ mensagem: 'Triagem registrada com sucesso' });
    }
  });
});

app.post('/api/pesquisa', (req, res) => {
  const { respostas, usuario_id } = req.body;
  console.log('Respostas recebidas:', respostas); // Diagnóstico
  if (!Array.isArray(respostas)) {
    return res.status(400).json({ erro: 'Respostas devem ser um array.' });
  }
 
  const perguntasPesquisa = [
  "Você consegue agendar consultas online?",
  "Você sente que os profissionais de saúde são atenciosos?",
  "Você encontrou os medicamentos que precisava?",
  "O tempo de espera foi razoável?",
  "Você teve acesso fácil à unidade de saúde?",
  "As instalações estavam limpas e organizadas?",
  "Você recebeu orientações claras sobre seu tratamento?",
  "Você foi atendido com respeito e cordialidade?",
  "A equipe parecia bem treinada?",
  "Você indicaria a unidade para outra pessoa?",
  "Conseguiu realizar todos os exames solicitados?",
  "As informações sobre horários e serviços estavam disponíveis?",
  "Você teve facilidade em localizar a unidade?",
  "As salas de espera eram confortáveis?",
  "Você se sentiu seguro durante o atendimento?"
];
  const stmt = db.prepare("INSERT INTO pesquisa (usuario_id, pergunta, resposta) VALUES (?, ?, ?)");
  respostas.forEach((resposta, idx) => {
    stmt.run(null, perguntasPesquisa[idx], resposta);
  });
  stmt.finalize((err) => {
    if (err) {
      console.error('Erro ao salvar triagem:', err.message);
      res.status(500).json({ erro: 'Erro ao salvar triagem' });
    } else {
      res.status(200).json({ mensagem: 'Triagem registrada com sucesso' });
    }
  });
});

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
