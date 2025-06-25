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
    const foundUser = await db.get('SELECT * FROM users WHERE name = ?', [user]);

    if (!foundUser || foundUser.password !== password) {
      return res.status(401).json({ auth: false, message: 'Usuário ou senha inválidos' });
    }

    const token = jwt.sign({ userId: foundUser.id }, SECRET, {
      expiresIn: 300 // 5 minutos
    });

    res.json({ auth: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ auth: false, message: 'Erro no servidor' });
  }
});

export default router;
