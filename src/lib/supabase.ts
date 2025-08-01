import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://your-project.supabase.co'
const supabaseKey = 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database types
export interface Profile {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  user_id: string
  amount: number
  description: string
  category: string
  type: 'income' | 'expense'
  date: string
  created_at: string
  updated_at: string
}

export interface Budget {
  id: string
  user_id: string
  category: string
  amount: number
  spent: number
  period: 'weekly' | 'monthly' | 'yearly'
  start_date: string
  end_date: string
  created_at: string
  updated_at: string
}

export interface Goal {
  id: string
  user_id: string
  title: string
  description?: string
  target_amount: number
  current_amount: number
  target_date: string
  created_at: string
  updated_at: string
}