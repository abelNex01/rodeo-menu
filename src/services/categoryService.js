import { supabase } from '../lib/supabaseClient';

export const categoryApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: true });
      
    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
    return data || [];
  },

  async create(category) {
    const { data, error } = await supabase
      .from('categories')
      .insert([category])
      .select()
      .single();
      
    if (error) {
      console.error('Error creating category:', error);
      return null;
    }
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating category:', error);
      return null;
    }
    return data;
  },

  async delete(id) {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting category:', error);
      return false;
    }
    return true;
  }
};
