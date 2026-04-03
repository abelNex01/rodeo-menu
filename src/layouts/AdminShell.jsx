import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Menu, ShoppingCart } from 'lucide-react';
import Sidebar from '../components/admin/Sidebar';
import CartPanel from '../components/admin/CartPanel';
import ToastContainer from '../components/admin/ToastContainer';
import { useCart } from '../context/AppContext';

export default function AdminShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { count } = useCart();

  return (
    <div className="h-screen w-screen bg-[#f8f9fa] flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between p-2 bg-white border-b border-gray-100 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-500 hover:text-gray-900 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="text-gray-900 font-bold">Rodeo Admin</span>
          <button
            onClick={() => setCartOpen(true)}
            className="text-gray-500 hover:text-gray-900 transition-colors relative"
            aria-label="Open current order"
          >
            <ShoppingCart className="w-6 h-6" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto admin-scrollbar">
          <Outlet />
        </div>
      </main>

      {/* Cart panel */}
      <CartPanel isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
}
