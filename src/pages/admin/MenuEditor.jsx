import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { useMenu, useNotification } from '../../context/AppContext';
import { categoryApi } from '../../services/categoryService';

export default function MenuEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { menuItems, createItem, updateItem } = useMenu();
  const { success, error } = useNotification();
  const isEditing = Boolean(id);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoryApi.getAll().then(data => setCategories(data || []));
  }, []);

  const [form, setForm] = useState({
    name: '',
    desc: '',
    price: '',
    category: categories[0]?.id || 'mains',
    img: '',
    available: true,
  });

  useEffect(() => {
    if (isEditing) {
      const item = menuItems.find(i => i.id === String(id));
      if (item) {
        setForm({
          name: item.name,
          desc: item.desc,
          price: String(item.price),
          category: item.category,
          img: item.img,
          available: item.available !== false,
        });
      }
    }
  }, [id, isEditing, menuItems]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      error('Name and price are required');
      return;
    }

    const data = {
      ...form,
      price: parseFloat(form.price),
    };

    if (isEditing) {
      await updateItem(id, data);
      success(`${form.name} updated`);
    } else {
      await createItem(data);
      success(`${form.name} created`);
    }
    navigate('/admin/menu');
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/admin/menu')}
          className="p-2 text-gray-400 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition-colors"
          aria-label="Back to menu list"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Edit Menu Item' : 'New Menu Item'}
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)]">
        {/* Name */}
        <div>
          <label htmlFor="item-name" className="block text-sm font-medium text-gray-600 mb-2">Name</label>
          <input
            id="item-name"
            type="text"
            value={form.name}
            onChange={e => handleChange('name', e.target.value)}
            placeholder="e.g. Classic Burger"
            required
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20 transition-colors"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="item-desc" className="block text-sm font-medium text-gray-600 mb-2">Description</label>
          <textarea
            id="item-desc"
            value={form.desc}
            onChange={e => handleChange('desc', e.target.value)}
            placeholder="Describe the dish..."
            rows={3}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20 transition-colors resize-none"
          />
        </div>

        {/* Price + Category row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="item-price" className="block text-sm font-medium text-gray-600 mb-2">Price (ETB)</label>
            <input
              id="item-price"
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={e => handleChange('price', e.target.value)}
              placeholder="0.00"
              required
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="item-category" className="block text-sm font-medium text-gray-600 mb-2">Category</label>
            <select
              id="item-category"
              value={form.category}
              onChange={e => handleChange('category', e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20 transition-colors"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="item-img" className="block text-sm font-medium text-gray-600 mb-2">Image URL</label>
          <input
            id="item-img"
            type="url"
            value={form.img}
            onChange={e => handleChange('img', e.target.value)}
            placeholder="https://..."
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20 transition-colors"
          />
          {form.img && (
            <img src={form.img} alt="Preview" className="mt-3 w-32 h-24 object-cover rounded-xl border border-gray-200" />
          )}
        </div>

        {/* Available toggle */}
        <div className="flex items-center justify-between">
          <label htmlFor="item-available" className="text-sm font-medium text-gray-600">Available on menu</label>
          <button
            type="button"
            id="item-available"
            role="switch"
            aria-checked={form.available}
            onClick={() => handleChange('available', !form.available)}
            className={`w-11 h-6 rounded-full transition-colors relative ${form.available ? 'bg-brand-500' : 'bg-gray-300'}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${form.available ? 'translate-x-5.5 left-[22px]' : 'left-0.5'}`} />
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <Save className="w-5 h-5" />
          {isEditing ? 'Update Item' : 'Create Item'}
        </button>
      </form>
    </div>
  );
}
