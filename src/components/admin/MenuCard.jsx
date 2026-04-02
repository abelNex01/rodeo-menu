import { motion } from 'framer-motion';
import { useCart, useNotification } from '../../context/AppContext';

export default function MenuCard({ item }) {
  const { addItem } = useCart();
  const { success } = useNotification();

  const handleAdd = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      img: item.img,
    });
    success(`${item.name} added to order`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
      onClick={handleAdd}
      className="bg-white rounded-2xl p-4 cursor-pointer group border border-gray-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] hover:shadow-md transition-all"
      role="button"
      tabIndex={0}
      aria-label={`Add ${item.name} to order, $${item.price.toFixed(2)}`}
      onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
    >
      {/* Image */}
      <div className="flex justify-center mb-3">
        <img
          src={item.img}
          alt={item.name}
          className="w-32 h-28 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Name */}
      <h3 className="text-gray-900 font-bold text-sm uppercase tracking-wide text-center mb-1.5">
        {item.name}
      </h3>

      {/* Description */}
      <p className="text-gray-400 text-xs text-center leading-relaxed mb-3 line-clamp-3">
        {item.desc}
      </p>

      {/* Price */}
      <p className="text-brand-500 font-semibold text-center text-base">
        ${item.price.toFixed(2)}
      </p>
    </motion.div>
  );
}
