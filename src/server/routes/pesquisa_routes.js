import express from 'express';
const router = express.Router();

export default (db) => {
  router.post('/api/pesquisa', (req, res) => {
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
        console.error('Erro ao salvar pesquisa:', err.message);
        res.status(500).json({ erro: 'Erro ao salvar pesquisa' });
      } else {
        res.status(200).json({ mensagem: 'Pesquisa registrada com sucesso' });
      }
    });
  });
  return router;
};