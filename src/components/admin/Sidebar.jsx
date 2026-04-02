import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  LayoutGrid,
  ClipboardList,
  Bell,
  Clock,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AppContext';
import rodeomini from '../../assets/rodeomini.png';

const navItems = [
  { icon: ClipboardList, label: 'Dashboard', path: '/admin' },
  { icon: Bell, label: 'Notification', path: '/admin/analytics' },
  { icon: Clock, label: 'Users', path: '/admin/users' },
  { icon: Settings, label: 'Setting', path: '/admin/settings' },
];

const bottomItems = [
  { icon: HelpCircle, label: 'Help', path: '/admin/settings' },
];

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  const handleNav = (path) => {
    navigate(path);
    onClose?.();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
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
          fixed lg:static inset-y-0 left-0 z-50
          w-[200px] bg-white border-r border-gray-100 flex flex-col shadow-sm
          transform transition-transform duration-300 lg:transform-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        role="navigation"
        aria-label="Admin navigation"
      >
        {/* Logo */}
        <div className="flex items-center justify-center py-6 px-4">
          <img
            src={rodeomini}
            alt="Rodeo Logo"
            className="h-[70px] w-auto object-contain"
          />
        </div>

        {/* Main nav */}
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                  transition-all duration-200 relative group
                  ${active
                    ? 'text-brand-500 bg-brand-500/10'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
                aria-current={active ? 'page' : undefined}
              >
                {/* Active indicator */}
                {active && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-brand-500 rounded-r-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon className="w-5 h-5 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom nav */}
        <div className="px-3 pb-6 space-y-1">
          {bottomItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNav(item.path)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span>{item.label}</span>
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
