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
  CookingPot, IceCream, Coffee, Apple, CupSoda, Beer as BeerIcon, 
  Wine as WineIcon, Globe, Utensils, Sparkles
} from "lucide-react";

import { useMenu } from "../context/AppContext";
import useBannerRotation from "../hooks/useBannerRotation";
import useCategoryFilter from "../hooks/useCategoryFilter";
import { createCartItem } from "../utils/cartHelpers";
import { capitalize } from "../utils/formatters";

// Import original banners
import banner1 from "../assets/banner1.webp";
import banner2 from "../assets/banner2.webp";
import banner3 from "../assets/banner3.webp";

// Icon mapping for categories
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

const Categories = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const { menuItems, categories } = useMenu();
  
  // Restore professional banners
  const banners = [
    { id: 1, image: banner1 },
    { id: 2, image: banner2 },
    { id: 3, image: banner3 }
  ];

  const currentBanner = useBannerRotation(banners.length);

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

  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    filteredItems: filteredFoods,
  } = useCategoryFilter(allFoods);

  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);

  const handleQuickAdd = (e, item) => {
    e.stopPropagation();
    // Transform back to context format if needed, but AppProvider handles both id/menuId
    setCart(prev => [...(prev || []), createCartItem(item)]);
  };

  const groupedFoods = useMemo(() => {
    if (activeCategory !== 'all') {
      const categoryObj = quickCategories.find(c => c.id === activeCategory);
      return [{
        id: activeCategory,
        name: categoryObj ? categoryObj.name : capitalize(activeCategory),
        items: filteredFoods
      }];
    }

    const groups = [];
    quickCategories.forEach(cat => {
      if (cat.id === 'all') return;
      const items = filteredFoods.filter(f => f.category === cat.id);
      if (items.length > 0) {
        groups.push({
          id: cat.id,
          name: cat.name,
          items: items
        });
      }
    });

    return groups;
  }, [filteredFoods, activeCategory]);

  return (
    <div className="w-full min-h-screen flex flex-col pb-20 font-sans overflow-x-hidden bg-[#f8f9fa]">
      
      <div className="px-5 pt-4">
        {/* Hero Banner Slider */}
        <div className="relative h-[160px] mb-6 overflow-hidden rounded-[12px] shadow-md cursor-pointer" onClick={() => navigate('/menu')}>
          <AnimatePresence>
            <motion.div
              key={currentBanner}
              initial={{ x: "100%", opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 1 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.32, 0.72, 0, 1] 
              }}
              className="absolute inset-0"
            >
              <img 
                src={banners[currentBanner].image} 
                alt="Banner" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Slider Indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {banners.map((_, index) => (
              <div 
                key={index} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentBanner ? "w-6 bg-white" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Menu Categories Section */}
      <div className="mb-3 px-5">
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

      <div className="px-5">

        {/* Search Bar */}
        <div className="mb-6">
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

      {/* Main Foods Section */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[20px] font-bold text-gray-900">
            {activeCategory === "all" ? "Food and Drinks Menu" : `${capitalize(activeCategory)} Menu`}
          </h3>
        </div>
        
        <div className="flex flex-col gap-10 pb-4">
          {groupedFoods.map((group) => (
            <div key={group.id} className="flex flex-col gap-4">
              {/* Category Sub-header */}
              {activeCategory === 'all' && (
                <div className="flex items-center gap-3">
                  <div className="h-[2px] w-8 bg-amber-500 rounded-full" />
                  <h4 className="text-[15px] font-bold text-gray-600 uppercase tracking-widest pl-1">
                    {group.name}
                  </h4>
                </div>
              )}
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {group.items.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key={item.id}
                    onClick={() => navigate(`/food/${item.id}`)}
                    className="bg-white rounded-[20px] p-1.5 flex flex-col shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] cursor-pointer active:scale-[0.98] transition-all"
                  >
                    {/* Top Image Section */}
                    <div className="w-full h-[140px] rounded-[16px] overflow-hidden relative mb-2">
                      <img 
                        src={item.img} 
                        alt={item.name} 
                        className="w-full h-full object-cover" 
                      />
                      
                      {/* Rating Badge (Top Left) */}
                      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <Star size={11} className="text-[#facc15] fill-[#facc15]" />
                        <span className="text-[11px] font-bold text-gray-800">{item.review}</span>
                      </div>

                      {/* Plus Icon (Top Right) - Adds to order list */}
                      <button 
                        onClick={(e) => handleQuickAdd(e, item)}
                        className="absolute top-2 right-2 w-8 h-8 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center pointer-events-auto hover:bg-white/60 transition-colors"
                      >
                        <Plus size={18} strokeWidth={3} className="text-white" />
                      </button>
                    </div>

                    {/* Text Info Section */}
                    <div className="flex flex-col flex-1 px-1">
                      <h4 className="text-[14px] font-bold text-gray-900 mb-0.5 leading-tight tracking-tight line-clamp-1">{item.name}</h4>
                      
                      {/* Product Description */}
                      <p className="text-[11px] text-gray-400 font-medium mb-2 line-clamp-1">{item.desc}</p>
                      
                      {/* Bottom Row: Price & Time Badge (Replacing Share Icon) */}
                      <div className="mt-auto flex justify-between items-center text-[10px]">
                        <button 
                          onClick={(e) => handleQuickAdd(e, item)}
                          className="bg-gradient-to-br from-amber-400 to-orange-500 text-white text-[13px] font-bold px-3 py-1.5 rounded-[8px] tracking-wide relative overflow-hidden group shadow-[0_4px_12px_rgba(245,158,11,0.3)]"
                        >
                          <span className="relative z-10">{item.price} <span className="text-[10px] ml-0.5">ETB</span></span>
                        </button>
                        
                        {/* Time Badge (Now in bottom right) */}
                        <div className="bg-gray-50 border border-gray-100 px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          <span className="text-[11px] font-bold text-gray-800">{item.time}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {filteredFoods.length === 0 && (
          <div className="py-10 text-center text-gray-500">
            No items found matching your search.
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Categories;

