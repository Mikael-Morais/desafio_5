import dotenv from 'dotenv';
dotenv.config();

const SECRET = process.env.JWT_SECRET;

import jwt from 'jsonwebtoken';

export function verifyJWT(req, res, next) {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).json({ auth: false, message: 'Token não fornecido' });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ auth: false, message: 'Falha na autenticação do token' });
    }

    req.userId = decoded.userId;
    next();
  });
}
