const express = require('express');
const sqlite3 = require('sqlite3').verbose(); // Usando SQLite3
const bodyParser = require('body-parser');
const fs = require('fs'); // Para ler o arquivo schema.sql

const app = express();
const port = 3000;

// Configuração do banco de dados SQLite3
const db = new sqlite3.Database('./feedback_unidade_saude.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite3');
  }
});

// Carregar o schema.sql para criar a tabela no banco de dados
const schema = fs.readFileSync('schema.sql', 'utf-8'); // Lê o arquivo schema.sql
db.exec(schema, (err) => {
  if (err) {
    console.error('Erro ao carregar o schema:', err.message);
  } else {
    console.log('Schema carregado com sucesso');
  }
});

// Configurar o middleware para interpretar o corpo das requisições
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rota para enviar respostas ao banco de dados
app.post('/submit-feedback', (req, res) => {
  const data = req.body;

  const query = `
    INSERT INTO respostas (
      consulta_online, profissionais_atenciosos, encontrou_medicamentos, tempo_espera, 
      acesso_facil_unidade, instalacoes_limpas, orientacoes_claras, atendido_respeito, 
      equipe_bem_treinada, indicaria_unidade, exames_solicitados, informacoes_disponiveis, 
      facilidade_localizar_unidade, salas_espera_confortaveis, se_sentiu_seguro
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  const values = [
    data.consulta_online, data.profissionais_atenciosos, data.encontrou_medicamentos, data.tempo_espera, 
    data.acesso_facil_unidade, data.instalacoes_limpas, data.orientacoes_claras, data.atendido_respeito, 
    data.equipe_bem_treinada, data.indicaria_unidade, data.exames_solicitados, data.informacoes_disponiveis, 
    data.facilidade_localizar_unidade, data.salas_espera_confortaveis, data.se_sentiu_seguro
  ];

  db.run(query, values, function (err) {
    if (err) {
      console.error('Erro ao salvar os dados:', err.message);
      return res.status(500).send('Erro ao salvar os dados');
    }
    res.status(200).send('Resposta salva com sucesso!');
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

