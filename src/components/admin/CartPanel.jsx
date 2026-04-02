import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart, useOrders, useNotification } from '../../context/AppContext';

export default function CartPanel({ isOpen, onClose }) {
  const { items, updateQty, removeItem, clearCart, totals, count } = useCart();
  const { createOrder } = useOrders();
  const { success } = useNotification();

  const handleCheckout = () => {
    if (items.length === 0) return;

    const order = {
      items: items.map(item => ({
        menuId: item.id,
        name: item.name,
        qty: item.qty,
        price: item.price,
      })),
      subtotal: totals.subtotal,
      discount: totals.discount,
      tax: totals.tax,
      total: totals.total,
      customer: { id: 'cus-admin', name: 'Walk-in', phone: '' },
    };

    createOrder(order);
    clearCart();
    success('Order created successfully!');
  };

  const handleRemove = (item) => {
    removeItem(item.id);
    success(`${item.name} removed from order`);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 right-0 z-50
          w-[300px] bg-white border-l border-gray-100 shadow-sm
          flex flex-col
          transform transition-transform duration-300 lg:transform-none
          ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}
        role="complementary"
        aria-label="Current order"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            Current Order
            {count > 0 && (
              <span className="bg-brand-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {count}
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 transition-colors lg:hidden"
            aria-label="Close order panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto admin-scrollbar p-4 space-y-3">
          <AnimatePresence mode="popLayout">
            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 text-gray-400"
              >
                <ShoppingBag className="w-12 h-12 mb-3 opacity-30" />
                <p className="text-sm">No items in order</p>
              </motion.div>
            ) : (
              items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-gray-50 rounded-xl p-3 flex items-center gap-3 border border-gray-100"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover shrink-0"
                    loading="lazy"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                    <p className="text-brand-500 font-semibold text-sm">${item.price.toFixed(2)}</p>
                  </div>

                  {/* Qty controls */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => item.qty <= 1 ? handleRemove(item) : updateQty(item.id, item.qty - 1)}
                      className="w-7 h-7 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors"
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-gray-900 text-sm font-medium w-4 text-center">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-7 h-7 rounded-lg bg-amber-50 text-brand-500 hover:bg-amber-100 flex items-center justify-center transition-colors"
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Checkout */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-5 space-y-3">
            <h3 className="text-lg font-bold text-gray-900">Check Out</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="text-gray-900">${totals.subtotal.toFixed(2)}</span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-gray-500">
                  <span>Discount Sales</span>
                  <span className="text-green-600">-${totals.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-500">
                <span>Total sales tax</span>
                <span className="text-gray-900">${totals.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-100">
                <span className="text-gray-900 font-bold text-base">Total</span>
                <span className="text-gray-900 font-bold text-base">${totals.total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 rounded-xl transition-colors mt-2"
            >
              Place Order
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
