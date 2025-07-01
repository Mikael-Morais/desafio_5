import { connect } from './database.js';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initDatabase() {
  try {
    const db = await connect();
    const schemaPath = path.resolve(__dirname, '../database/schema.sql');
    const schema = await readFile(schemaPath, 'utf-8');
    await db.exec(schema);
    console.log('✅ Banco de dados inicializado com sucesso.');
    await db.close();
  } catch (error) {
    console.error('❌ Erro ao inicializar o banco:', error);
  }
}

initDatabase();
