import express from 'express';
import nodemailer from 'nodemailer';
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
                  subject: 'Sua triagem foi recebida com sucesso',
                  text: `Olá ${paciente},\n\nEsperamos que você esteja bem! Informamos que sua triagem foi recebida com sucesso e já está sendo cuidadosamente analisada por um de nossos especialistas. Em breve, entraremos em contato com uma resposta personalizada, com toda a atenção e o cuidado que sua saúde merece.\nNosso compromisso é oferecer um atendimento ágil, humano e de qualidade — porque cuidar de você é a nossa prioridade. Se tiver qualquer dúvida, estamos à disposição. \n\nAtenciosamente, Saúde Conectada MA`
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
        res.status(200).json({ mensagem: 'Triagem registrada com sucesso' });
      }
    });
  });
  return router;
};