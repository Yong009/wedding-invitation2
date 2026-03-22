import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// SQLite Database Setup
const db = new Database(join(__dirname, 'messages.db'));

// Initialize table
db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    msg TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// API Endpoints
app.get('/api/messages', (req, res) => {
  const messages = db.prepare('SELECT * FROM messages ORDER BY created_at DESC').all();
  res.json(messages);
});

app.post('/api/messages', (req, res) => {
  const { name, msg } = req.body;
  if (!name || !msg) {
    return res.status(400).json({ error: 'Name and message are required' });
  }
  const info = db.prepare('INSERT INTO messages (name, msg) VALUES (?, ?)').run(name, msg);
  res.json({ id: info.lastInsertRowid, name, msg, created_at: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
