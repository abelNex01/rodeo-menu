import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package } from 'lucide-react';
import { useOrders, useNotification } from '../../context/AppContext';
import { STATUS_COLORS_SIMPLE, STATUS_OPTIONS } from '../../constants';

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, updateOrderStatus } = useOrders();
  const { success } = useNotification();

  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="p-6 flex flex-col items-center justify-center py-20 text-gray-400">
        <Package className="w-12 h-12 mb-3 opacity-30" />
        <p>Order not found</p>
        <button onClick={() => navigate('/admin/orders')} className="text-brand-500 mt-2 text-sm hover:underline">
          Back to orders
        </button>
      </div>
    );
  }

  const handleStatusChange = (status) => {
    updateOrderStatus(order.id, status);
    success(`Order status updated to ${status}`);
  };

  return (
    <div className="p-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/admin/orders')}
          className="p-2 text-gray-400 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition-colors"
          aria-label="Back to orders"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{order.id}</h1>
          <p className="text-gray-400 text-sm">{new Date(order.createdAt).toLocaleString()}</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Status + Customer */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-500 text-sm mb-1">Status</p>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${STATUS_COLORS_SIMPLE[order.status]}`}>
                {order.status}
              </span>
            </div>
            <select
              value={order.status}
              onChange={e => handleStatusChange(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-brand-500 shadow-sm"
              aria-label="Change order status"
            >
              {STATUS_OPTIONS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-gray-500 text-sm mb-1">Customer</p>
            <p className="text-gray-900 font-medium">{order.customer?.name || 'Walk-in'}</p>
            {order.customer?.phone && <p className="text-gray-400 text-sm">{order.customer.phone}</p>}
          </div>
        </div>

        {/* Items */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)]">
          <h3 className="text-gray-900 font-semibold mb-3">Items ({order.items?.length || 0})</h3>
          <div className="space-y-3">
            {order.items?.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-gray-900 text-sm">{item.name}</p>
                  <p className="text-gray-400 text-xs">Qty: {item.qty} × ${item.price.toFixed(2)}</p>
                </div>
                <span className="text-brand-500 font-semibold text-sm">
                  ${(item.qty * item.price).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)]">
          <h3 className="text-gray-900 font-semibold mb-3">Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span className="text-gray-900">${order.subtotal?.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-gray-500">
                <span>Discount</span>
                <span className="text-green-600">-${order.discount?.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-500">
              <span>Tax</span>
              <span className="text-gray-900">${order.tax?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-100">
              <span className="text-gray-900 font-bold text-base">Total</span>
              <span className="text-gray-900 font-bold text-base">${order.total?.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
