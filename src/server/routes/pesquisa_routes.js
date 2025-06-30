import express from 'express';
import nodemailer from 'nodemailer';
const router = express.Router();

export default (db) => {
  router.post('/pesquisa', (req, res) => {
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
    const usuarioId = usuario_id || null;
    const stmt = db.prepare("INSERT INTO pesquisa (usuario_id, pergunta, resposta) VALUES (?, ?, ?)");
    respostas.forEach((resposta, idx) => {
      stmt.run(usuarioId, perguntasPesquisa[idx], resposta);
    });
    stmt.finalize((err) => {
      if (err) {
        console.error('Erro ao salvar pesquisa:', err.message);
        res.status(500).json({ erro: 'Erro ao salvar pesquisa' });
      } else {
        db.get('SELECT email FROM users WHERE id = ?', [usuarioId], (err, row) => {
          if (err) {
            console.error('Erro ao buscar email do usuário:', err.message);
          } else if (row && row.email) {
            const usuarioEmail = row.email;
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
              }
            });
            db.get("SELECT name FROM users WHERE id = ?", [usuarioId], (err, row) => {
              if (err) {
                console.error('Erro ao buscar nome do usuário:', err.message);
              } else if (row) {
                const paciente = row.name;
                const mailOptions = {
                  from: process.env.GMAIL_USER,
                  to: usuarioEmail,
                  subject: 'Agradecimento pela sua participação na pesquisa',
                  text: `Olá ${paciente},\n\nAgradecemos por responder à nossa pesquisa de satisfação! Sua opinião é fundamental para melhorarmos continuamente nossos serviços e oferecer um atendimento cada vez mais humanizado e eficiente.\n\nConte sempre conosco.\n\nAtenciosamente, Saúde Conectada MA`
                };
                transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                    console.error('Erro ao enviar e-mail:', error);
                  }
                });
              }
            });
          }
        });
        res.status(200).json({ mensagem: 'Pesquisa registrada com sucesso' });
      }
    });
  });
  return router;
};