import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronRight, Package } from 'lucide-react';
import { useOrders, useNotification } from '../../context/AppContext';
import { STATUS_COLORS, STATUS_OPTIONS, ORDER_TABS } from '../../constants';

export default function Orders() {
  const navigate = useNavigate();
  const { orders, updateOrderStatus } = useOrders();
  const { success } = useNotification();
  const [activeTab, setActiveTab] = useState('all');

  const filtered = useMemo(() => {
    if (activeTab === 'all') return orders;
    return orders.filter(o => o.status === activeTab);
  }, [orders, activeTab]);

  const handleStatusChange = (e, orderId) => {
    e.stopPropagation();
    const newStatus = e.target.value;
    updateOrderStatus(orderId, newStatus);
    success(`Order status updated to ${newStatus}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Orders</h1>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto admin-scrollbar pb-2">
        {ORDER_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-brand-500 text-white shadow-sm'
                : 'bg-white text-gray-500 hover:text-gray-900 border border-gray-200 shadow-sm'
            }`}
          >
            {tab.label}
            {tab.id !== 'all' && (
              <span className="ml-1.5 text-xs opacity-60">
                ({orders.filter(o => o.status === tab.id).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Orders list */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center py-16 text-gray-400"
            >
              <Package className="w-12 h-12 mb-3 opacity-30" />
              <p>No orders found</p>
            </motion.div>
          ) : (
            filtered.map((order) => (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                onClick={() => navigate(`/admin/orders/${order.id}`)}
                className="bg-white rounded-2xl border border-gray-100 p-4 cursor-pointer hover:bg-gray-50 transition-colors shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-gray-900 font-semibold">{order.id}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_COLORS[order.status]}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm">
                      {order.customer?.name || 'Walk-in'} · {order.items?.length || 0} items
                    </p>
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-1">
                      <Clock className="w-3 h-3" />
                      {new Date(order.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-gray-900 font-bold">${order.total?.toFixed(2)}</span>
                    {/* Status change dropdown */}
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(e, order.id)}
                      onClick={e => e.stopPropagation()}
                      className="bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-600 focus:outline-none focus:border-brand-500 shadow-sm"
                      aria-label={`Change status for order ${order.id}`}
                    >
                      {STATUS_OPTIONS.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
