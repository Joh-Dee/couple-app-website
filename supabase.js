
// supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/esm/wrapper.mjs';

// ခင်ဗျားရဲ့ Supabase URL နဲ့ Anon Key ထည့်ပါ
const SUPABASE_URL = 'https://krqcytibuakcjcypyywu.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Check if user is logged in
export async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

// Get current user's profile with couple info
export async function getCurrentUserProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    
    const { data: profile } = await supabase
        .from('profiles')
        .select('*, couples(*)')
        .eq('id', user.id)
        .single();
    
    return profile;
}
