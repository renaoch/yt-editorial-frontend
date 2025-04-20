// lib/supabaseClient.js

import { createClient } from "@supabase/supabase-js";

// Replace these with your own Supabase project details
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL; // or 'https://your-project.supabase.co'
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY; // or 'your-public-anon-key'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
