import { motion } from 'framer-motion';

const categories = [
  { id: 'all', name: 'All', emoji: '🍽️' },
  { id: 'pizza', name: 'Pizza', emoji: '🍕' },
  { id: 'burgers', name: 'Burger', emoji: '🍔' },
  { id: 'mains', name: 'Steaks', emoji: '🥩' },
  { id: 'desserts', name: 'Cake', emoji: '🍰' },
  { id: 'beverages', name: 'Dessert', emoji: '🍮' },
];

export default function CategoryChips({ active, onChange }) {
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2 admin-scrollbar" role="tablist" aria-label="Menu categories">
      {categories.map((cat) => {
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            role="tab"
            aria-selected={isActive}
            className={`
              relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium
              whitespace-nowrap transition-colors duration-200 shrink-0
              ${isActive
                ? 'text-white'
                : 'bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-50 border border-gray-200 shadow-sm'
              }
            `}
          >
            {isActive && (
              <motion.div
                layoutId="chip-active"
                className="absolute inset-0 bg-brand-500 rounded-full"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat.emoji}</span>
            <span className="relative z-10">{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
