import { createClient } from '@supabase/supabase-js'

// 替换为你的 Supabase URL 和 API 密钥
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://app-id.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94bnJseGtha2ZwcmxkYWJzcmZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwODQ3NjksImV4cCI6MjA2NDY2MDc2OX0.6usrA4bDRYFK0xGUE6ua51d4_hvrk7uVfzSPvXOW89s'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)