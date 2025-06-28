import express from 'express';
const router = express.Router();

export default (db) => {
  router.post('/triagem', (req, res) => {
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
    const usuarioId = usuario_id || null;
    const stmt = db.prepare("INSERT INTO triagem (usuario_id, pergunta, resposta) VALUES (?, ?, ?)");
    respostas.forEach((resposta, idx) => {
      stmt.run(usuarioId, perguntasTriagem[idx], resposta);
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
  return router;
};