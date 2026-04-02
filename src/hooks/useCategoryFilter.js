import { useState, useMemo } from 'react';

/**
 * Combined category + search filter logic.
 * Previously duplicated in Categories.jsx and Specials.jsx.
 *
 * @param {Array} items — the full list to filter
 * @returns {{ activeCategory, setActiveCategory, searchQuery, setSearchQuery, filteredItems }}
 */
export default function useCategoryFilter(items) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [items, activeCategory, searchQuery]);

  return {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    filteredItems,
  };
}
