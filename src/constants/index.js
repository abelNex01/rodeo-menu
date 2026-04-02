/**
 * Centralized Constants
 *
 * Single source of truth for magic numbers, enums, and configuration
 * previously scattered across multiple files.
 */

// ──── Financial ────
export const TAX_RATE = 0.15; // 15% VAT
export const DISCOUNT_THRESHOLD = 50; // Subtotal above which discount applies
export const DISCOUNT_RATE = 0.1; // 10% discount
export const CURRENCY_LABEL = 'ETB';

// ──── Timing ────
export const WAITER_CALL_TIMEOUT = 5000; // ms
export const BANNER_INTERVAL = 5000; // ms

// ──── Order Statuses ────
export const ORDER_STATUS = {
  PENDING: 'pending',
  PREPARING: 'preparing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

export const STATUS_OPTIONS = [
  ORDER_STATUS.PENDING,
  ORDER_STATUS.PREPARING,
  ORDER_STATUS.COMPLETED,
  ORDER_STATUS.CANCELLED,
];

export const STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  [ORDER_STATUS.PREPARING]: 'bg-blue-50 text-blue-700 border-blue-200',
  [ORDER_STATUS.COMPLETED]: 'bg-green-50 text-green-700 border-green-200',
  [ORDER_STATUS.CANCELLED]: 'bg-red-50 text-red-700 border-red-200',
};

// Variant without border (used by OrderDetail)
export const STATUS_COLORS_SIMPLE = {
  [ORDER_STATUS.PENDING]: 'bg-yellow-50 text-yellow-700',
  [ORDER_STATUS.PREPARING]: 'bg-blue-50 text-blue-700',
  [ORDER_STATUS.COMPLETED]: 'bg-green-50 text-green-700',
  [ORDER_STATUS.CANCELLED]: 'bg-red-50 text-red-700',
};

// ──── Order Status Filter Tabs (Admin) ────
export const ORDER_TABS = [
  { id: 'all', label: 'All' },
  { id: ORDER_STATUS.PENDING, label: 'Pending' },
  { id: ORDER_STATUS.PREPARING, label: 'Preparing' },
  { id: ORDER_STATUS.COMPLETED, label: 'Completed' },
  { id: ORDER_STATUS.CANCELLED, label: 'Cancelled' },
];

// ──── LocalStorage Keys ────
export const STORAGE_KEYS = {
  MENU: 'rodeo_menu_items',
  CATEGORIES: 'rodeo_categories',
  ORDERS: 'rodeo_orders',
  USERS: 'rodeo_users',
  SETTINGS: 'rodeo_settings',
  AUTH_USER: 'rodeo_auth_user',
};

// ──── Tip Presets (Payment Page) ────
export const TIP_PRESETS = [
  { label: '50 ETB', value: 50 },
  { label: '100 ETB', value: 100 },
  { label: '200 ETB', value: 200 },
];

// ──── Bank Configuration (Payment Page) ────
import TeleBirrLogo from '../assets/payment/TeleBirr.svg';
import CBEBirrLogo from '../assets/payment/CBEBirr.svg';
import CBELogo from '../assets/payment/CommercialBankofEthiopia.svg';
import AwashLogo from '../assets/payment/AwashInternationalBank.svg';
import CoopLogo from '../assets/payment/CooperativeBankofOromia.svg';
import AbyssiniaLogo from '../assets/payment/BankOfAbyssinia.svg';

export const BANKS = [
  {
    id: 'cbe',
    name: 'CBE',
    logo: CBELogo,
    accountName: 'Rodeo Restaurant PLC',
    accountNumber: '1000 0089 7734 5521',
    gradient: 'linear-gradient(135deg, #8c2d85 0%, #6b1d65 40%, #4a1048 100%)',
    textColor: '#fff',
    accentColor: '#e0a94c',
    chipColor: 'rgba(224,169,76,0.2)',
  },
  {
    id: 'telebirr',
    name: 'TeleBirr',
    logo: TeleBirrLogo,
    accountName: 'Rodeo Restaurant PLC',
    accountNumber: '0978 0049 6823',
    gradient: 'linear-gradient(135deg, #0172bb 0%, #024f8a 40%, #01365e 100%)',
    textColor: '#fff',
    accentColor: '#4dc9f6',
    chipColor: 'rgba(255,255,255,0.15)',
  },
  {
    id: 'abyssinia',
    name: 'Abyssinia',
    logo: AbyssiniaLogo,
    accountName: 'Rodeo Restaurant PLC',
    accountNumber: '1289 9934 0012',
    gradient: 'linear-gradient(135deg, #f1ab15 0%, #d99a12 50%, #b37f0f 100%)',
    textColor: '#1a1300',
    accentColor: '#fff2d9',
    chipColor: 'rgba(0,0,0,0.1)',
  },
  {
    id: 'cbebirr',
    name: 'CBE Birr',
    logo: CBEBirrLogo,
    accountName: 'Rodeo Restaurant PLC',
    accountNumber: '1000 3445 5678',
    gradient: 'linear-gradient(135deg, #8c2d85 0%, #6b1d65 40%, #4a1048 100%)',
    textColor: '#fff',
    accentColor: '#e0a94c',
    chipColor: 'rgba(224,169,76,0.2)',
  },
  {
    id: 'awash',
    name: 'Awash',
    logo: AwashLogo,
    accountName: 'Rodeo Restaurant PLC',
    accountNumber: '0911 2233 4456',
    gradient: 'linear-gradient(135deg, #c8102e 0%, #8b0a1f 40%, #5e0714 100%)',
    textColor: '#fff',
    accentColor: '#ff6b7a',
    chipColor: 'rgba(255,107,122,0.15)',
  },
  {
    id: 'coop',
    name: 'Coop',
    logo: CoopLogo,
    accountName: 'Rodeo Restaurant PLC',
    accountNumber: '5566 7788 9901',
    gradient: 'linear-gradient(135deg, #003d6b 0%, #00294a 40%, #001b33 100%)',
    textColor: '#fff',
    accentColor: '#00b4d8',
    chipColor: 'rgba(0,180,216,0.15)',
  },
];
