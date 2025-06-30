import dotenv from 'dotenv';
dotenv.config();

const SECRET = process.env.JWT_SECRET;

import express from 'express';
import { connect } from '../../../database.js';
import { verifyJWT } from '../../middleware/auth.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// rota protegida
router.get('/clientes', verifyJWT, async (req, res) => {
  const db = await connect();
  const users = await db.all('SELECT id, name FROM users');
  res.json(users);
});

// login
router.post('/login', async (req, res) => {
  const { user, password } = req.body;

  try {
    const db = await connect();
    // Busca pelo username (não pelo name)
    const foundUser = await db.get('SELECT * FROM users WHERE username = ?', [user]);

    if (!foundUser || foundUser.password !== password) {
      return res.status(401).json({ auth: false, message: 'Usuário ou senha inválidos' });
    }

    const token = jwt.sign({ userId: foundUser.id }, SECRET, {
      expiresIn: 300 // 5 minutos
    });


    res.json({ auth: true, token, usuario_id: foundUser.id, name: foundUser.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ auth: false, message: 'Erro no servidor' });
  }
});

// Cadastro de novo usuário
router.post('/register', async (req, res) => {
  const { name, email, username, cpf, password, nascimento } = req.body;
  if (!name || !email || !username || !cpf || !password || !nascimento) {
    return res.status(400).json({ success: false, message: 'Preencha todos os campos.' });
  }
  try {
    const db = await connect();
    // Verifica se já existe usuário com mesmo username ou email
    const exists = await db.get('SELECT * FROM users WHERE name = ? OR email = ? OR username = ?', [name, email, username]);
    if (exists) {
      return res.status(409).json({ success: false, message: 'Usuário já cadastrado.' });
    }
    await db.run(
      'INSERT INTO users (name, email, username, cpf, password, nascimento) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, username, cpf, password, nascimento]
    );
    res.json({ success: true, message: 'Usuário cadastrado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Erro no servidor.' });
  }
});

router.get('/dev/users', async (req, res) => {
  try {
    const db = await connect();
    const users = await db.all('SELECT id, name, email, username, cpf, nascimento FROM users');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Erro ao buscar usuários.' });
  }
});

export default router;
