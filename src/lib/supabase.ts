import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vichgewghqwxvmuxlmfn.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpY2hnZXdnaHF3eHZtdXhsbWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MjUyMTAsImV4cCI6MjA3ODIwMTIxMH0.U85CwG6RlGdeNIhPhAz4eOFUG9fZlFdcva_7RuLAvcQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

