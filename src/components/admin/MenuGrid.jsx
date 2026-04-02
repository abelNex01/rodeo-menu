import { AnimatePresence } from 'framer-motion';
import MenuCard from './MenuCard';

export default function MenuGrid({ items }) {
  return (
    <div>
      <p className="text-gray-500 text-sm text-right mb-4">{items.length} Results</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
