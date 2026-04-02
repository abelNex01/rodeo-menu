import { createContext, useContext } from 'react';

// ──── Auth Context ────
export const AuthContext = createContext(null);
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AppProvider');
  return ctx;
};

// ──── Cart Context ────
export const CartContext = createContext(null);
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within AppProvider');
  return ctx;
};

// ──── Orders Context ────
export const OrdersContext = createContext(null);
export const useOrders = () => {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used within AppProvider');
  return ctx;
};

// ──── Menu Context ────
export const MenuContext = createContext(null);
export const useMenu = () => {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error('useMenu must be used within AppProvider');
  return ctx;
};

// ──── Notification Context ────
export const NotificationContext = createContext(null);
export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used within AppProvider');
  return ctx;
};
