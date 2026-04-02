import { supabase } from '../lib/supabaseClient';

export const settingsApi = {
  async get() {
    const { data, error } = await supabase
      .from('store_settings')
      .select('value')
      .eq('key', 'general')
      .single();

    if (error) {
      console.error('Error fetching settings:', error);
      return {};
    }
    return data?.value || {};
  },

  async update(updates) {
    const current = await this.get();
    const updated = { ...current, ...updates };

    const { data, error } = await supabase
      .from('store_settings')
      .upsert({ key: 'general', value: updated })
      .select()
      .single();

    if (error) {
      console.error('Error updating settings:', error);
      return updated;
    }
    return data?.value || updated;
  }
};
