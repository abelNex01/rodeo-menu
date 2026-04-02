import { supabase } from '../lib/supabaseClient';

export const waiterApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('waiter_calls')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching waiter calls:', error);
      return [];
    }
    return data || [];
  },

  async create(tableNumber, message = '') {
    const { data, error } = await supabase
      .from('waiter_calls')
      .insert([{
        table_number: tableNumber,
        message,
        status: 'pending'
      }])
      .select()
      .single();

    if (error) {
      console.error('Error triggering waiter call:', error);
      return null;
    }
    return data;
  },

  async resolveCall(id) {
    const { data, error } = await supabase
      .from('waiter_calls')
      .update({ status: 'resolved' })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error resolving waiter call:', error);
      return null;
    }
    return data;
  }
};
