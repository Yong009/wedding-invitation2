import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  console.log('Connecting to:', supabaseUrl)
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .limit(1)

    if (error) {
      if (error.code === 'PGRST116') {
        console.log('Connected, but "messages" table does not exist or is empty.')
      } else {
        console.error('Error connecting to Supabase:', error.message)
      }
    } else {
      console.log('Successfully connected! Found data:', data)
    }
  } catch (err) {
    console.error('Unexpected error:', err)
  }
}

testConnection()
