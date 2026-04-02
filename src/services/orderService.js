import { supabase } from '../lib/supabaseClient';
import { generateUid } from '../utils/formatters';

export const orderApi = {
  async getAll() {
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items (
          menu_item_id,
          name,
          quantity,
          price
        )
      `)
      .order('created_at', { ascending: false });

    if (ordersError) {
      console.error('Error fetching orders:', ordersError);
      return [];
    }

    // Map order_items to items array for frontend compatibility
    return (orders || []).map(order => ({
      ...order,
      customer: {
        name: order.customer_name,
        phone: order.customer_phone
      },
      items: order.items.map(i => ({
        menuId: i.menu_item_id,
        name: i.name,
        qty: i.quantity,
        price: i.price
      }))
    }));
  },

  async getById(id) {
    const { data: order, error } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items (
          menu_item_id,
          name,
          quantity,
          price
        )
      `)
      .eq('id', id)
      .single();

    if (error || !order) return null;

    return {
      ...order,
      customer: {
        name: order.customer_name,
        phone: order.customer_phone
      },
      items: order.items.map(i => ({
        menuId: i.menu_item_id,
        name: i.name,
        qty: i.quantity,
        price: i.price
      }))
    };
  },

  async create(orderData) {
    const orderId = orderData.id || `order-${generateUid()}`;
    
    // 1. Create the main order record
    const { error: orderError } = await supabase
      .from('orders')
      .insert([{
        id: orderId,
        customer_name: orderData.customer?.name || 'Guest',
        customer_phone: orderData.customer?.phone || '',
        table_number: orderData.tableNumber || '',
        subtotal: orderData.subtotal,
        tax: orderData.tax,
        discount: orderData.discount || 0,
        total: orderData.total,
        payment_method: orderData.paymentMethod || 'card',
        status: 'pending',
        notes: orderData.notes || ''
      }]);

    if (orderError) {
      console.error('Error creating order:', orderError);
      throw orderError;
    }

    // 2. Create the associated line items
    const orderItems = orderData.items.map(item => ({
      order_id: orderId,
      menu_item_id: item.menuId || item.id,
      name: item.name,
      quantity: item.qty,
      price: item.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Error inserting order items:', itemsError);
    }

    return this.getById(orderId);
  },

  async updateStatus(id, status) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating order status:', error);
      return null;
    }
    return data;
  },

  async delete(id) {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting order:', error);
      return false;
    }
    return true;
  }
};
