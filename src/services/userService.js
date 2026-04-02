import { supabase } from '../lib/supabaseClient';

export const userApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching users/profiles:', error);
      return [];
    }
    
    return (data || []).map(p => ({
      ...p,
      name: p.full_name,
    }));
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;

    return {
      ...data,
      name: data.full_name,
    };
  },

  async update(id, updates) {
    const payload = {};
    if (updates.name !== undefined) payload.full_name = updates.name;
    if (updates.role !== undefined) payload.role = updates.role;
    if (updates.active !== undefined) payload.active = updates.active;

    const { data, error } = await supabase
      .from('profiles')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating user/profile:', error);
      return null;
    }
    return { ...data, name: data.full_name };
  }
};
