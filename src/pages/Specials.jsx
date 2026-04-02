import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  SlidersHorizontal, 
  Plus, 
  ChevronDown, 
  ArrowRight,
  Flame, Martini, Star, Leaf, Soup, UtensilsCrossed, 
  Beef, Drumstick, Fish, Sandwich, Pizza as PizzaIcon, 
  CookingPot, IceCream, Coffee, Apple, CupSoda, Beer as BeerIcon, 
  Wine as WineIcon, Globe, Utensils, Sparkles
} from "lucide-react";

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
            <motion.div 
              layout
              key={item.id}
              onClick={() => navigate(`/food/${item.id}`)}
              className={`bg-white rounded-[24px] p-2 flex flex-col shadow-[0_8px_25px_-10px_rgba(0,0,0,0.1)] cursor-pointer active:scale-[0.99] transition-all ${showAllTop ? 'w-full' : 'w-[310px] flex-shrink-0'}`}
            >
              {/* Top Image Section */}
              <div className="w-full h-[220px] rounded-[20px] overflow-hidden relative mb-3">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover" 
                />
                
                {/* Rating Badge (Top Left) */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Star size={14} className="text-[#facc15] fill-[#facc15]" />
                  <span className="text-[14px] font-bold text-gray-800">{item.review}</span>
                </div>

                {/* Plus Icon (Top Right) */}
                <button 
                  onClick={(e) => handleQuickAdd(e, item)}
                  className="absolute top-2 right-2 w-8 h-8 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center pointer-events-auto hover:bg-white/60 transition-colors"
                >
                  <Plus size={18} strokeWidth={3} className="text-white" />
                </button>
              </div>

              {/* Text Info Section */}
              <div className="flex flex-col flex-1 px-1">
                <h4 className="text-[17px] font-bold text-gray-900 mb-0.5 leading-tight tracking-tight line-clamp-1">{item.name}</h4>
                <p className="text-[13px] text-gray-400 font-medium mb-3 line-clamp-1">{item.desc}</p>
                
                {/* Bottom Row */}
                <div className="mt-auto flex justify-between items-center">
                  <button 
                    onClick={(e) => handleQuickAdd(e, item)}
                    className="bg-gradient-to-br from-amber-400 to-orange-500 text-white text-[13px] font-bold px-3 py-1.5 rounded-[8px] tracking-wide relative overflow-hidden group shadow-[0_4px_12px_rgba(245,158,11,0.3)]"
                  >
                    <span className="relative z-10">{item.price} <span className="text-[10px] ml-0.5">ETB</span></span>
                  </button>
                  
                  <div className="bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span className="text-[12px] font-bold text-gray-800">{item.time}</span>
                  </div>
                </div>
              </div>
            </motion.div>
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
            <motion.div 
              layout
              key={item.id}
              onClick={() => navigate(`/food/${item.id}`)}
              className={`bg-white rounded-[24px] p-2 flex flex-col shadow-[0_8px_25px_-10px_rgba(0,0,0,0.1)] cursor-pointer active:scale-[0.99] transition-all ${showAllSuggested ? 'w-full' : 'w-[310px] flex-shrink-0'}`}
            >
              {/* Top Image Section */}
              <div className="w-full h-[220px] rounded-[20px] overflow-hidden relative mb-3">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover" 
                />
                
                {/* Rating Badge (Top Left) */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Star size={14} className="text-[#facc15] fill-[#facc15]" />
                  <span className="text-[14px] font-bold text-gray-800">{item.review}</span>
                </div>

                {/* Plus Icon (Top Right) */}
                <button 
                  onClick={(e) => handleQuickAdd(e, item)}
                  className="absolute top-2 right-2 w-8 h-8 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center pointer-events-auto hover:bg-white/60 transition-colors"
                >
                  <Plus size={18} strokeWidth={3} className="text-white" />
                </button>
              </div>

              {/* Text Info Section */}
              <div className="flex flex-col flex-1 px-1">
                <h4 className="text-[17px] font-bold text-gray-900 mb-0.5 leading-tight tracking-tight line-clamp-1">{item.name}</h4>
                <p className="text-[13px] text-gray-400 font-medium mb-3 line-clamp-1">{item.desc}</p>
                
                {/* Bottom Row */}
                <div className="mt-auto flex justify-between items-center">
                  <button 
                    onClick={(e) => handleQuickAdd(e, item)}
                    className="bg-gradient-to-br from-amber-400 to-orange-500 text-white text-[13px] font-bold px-3 py-1.5 rounded-[8px] tracking-wide relative overflow-hidden group shadow-[0_4px_12px_rgba(245,158,11,0.3)]"
                  >
                    <span className="relative z-10">{item.price} <span className="text-[10px] ml-0.5">ETB</span></span>
                  </button>
                  
                  <div className="bg-gray-50 border border-gray-100 px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span className="text-[12px] font-bold text-gray-800">{item.time}</span>
                  </div>
                </div>
              </div>
            </motion.div>
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
