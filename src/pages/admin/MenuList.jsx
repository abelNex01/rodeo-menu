import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Trash2, Edit, LayoutGrid, List, Eye, EyeOff } from 'lucide-react';
import { useMenu, useNotification } from '../../context/AppContext';

export default function MenuList() {
  const navigate = useNavigate();
  const { menuItems, deleteItem, updateItem } = useMenu();
  const { success } = useNotification();
  const [search, setSearch] = useState('');
  const [view, setView] = useState('grid'); // grid | table

  const filtered = useMemo(() => {
    if (!search.trim()) return menuItems;
    const q = search.toLowerCase();
    return menuItems.filter(item =>
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  }, [menuItems, search]);

  const handleDelete = (item) => {
    if (confirm(`Delete "${item.name}"?`)) {
      deleteItem(item.id);
      success(`${item.name} deleted`);
    }
  };

  const handleToggleAvailable = (item) => {
    updateItem(item.id, { available: !item.available });
    success(`${item.name} ${item.available ? 'hidden' : 'shown'}`);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search items..."
              className="w-full bg-white border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20 transition-colors shadow-sm"
              aria-label="Search menu items"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
          </div>

          {/* View toggle */}
          <div className="flex items-center bg-white rounded-xl border border-gray-200 shadow-sm">
            <button
              onClick={() => setView('grid')}
              className={`p-2.5 rounded-l-xl transition-colors ${view === 'grid' ? 'bg-brand-500 text-white' : 'text-gray-400 hover:text-gray-900'}`}
              aria-label="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('table')}
              className={`p-2.5 rounded-r-xl transition-colors ${view === 'table' ? 'bg-brand-500 text-white' : 'text-gray-400 hover:text-gray-900'}`}
              aria-label="Table view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Add new */}
          <button
            onClick={() => navigate('/admin/menu/new')}
            className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </div>
      </div>

      {/* Table view */}
      {view === 'table' ? (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="px-4 py-3 text-gray-500 font-medium">Item</th>
                <th className="px-4 py-3 text-gray-500 font-medium">Category</th>
                <th className="px-4 py-3 text-gray-500 font-medium">Price</th>
                <th className="px-4 py-3 text-gray-500 font-medium">Status</th>
                <th className="px-4 py-3 text-gray-500 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map((item) => (
                  <motion.tr
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={item.img} alt={item.name} className="w-10 h-10 rounded-lg object-cover" loading="lazy" />
                        <div>
                          <p className="text-gray-900 font-medium">{item.name}</p>
                          <p className="text-gray-400 text-xs truncate max-w-[200px]">{item.desc}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500 capitalize">{item.category}</td>
                    <td className="px-4 py-3 text-brand-500 font-semibold">${item.price.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${item.available !== false ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        {item.available !== false ? 'Available' : 'Hidden'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleAvailable(item)}
                          className="p-2 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                          aria-label={item.available !== false ? 'Hide item' : 'Show item'}
                        >
                          {item.available !== false ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => navigate(`/admin/menu/${item.id}/edit`)}
                          className="p-2 text-gray-400 hover:text-brand-500 rounded-lg hover:bg-amber-50 transition-colors"
                          aria-label={`Edit ${item.name}`}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                          aria-label={`Delete ${item.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      ) : (
        /* Grid view */
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] hover:shadow-md transition-all group"
              >
                <img src={item.img} alt={item.name} className="w-full h-32 object-cover rounded-xl mb-3" loading="lazy" />
                <h3 className="text-gray-900 font-bold text-sm uppercase mb-1">{item.name}</h3>
                <p className="text-gray-400 text-xs mb-2 line-clamp-2">{item.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-brand-500 font-semibold">${item.price.toFixed(2)}</span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => navigate(`/admin/menu/${item.id}/edit`)}
                      className="p-1.5 text-gray-400 hover:text-brand-500 rounded-lg hover:bg-amber-50 transition-colors"
                      aria-label={`Edit ${item.name}`}
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                      aria-label={`Delete ${item.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
