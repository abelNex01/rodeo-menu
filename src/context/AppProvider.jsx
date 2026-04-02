import { useReducer, useState, useCallback, useMemo, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { authService } from '../services/authService';
import { menuApi } from '../services/menuService';
import { categoryApi } from '../services/categoryService';
import { orderApi } from '../services/orderService';
import {
  AuthContext,
  CartContext,
  OrdersContext,
  MenuContext,
  NotificationContext,
} from './AppContext';
import { STORAGE_KEYS, DISCOUNT_THRESHOLD, DISCOUNT_RATE } from '../constants';

// ──── Cart Reducer ────
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find(item => item.id === action.payload.id || item.menuId === action.payload.id);
      if (existing) {
        return state.map(item =>
          (item.id === action.payload.id || item.menuId === action.payload.id)
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, menuId: action.payload.id, qty: 1 }];
    }
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload && item.menuId !== action.payload);
    case 'UPDATE_QTY': {
      const { id, qty } = action.payload;
      if (qty <= 0) return state.filter(item => item.id !== id && item.menuId !== action.payload);
      return state.map(item =>
        (item.id === id || item.menuId === id) ? { ...item, qty } : item
      );
    }
    case 'CLEAR':
      return [];
    default:
      return state;
  }
};

let notifId = 0;

export default function AppProvider({ children }) {
  // ──── Auth State ────
  const [user, setUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEYS.AUTH_USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    // Hydrate user session on mount
    authService.getCurrentUser().then(curUser => {
      if (curUser) {
        setUser(curUser);
        sessionStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(curUser));
      }
    });

    // Supabase Auth Listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        const curUser = await authService.getCurrentUser();
        if (curUser) {
          setUser(curUser);
          sessionStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(curUser));
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        sessionStorage.removeItem(STORAGE_KEYS.AUTH_USER);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const login = useCallback(async (email, password) => {
    const result = await authService.authenticate(email, password);
    if (result) {
      setUser(result);
      sessionStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(result));
    }
    return result; // True if success, null if failed
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    sessionStorage.removeItem(STORAGE_KEYS.AUTH_USER);
  }, []);

  const authValue = useMemo(() => ({
    user,
    isAdmin: user?.role === 'admin' || user?.role === 'manager',
    isAuthenticated: !!user,
    login,
    logout,
  }), [user, login, logout]);


  // ──── Cart State ────
  const [cart, cartDispatch] = useReducer(cartReducer, []);
  
  const addItem = useCallback((item) => cartDispatch({ type: 'ADD_ITEM', payload: item }), []);
  const removeItem = useCallback((id) => cartDispatch({ type: 'REMOVE_ITEM', payload: id }), []);
  const updateQty = useCallback((id, qty) => cartDispatch({ type: 'UPDATE_QTY', payload: { id, qty } }), []);
  const clearCart = useCallback(() => cartDispatch({ type: 'CLEAR' }), []);

  const cartTotals = useMemo(() => {
    const taxRate = 7.5 / 100; // Will use static standard for now, but could be DB driven
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const discount = subtotal > DISCOUNT_THRESHOLD ? subtotal * DISCOUNT_RATE : 0;
    const tax = (subtotal - discount) * taxRate;
    const total = subtotal - discount + tax;
    return {
      subtotal: Math.round(subtotal * 100) / 100,
      discount: Math.round(discount * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      total: Math.round(total * 100) / 100,
    };
  }, [cart]);

  const cartValue = useMemo(() => ({
    items: cart,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    totals: cartTotals,
    count: cart.reduce((sum, item) => sum + item.qty, 0),
  }), [cart, addItem, removeItem, updateQty, clearCart, cartTotals]);


  // ──── Orders State ────
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    orderApi.getAll().then(data => setOrders(data));

    const channel = supabase.channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        (payload) => {
          orderApi.getAll().then(data => setOrders(data));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const createOrder = useCallback(async (orderData) => {
    const newOrder = await orderApi.create(orderData);
    setOrders(await orderApi.getAll());
    return newOrder;
  }, []);

  const updateOrderStatus = useCallback(async (id, status) => {
    await orderApi.updateStatus(id, status);
    setOrders(await orderApi.getAll());
  }, []);

  const refreshOrders = useCallback(async () => {
    setOrders(await orderApi.getAll());
  }, []);

  const ordersValue = useMemo(() => ({
    orders,
    createOrder,
    updateOrderStatus,
    refreshOrders,
  }), [orders, createOrder, updateOrderStatus, refreshOrders]);


  // ──── Menu State ────
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const refreshMenu = useCallback(async () => {
    const [items, cats] = await Promise.all([
      menuApi.getAll(),
      categoryApi.getAll()
    ]);
    setMenuItems(items);
    setCategories(cats);
  }, []);

  useEffect(() => {
    refreshMenu();
    
    // Realtime subscriptions for both tables
    const menuChannel = supabase.channel('menu-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'menu_items' }, () => refreshMenu())
      .subscribe();

    const catChannel = supabase.channel('category-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, () => refreshMenu())
      .subscribe();

    return () => {
      supabase.removeChannel(menuChannel);
      supabase.removeChannel(catChannel);
    };
  }, [refreshMenu]);

  const menuValue = useMemo(() => ({
    menuItems,
    categories,
    refreshMenu,
    createItem: async (item) => { const r = await menuApi.create(item); refreshMenu(); return r; },
    updateItem: async (id, u) => { const r = await menuApi.update(id, u); refreshMenu(); return r; },
    deleteItem: async (id) => { const r = await menuApi.delete(id); refreshMenu(); return r; },
  }), [menuItems, categories, refreshMenu]);


  // ──── Notifications State ────
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = 'success', duration = 3000) => {
    const id = ++notifId;
    setNotifications(prev => [...prev, { id, message, type }]);
    if (duration > 0) {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, duration);
    }
    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const notifValue = useMemo(() => ({
    notifications,
    addNotification,
    removeNotification,
    success: (msg) => addNotification(msg, 'success'),
    error: (msg) => addNotification(msg, 'error'),
    info: (msg) => addNotification(msg, 'info'),
  }), [notifications, addNotification, removeNotification]);

  return (
    <AuthContext.Provider value={authValue}>
      <CartContext.Provider value={cartValue}>
        <OrdersContext.Provider value={ordersValue}>
          <MenuContext.Provider value={menuValue}>
            <NotificationContext.Provider value={notifValue}>
              {children}
            </NotificationContext.Provider>
          </MenuContext.Provider>
        </OrdersContext.Provider>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}
