import { supabase } from '../lib/supabaseClient';

export const analyticsApi = {
  async getDashboardStats() {
    // Note: A real implementation might use an RPC call or complex SQL view
    // For this migration, we fetch orders and aggregate to maintain parity.

    const { data: orders, error } = await supabase
      .from('orders')
      .select('*');

    if (error) {
      console.error('Error fetching analytics orders:', error);
      return null;
    }

    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const completedOrders = orders.filter(o => o.status === 'completed').length;
    
    const totalRevenue = orders
      .filter(o => o.status === 'completed')
      .reduce((sum, order) => sum + (Number(order.total) || 0), 0);

    const averageOrderValue = totalOrders > 0 
      ? totalRevenue / completedOrders 
      : 0;

    return {
      totalRevenue,
      totalOrders,
      averageOrderValue,
      pendingOrders,
      completedOrders,
    };
  }
};
