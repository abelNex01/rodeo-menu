import { useState, useMemo } from 'react';
import { 
  Search, 
  TrendingUp, 
  Users as UsersIcon, 
  DollarSign, 
  Package, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Monitor
} from 'lucide-react';
import { useAuth, useOrders, useNotification } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { STATUS_COLORS, STATUS_OPTIONS } from '../../constants';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const { orders, updateOrderStatus } = useOrders();
  const { success } = useNotification();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  // Filtering orders for the live monitor (Pending/Preparing)
  const activeOrders = useMemo(() => {
    return orders.filter(o => 
      (o.status === 'pending' || o.status === 'preparing') &&
      (search.trim() === '' || 
       o.id.toLowerCase().includes(search.toLowerCase()) || 
       (o.customer?.name || '').toLowerCase().includes(search.toLowerCase()))
    ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [orders, search]);

  // Analytics Calculation
  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const todaysOrders = orders.filter(o => o.createdAt.startsWith(today));
    
    const revenue = todaysOrders.reduce((sum, o) => sum + (o.total || 0), 0);
    const pendingCount = orders.filter(o => o.status === 'pending').length;
    const activeCount = orders.filter(o => o.status === 'preparing').length;
    const completedToday = todaysOrders.filter(o => o.status === 'completed').length;

    return [
      { label: 'Today\'s Revenue', value: `${revenue.toFixed(0)} ETB`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
      { label: 'Pending Orders', value: pendingCount, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
      { label: 'Active Kitchen', value: activeCount, icon: Monitor, color: 'text-blue-600', bg: 'bg-blue-50' },
      { label: 'Completed Today', value: completedToday, icon: CheckCircle, color: 'text-brand-500', bg: 'bg-brand-50' },
    ];
  }, [orders]);

  const handleStatusUpdate = (e, orderId, nextStatus) => {
    e.stopPropagation();
    updateOrderStatus(orderId, nextStatus);
    success(`Order moved to ${nextStatus}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Command Center
          </h1>
          <p className="text-gray-500 font-medium">Monitoring & Order Fulfillment</p>
        </div>

        {/* Search Orders */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by Order ID or Customer..."
            className="w-full bg-white border border-gray-200 rounded-xl pl-4 pr-10 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all shadow-sm"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4"
          >
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Live Order Monitor */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <h2 className="text-xl font-bold text-gray-900 text-center">Live Order Monitor</h2>
            </div>
            <button 
              onClick={() => navigate('/admin/analytics')}
              className="text-sm font-bold text-brand-500 flex items-center gap-1 hover:underline"
            >
              Full Analytics <ArrowRight size={14} />
            </button>
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {activeOrders.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 py-20 flex flex-col items-center text-gray-400"
                >
                  <Package size={48} className="mb-4 opacity-20" />
                  <p className="font-medium">No active orders to fulfill</p>
                </motion.div>
              ) : (
                activeOrders.map((order) => (
                  <motion.div
                    key={order.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow group flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-bold text-gray-900">#{order.id.split('-').pop()}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${STATUS_COLORS[order.status]}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 font-medium">
                        {order.customer?.name || 'Table Guest'} · {order.items?.length || 0} Items
                      </p>
                      <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-2">
                        <Clock size={12} />
                        <span>{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {order.status === 'pending' && (
                        <button 
                          onClick={(e) => handleStatusUpdate(e, order.id, 'preparing')}
                          className="bg-brand-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-brand-500/20 hover:scale-105 transition-transform"
                        >
                          Accept Order
                        </button>
                      )}
                      {order.status === 'preparing' && (
                        <button 
                          onClick={(e) => handleStatusUpdate(e, order.id, 'completed')}
                          className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-green-600/20 hover:scale-105 transition-transform"
                        >
                          Mark Ready
                        </button>
                      )}
                      <button 
                        onClick={() => navigate(`/admin/orders/${order.id}`)}
                        className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
                      >
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Side Monitoring Panel */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-brand-500" />
                Performance Focus
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Order Accuracy</span>
                    <span className="font-bold text-brand-500">98%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500 w-[98%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Avg. Prep Time</span>
                    <span className="font-bold text-blue-400">12m</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400 w-[70%]" />
                  </div>
                </div>
              </div>
              <button 
                onClick={() => navigate('/admin/analytics')}
                className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-all border border-white/10"
              >
                View Detailed Reports
              </button>
            </div>
            {/* Background design */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-500/20 rounded-full blur-3xl" />
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
             <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Monitor size={20} className="text-blue-500" />
                System Health
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-2xl">
                  <p className="text-[10px] font-bold text-blue-400 uppercase">POS LINK</p>
                  <p className="font-bold text-blue-700">ONLINE</p>
                </div>
                <div className="p-3 bg-green-50 rounded-2xl">
                  <p className="text-[10px] font-bold text-green-400 uppercase">WIFI STATUS</p>
                  <p className="font-bold text-green-700">OPTIMAL</p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

