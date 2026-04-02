import { supabase } from '../lib/supabaseClient';
import { generateUid } from '../utils/formatters';

export const menuApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching menu items:', error);
      return [];
    }
    // Rename and transform columns to match frontend expectations
    return (data || []).map(item => ({
      ...item,
      category: item.category_id,
      img: item.image_url,
      desc: item.description
    }));
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error || !data) return null;
    
    return {
      ...data,
      category: data.category_id,
      img: data.image_url,
      desc: data.description
    };
  },

  async create(item) {
    const payload = {
      id: item.id || generateUid(),
      name: item.name,
      description: item.desc,
      category_id: item.category,
      price: item.price,
      image_url: item.img,
      available: item.available !== undefined ? item.available : true,
      featured: item.featured || false,
      rating: parseFloat((Math.random() + 4).toFixed(1)) // mock rating for new items
    };

    const { data, error } = await supabase
      .from('menu_items')
      .insert([payload])
      .select()
      .single();
      
    if (error) {
      console.error('Error creating menu item:', error);
      return null;
    }
    
    return {
      ...data,
      category: data.category_id,
      img: data.image_url,
      desc: data.description
    };
  },

  async update(id, updates) {
    const payload = {};
    if (updates.name !== undefined) payload.name = updates.name;
    if (updates.desc !== undefined) payload.description = updates.desc;
    if (updates.category !== undefined) payload.category_id = updates.category;
    if (updates.price !== undefined) payload.price = updates.price;
    if (updates.img !== undefined) payload.image_url = updates.img;
    if (updates.available !== undefined) payload.available = updates.available;

    const { data, error } = await supabase
      .from('menu_items')
      .update(payload)
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating menu item:', error);
      return null;
    }
    
    return {
      ...data,
      category: data.category_id,
      img: data.image_url,
      desc: data.description
    };
  },

  async delete(id) {
    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting menu item:', error);
      return false;
    }
    return true;
  }
};
