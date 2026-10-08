import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://avlsdxadsozcfhdjejsu.supabase.co";

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2bHNkeGFkc296Y2ZoZGplanN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzMDM0MTUsImV4cCI6MjEwNjg3OTQxNX0.TXB9X_TcMYxj6QRn5gaXtP-7FUr9bSFEZrU4OBcqf9Q";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);