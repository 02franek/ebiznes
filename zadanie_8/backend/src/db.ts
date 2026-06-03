import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database(path.join(__dirname, "../database.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT,
    provider TEXT DEFAULT 'local',
    provider_id TEXT,
    oauth_token TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  ) 
`);

console.log("SQLite databse was successfully initialized.");

export default db;
