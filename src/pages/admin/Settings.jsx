import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { settingsApi } from '../../services/settingsService';
import { useNotification } from '../../context/AppContext';

export default function Settings() {
  const { success } = useNotification();
  const [form, setForm] = useState({});

  useEffect(() => {
    settingsApi.get().then(data => setForm(data || {}));
  }, []);
  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleNotifChange = (field, value) => {
    setForm(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [field]: value },
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const updated = await settingsApi.update(form);
    setForm(updated);
    success('Settings saved');
  };

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Store Info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)]">
          <h3 className="text-gray-900 font-semibold">Store Information</h3>
          
          <div>
            <label htmlFor="store-name" className="block text-sm font-medium text-gray-600 mb-2">Store Name</label>
            <input
              id="store-name"
              type="text"
              value={form.storeName || ''}
              onChange={e => handleChange('storeName', e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="tax-rate" className="block text-sm font-medium text-gray-600 mb-2">Tax Rate (%)</label>
              <input
                id="tax-rate"
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={form.taxRate || ''}
                onChange={e => handleChange('taxRate', parseFloat(e.target.value) || 0)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-600 mb-2">Currency</label>
              <select
                id="currency"
                value={form.currency || 'USD'}
                onChange={e => handleChange('currency', e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20 transition-colors"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="ETB">ETB (Br)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)]">
          <h3 className="text-gray-900 font-semibold">Notifications</h3>
          
          {[
            { id: 'newOrder', label: 'New order alerts' },
            { id: 'orderStatus', label: 'Order status changes' },
            { id: 'lowStock', label: 'Low stock warnings' },
          ].map(notif => (
            <div key={notif.id} className="flex items-center justify-between">
              <label htmlFor={`notif-${notif.id}`} className="text-sm text-gray-600">{notif.label}</label>
              <button
                type="button"
                id={`notif-${notif.id}`}
                role="switch"
                aria-checked={form.notifications?.[notif.id] || false}
                onClick={() => handleNotifChange(notif.id, !form.notifications?.[notif.id])}
                className={`w-11 h-6 rounded-full transition-colors relative ${form.notifications?.[notif.id] ? 'bg-brand-500' : 'bg-gray-300'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${form.notifications?.[notif.id] ? 'left-[22px]' : 'left-0.5'}`} />
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <Save className="w-5 h-5" />
          Save Settings
        </button>
      </form>
    </div>
  );
}
