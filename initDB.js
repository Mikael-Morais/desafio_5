import { connect } from './database.js';
import { readFile } from 'fs/promises';

async function initDatabase() {
  try {
    const db = await connect();
    const schema = await readFile('./src/database/schema.sql', 'utf-8');
    await db.exec(schema);
    console.log('✅ Banco de dados inicializado com sucesso.');
    await db.close();
  } catch (error) {
    console.error('❌ Erro ao inicializar o banco:', error);
  }
}

initDatabase();
