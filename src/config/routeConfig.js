/**
 * Centralized route path constants.
 * Replaces hardcoded path strings across 15+ files.
 */
export const ROUTES = {
  HOME: '/',
  CATEGORIES: '/categories',
  MENU: '/menu',
  FOOD_DETAIL: '/food/:id',
  ORDERS: '/orders',
  PAYMENT: '/payment',
  ORDER_SUCCESS: '/order-success',
  SPECIALS: '/specials',
  LOGIN: '/login',

  ADMIN: {
    ROOT: '/admin',
    MENU: '/admin/menu',
    MENU_NEW: '/admin/menu/new',
    MENU_EDIT: '/admin/menu/:id/edit',
    ORDERS: '/admin/orders',
    ORDER_DETAIL: '/admin/orders/:id',
    USERS: '/admin/users',
    ANALYTICS: '/admin/analytics',
    SETTINGS: '/admin/settings',
  },
};
