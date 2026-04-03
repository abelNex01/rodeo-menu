import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  SlidersHorizontal, 
  Plus,
  ChevronDown,
  Flame, Martini, Star, Leaf, Soup, UtensilsCrossed, 
  Beef, Drumstick, Fish, Sandwich, Pizza as PizzaIcon, 
  Wine as WineIcon, Globe, Utensils, Sparkles,
  ArrowRight,
  CookingPot, IceCream, Coffee, Apple, CupSoda, Beer as BeerIcon
} from "lucide-react";

import FoodCard from "../components/FoodCard";

import { useMenu } from "../context/AppContext";
import useCategoryFilter from "../hooks/useCategoryFilter";
import { createCartItem } from "../utils/cartHelpers";

// Icon mapping (Keep in sync with Categories.jsx)
const CATEGORY_ICONS = {
  'shooters': Flame,
  'long-cocktails': Martini,
  'special-menu': Star,
  'salads': Leaf,
  'soups': Soup,
  'pasta': UtensilsCrossed,
  'rice-dishes': UtensilsCrossed,
  'beef-dishes': Beef,
  'chicken-dishes': Drumstick,
  'lamb-dishes': Beef,
  'fish-dishes': Fish,
  'sandwiches': Sandwich,
  'burgers': UtensilsCrossed,
  'pizza': PizzaIcon,
  'traditional-food': CookingPot,
  'desserts': IceCream,
  'day-special-menu': Sparkles,
  'day-special-traditional-food': CookingPot,
  'hot-drinks': Coffee,
  'juices': Apple,
  'cold-drinks': CupSoda,
  'beer': BeerIcon,
  'wine': WineIcon,
  'imported-wine': Globe,
  'local-wine-big': WineIcon,
  'cognac': Martini,
  'liquor': Martini,
  'premium-whisky': Flame,
  'regular-whisky': Flame,
  'spirits': Flame,
  'all': Utensils
};

