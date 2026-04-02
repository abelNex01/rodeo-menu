import { supabase } from '../lib/supabaseClient';

export const authService = {
  async authenticate(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('SUPABASE LOGIN ERROR:', error.status, error.message);
      if (error.message.includes('Email not confirmed')) {
        console.warn('Check: Did you confirm your email or check "Auto-confirm user" in the dashboard?');
      }
      return null;
    }

    if (data.user) {
      // Fetch the role from the profiles table
      const { data: profileData } = await supabase
        .from('profiles')
        .select('role, full_name')
        .eq('id', data.user.id)
        .single();
        
      return {
        id: data.user.id,
        email: data.user.email,
        name: profileData?.full_name || 'Staff User',
        role: profileData?.role || 'staff'
      };
    }
    
    return null;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Logout error:', error.message);
  },

  async getCurrentUser() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;
    
    const { data: profileData } = await supabase
      .from('profiles')
      .select('role, full_name')
      .eq('id', session.user.id)
      .single();
      
    return {
      id: session.user.id,
      email: session.user.email,
      name: profileData?.full_name || 'Staff User',
      role: profileData?.role || 'staff'
    };
  }
};
