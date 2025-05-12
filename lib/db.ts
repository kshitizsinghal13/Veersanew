import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

let db: any = null

async function openDb() {
  if (!db) {
    db = await open({
      filename: './healthcare.db',
      driver: sqlite3.Database
    })

    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS appointments (
        id TEXT PRIMARY KEY,
        patient_id TEXT NOT NULL,
        doctor_id TEXT NOT NULL,
        date DATETIME NOT NULL,
        status TEXT NOT NULL,
        payment_status TEXT NOT NULL,
        payment_id TEXT,
        amount INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (patient_id) REFERENCES users (id),
        FOREIGN KEY (doctor_id) REFERENCES users (id)
      );

      CREATE TABLE IF NOT EXISTS doctor_profiles (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        specialty TEXT NOT NULL,
        experience INTEGER NOT NULL,
        consultation_fee INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      );
    `)
  }
  return db
}

export async function getDb() {
  return await openDb()
}