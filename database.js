import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function connect() {
  return open({
    filename: './src/database/triagem.db',
    driver: sqlite3.Database
  });
}
