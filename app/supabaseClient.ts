import { createClient } from '@supabase/supabase-js';

// Absolute fallbacks to prevent empty network buffers during runtime compilation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("⚠️ [SUPABASE CORE WARNING]: Credentials missing inside current node execution context. Verify your .env.local keys.");
}

// Global instance setup for live cloud synchronization with fetch settings overrides
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    headers: { 'X-Client-Info': 'darksyon-portal-admin' },
  },
});