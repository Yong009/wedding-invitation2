import pkg from 'pg';
import fs from 'fs';
const { Client } = pkg;

const connectionString = 'postgresql://postgres:ekfkawnl12!@db.cxhdeyptqvypvkyighlk.supabase.co:5432/postgres';

const logFile = 'setup_db.log';

async function createTable() {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    fs.appendFileSync(logFile, 'Connected to database\n');

    const sql = `
      -- Create messages table
      CREATE TABLE IF NOT EXISTS messages (
        id bigint primary key generated always as identity,
        name text not null,
        msg text not null,
        created_at timestamptz default now()
      );

      -- Enable RLS
      ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_policies WHERE tablename = 'messages' AND policyname = 'Allow public select'
        ) THEN
          CREATE POLICY "Allow public select" ON messages FOR SELECT USING (true);
        END IF;
      END
      $$;

      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_policies WHERE tablename = 'messages' AND policyname = 'Allow public insert'
        ) THEN
          CREATE POLICY "Allow public insert" ON messages FOR INSERT WITH CHECK (true);
        END IF;
      END
      $$;
    `;

    await client.query(sql);
    fs.appendFileSync(logFile, 'Table "messages" and policies created successfully!\n');
  } catch (err) {
    fs.appendFileSync(logFile, 'Error: ' + err.message + '\n');
  } finally {
    await client.end();
  }
}

createTable();
