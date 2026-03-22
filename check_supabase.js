import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkTable() {
  const { data, error } = await supabase.from('messages').select('*').limit(1);
  if (error) {
    console.log('Error (likely table does not exist):', error.message);
  } else {
    console.log('Successfully connected to "messages" table!');
  }
}

checkTable();