const Specials = ({ setCart }) => {
  const navigate = useNavigate();
  const { menuItems, categories } = useMenu();
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
  const [showAllTop, setShowAllTop] = useState(false);
  const [showAllSuggested, setShowAllSuggested] = useState(false);

  // Map Supabase items to UI format
  const allFoods = useMemo(() => {
    return menuItems.map(item => ({
      id: item.id,
      name: item.name,
      desc: item.description,
      price: item.price,
      img: item.image_url,
      review: item.rating,
      time: `${item.preparation_time} min`,
      category: item.category_id,
      available: item.available
    }));
  }, [menuItems]);

  const quickCategories = useMemo(() => {
    const list = categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      img: cat.image_url,
      Icon: CATEGORY_ICONS[cat.id] || Utensils
    }));
    return [{ id: 'all', name: 'All', Icon: Utensils }, ...list];
  }, [categories]);

  // Define Top Rated and Suggested dynamically from the imported menu
  const topRatedItems = useMemo(() => {
    return allFoods.filter(f => f.review >= 4.7).slice(0, 10);
  }, [allFoods]);

  const suggestedItems = useMemo(() => {
    // Just a random selection for suggested, or based on specific categories
    return allFoods.filter(f => f.review >= 4.5 && f.review < 4.7).slice(0, 10);
  }, [allFoods]);

  // Reuse the category filter hook for top-rated items (search + category)
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
  } = useCategoryFilter([]);

  const handleQuickAdd = (e, item) => {
    e.stopPropagation();
    setCart(prev => [...(prev || []), createCartItem(item)]);
  };

  const filterItems = (items) => {
    return items.filter(item => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  const filteredTopRated = filterItems(topRatedItems);
  const filteredSuggested = filterItems(suggestedItems);

  return (
    <div className="w-full min-h-screen flex flex-col pb-20 font-sans overflow-x-hidden bg-[#f8f9fa]">
      
      <div className="px-5 pt-4">
        {/* Menu Categories Section */}
        <div className="mb-6">
          <div 
            className="flex justify-between items-center mb-3 cursor-pointer"
            onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)}
          >
            <h3 className="text-[20px] font-bold text-gray-900">Menu Categories</h3>
            <button className="flex items-center gap-1 text-amber-500 font-semibold text-[13px]">
              <span>{isCategoriesExpanded ? "Show Less" : "See All"}</span>
              <motion.div
                animate={{ rotate: isCategoriesExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={16} />
              </motion.div>
            </button>
          </div>
          
          <AnimatePresence>
            {isCategoriesExpanded ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-5 gap-1 pb-2">
                  {quickCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setIsCategoriesExpanded(false);
                      }}
                      className="flex flex-col items-center justify-center p-1 transition-all"
                    >
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-1 transition-all ${
                        activeCategory === cat.id ? "bg-white shadow-[0_4px_10px_rgba(0,0,0,0.08)] border-2 border-amber-400/20" : "bg-white border border-gray-100"
                      }`}>
                        {cat.img ? (
                          <img src={cat.img} alt={cat.name} className="w-10 h-10 object-contain" />
                        ) : (
                          <span className={activeCategory === cat.id ? "text-amber-500" : "text-gray-400"}>
                            <cat.Icon size={24} />
                          </span>
                        )}
                      </div>
                      <span className={`text-[10px] font-bold text-center leading-tight ${activeCategory === cat.id ? "text-gray-900" : "text-gray-500"}`}>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="pb-2 flex gap-1.5 overflow-x-auto hide-scrollbar -mx-5 px-5">
                {quickCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className="flex flex-col items-center justify-center min-w-[72px] flex-shrink-0 transition-all"
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all ${
                      activeCategory === cat.id 
                        ? "bg-white shadow-[0_8px_15px_rgba(0,0,0,0.08)] border-2 border-amber-400/20" 
                        : "bg-white border border-gray-100"
                    }`}>
                      {cat.img ? (
                        <img src={cat.img} alt={cat.name} className="w-11 h-11 object-contain" />
                      ) : (
                        <span className={activeCategory === cat.id ? "text-amber-500" : "text-gray-400"}>
                           <cat.Icon size={24} />
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-[12px] font-bold whitespace-nowrap ${
                        activeCategory === cat.id ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {cat.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="flex items-center bg-white rounded-xl px-4 py-3.5 shadow-sm border border-gray-100">
            <Search size={20} className="text-gray-400 min-w-[20px]" />
            <input 
              type="text" 
              placeholder="Search any recipes of your choice..." 
              className="flex-1 bg-transparent outline-none px-3 text-[14px] text-gray-700 placeholder:text-gray-400" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="w-[1px] h-5 bg-gray-200 mx-1"></div>
            <button className="p-1 text-amber-500">
              <SlidersHorizontal size={18} />
            </button>
          </div>
        </div>

      {/* ===== Top Rated Section ===== */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[20px] font-bold text-gray-900">
            Top rated specials
          </h2>
          <button 
            onClick={() => setShowAllTop(!showAllTop)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full border transition-all ${showAllTop ? 'bg-amber-500 border-amber-500 text-white' : 'border-gray-200 bg-white text-gray-500'}`}
          >
            <span className="text-[12px] font-medium">
              {showAllTop ? "Show Less" : "See all"}
            </span>
            <ArrowRight size={12} className={`transition-transform ${showAllTop ? 'rotate-90' : ''}`} />
          </button>
        </div>

        <div className={showAllTop ? "flex flex-col gap-4 pb-2" : "flex overflow-x-auto hide-scrollbar gap-4 pb-3 -mx-5 px-5"}>
          {filteredTopRated.map((item) => (
            <FoodCard key={item.id} item={item} handleQuickAdd={handleQuickAdd} />
          ))}
          {filteredTopRated.length === 0 && (
            <div className="py-10 text-center text-gray-500 w-full">
              No top rated specials found.
            </div>
          )}
        </div>
      </div>

      {/* ===== Suggested Section ===== */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[20px] font-bold text-gray-900">
            Suggested specials
          </h2>
          <button 
            onClick={() => setShowAllSuggested(!showAllSuggested)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full border transition-all ${showAllSuggested ? 'bg-amber-500 border-amber-500 text-white' : 'border-gray-200 bg-white text-gray-500'}`}
          >
            <span className="text-[12px] font-medium">
              {showAllSuggested ? "Show Less" : "See all"}
            </span>
            <ArrowRight size={12} className={`transition-transform ${showAllSuggested ? 'rotate-90' : ''}`} />
          </button>
        </div>

        <div className={showAllSuggested ? "flex flex-col gap-4 pb-2" : "flex overflow-x-auto hide-scrollbar gap-4 pb-3 -mx-5 px-5"}>
          {filteredSuggested.map((item) => (
             <FoodCard key={item.id} item={item} handleQuickAdd={handleQuickAdd} />
          ))}
          {filteredSuggested.length === 0 && (
            <div className="py-10 text-center text-gray-500 w-full">
              No suggested specials found.
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Specials;
