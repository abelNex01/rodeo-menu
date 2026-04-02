import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, ShoppingBag, TrendingUp, Award } from 'lucide-react';
import { useOrders, useMenu } from '../../context/AppContext';

// Simple bar chart component (CSS-based)
function BarChart({ data, maxValue }) {
  return (
    <div className="flex items-end gap-2 h-40">
      {data.map((item, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(item.value / maxValue) * 100}%` }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="w-full bg-gradient-to-t from-amber-400 to-orange-500 rounded-t-lg min-h-[4px] opacity-90"
          />
          <span className="text-[10px] text-gray-500 truncate max-w-full">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function Analytics() {
  const { orders } = useOrders();
  const { menuItems } = useMenu();

  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((s, o) => s + (o.total || 0), 0);
    const completedOrders = orders.filter(o => o.status === 'completed').length;
    const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

    // Top selling items
    const itemCounts = {};
    orders.forEach(o => {
      o.items?.forEach(item => {
        itemCounts[item.name] = (itemCounts[item.name] || 0) + item.qty;
      });
    });
    const topItems = Object.entries(itemCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    // Revenue by day (mock for 7 days)
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dailyRevenue = days.map((label, i) => ({
      label,
      value: Math.round((totalRevenue / 7) * (0.5 + Math.random()) * 100) / 100,
    }));

    return { totalRevenue, completedOrders, avgOrderValue, topItems, dailyRevenue, totalOrders: orders.length };
  }, [orders]);

  const kpis = [
    { icon: DollarSign, label: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, color: 'text-green-600 bg-green-50' },
    { icon: ShoppingBag, label: 'Total Orders', value: stats.totalOrders, color: 'text-blue-600 bg-blue-50' },
    { icon: TrendingUp, label: 'Avg Order Value', value: `$${stats.avgOrderValue.toFixed(2)}`, color: 'text-purple-600 bg-purple-50' },
    { icon: Award, label: 'Completed', value: stats.completedOrders, color: 'text-brand-500 bg-amber-50' },
  ];

  const maxDaily = Math.max(...stats.dailyRevenue.map(d => d.value), 1);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)]"
          >
            <div className={`w-10 h-10 rounded-xl ${kpi.color} flex items-center justify-center mb-3`}>
              <kpi.icon className="w-5 h-5" />
            </div>
            <p className="text-gray-500 text-sm">{kpi.label}</p>
            <p className="text-gray-900 text-2xl font-bold mt-1">{kpi.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Revenue chart */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)]">
          <h3 className="text-gray-900 font-semibold mb-4">Weekly Revenue</h3>
          <BarChart data={stats.dailyRevenue} maxValue={maxDaily} />
        </div>

        {/* Top selling */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)]">
          <h3 className="text-gray-900 font-semibold mb-4">Top Selling Items</h3>
          {stats.topItems.length === 0 ? (
            <p className="text-gray-400 text-sm">No order data yet</p>
          ) : (
            <div className ="space-y-3">
              {stats.topItems.map((item, i) => (
                <div key={item.name} className="flex items-center gap-3">
                  <span className="text-brand-500 font-bold text-sm w-6">#{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 text-sm truncate">{item.name}</p>
                    <div className="mt-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.count / (stats.topItems[0]?.count || 1)) * 100}%` }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                      />
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm shrink-0">{item.count} sold</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
