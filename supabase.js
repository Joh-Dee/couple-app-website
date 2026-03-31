// supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/esm/wrapper.mjs';

// ============================================
//  Supabase Configuration
// ============================================
const SUPABASE_URL = 'https://wcnsmyotznxovwewupnm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjbnNteW90em54b3Z3ZXd1cG5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5NjgyNjMsImV4cCI6MjA5MDU0NDI2M30.20QCNkO_aLCwkfU_X5RzrYfT26k9lCTPN5Ox_18';
// ============================================

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

// Get couple info by couple_id
export async function getCoupleInfo(coupleId) {
    const { data: couple } = await supabase
        .from('couples')
        .select('*')
        .eq('id', coupleId)
        .single();
    
    return couple;
}

// Get partner profile
export async function getPartnerProfile(coupleId, currentUserId) {
    const { data: partner } = await supabase
        .from('profiles')
        .select('*')
        .eq('couple_id', coupleId)
        .neq('id', currentUserId)
        .single();
    
    return partner;
}

// Logout function
export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
        window.location.href = 'index.html';
    }
    return error;
}
