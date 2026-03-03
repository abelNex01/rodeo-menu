import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";

import { 
  Bell, 
  Search, 
  SlidersHorizontal, 
  ChevronRight, 
  Bookmark,
  Leaf,
  UtensilsCrossed,
  Soup,
  Pizza,
  Coffee,
  Cake,
  Star,
  Plus,
  ChevronDown,
  Utensils
} from "lucide-react";
import section1 from "../assets/category/section1.png";
import section2 from "../assets/category/section2.png";
import section3 from "../assets/category/section3.png";
import section4 from "../assets/category/section4.png";
import section5 from "../assets/category/section5.png";
import section6 from "../assets/category/section6.png";

// ── Keep existing data ──
const quickCategories = [
  { id: "all", name: "All", icon: <Utensils size={24} /> },
  { id: "appetizers", name: "Appetizers", img: section1 },
  { id: "salads", name: "Salads" , img: section2  },
  { id: "soups", name: "Soups" , img: section3  },
  { id: "mains", name: "Mains" , img: section4  },
  { id: "grill", name: "Grill" , img: section5  },
  { id: "burgers", name: "Burgers", img: section6 },
  { id: "pizza", name: "Pizza", img: section1 },
  { id: "traditional", name: "Traditional" , img: section2  },
  { id: "seafood", name: "Seafood", img: section3 },
  { id: "vegetarian", name: "Vegetarian" , img: section2  },
  { id: "sides", name: "Sides" , img: section2 },
  { id: "desserts", name: "Desserts", img: section6 },
  { id: "beverages", name: "Beverages" , img: section2  },
];

// Replaced recommended with 20 dummy items for the complete menu
const allFoods = [
  { id: 1, name: "Classic Burger", desc: "Juicy beef patty with cheese", price: "450", time: "15 min", review: "4.8", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop" },
  { id: 2, name: "Grilled Salmon", desc: "Fresh caught salmon steak", price: "780", time: "25 min", review: "4.9", img: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=400&h=300&fit=crop" },
  { id: 3, name: "Spicy Ramen", desc: "Rich pork broth with noodles", price: "520", time: "20 min", review: "4.7", img: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=400&h=300&fit=crop" },
  { id: 4, name: "Caesar Salad", desc: "Crisp romaine & parmesan", price: "350", time: "10 min", review: "4.5", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop" },
  { id: 5, name: "Margherita Pizza", desc: "Wood-fired with fresh basil", price: "580", time: "20 min", review: "4.8", img: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=400&h=300&fit=crop" },
  { id: 6, name: "Steak Frites", desc: "Ribeye with crispy fries", price: "889", time: "30 min", review: "4.9", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop" },
  { id: 7, name: "Lemon Cheesecake", desc: "Creamy dessert with crust", price: "320", time: "5 min", review: "4.6", img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop" },
  { id: 8, name: "Iced Caramel Latte", desc: "Espresso, milk, and caramel", price: "310", time: "5 min", review: "4.7", img: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=400&h=300&fit=crop" },
  { id: 9, name: "Tacos al Pastor", desc: "Pork tacos with pineapple", price: "480", time: "15 min", review: "4.8", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop" },
  { id: 10, name: "Avocado Toast", desc: "Poached eggs on sourdough", price: "340", time: "10 min", review: "4.5", img: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=400&h=300&fit=crop" },
  { id: 11, name: "Mushroom Risotto", desc: "Creamy Arborio rice", price: "620", time: "25 min", review: "4.7", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop" },
  { id: 12, name: "Buffalo Wings", desc: "Spicy chicken wings", price: "430", time: "15 min", review: "4.6", img: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=400&h=300&fit=crop" },
  { id: 13, name: "Mango Smoothie", desc: "Fresh mango and yogurt", price: "320", time: "5 min", review: "4.8", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop" },
  { id: 14, name: "Beef Stroganoff", desc: "Tender beef in mushroom cream", price: "750", time: "25 min", review: "4.7", img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop" },
  { id: 15, name: "Pancakes", desc: "Fluffy stack with syrup", price: "380", time: "15 min", review: "4.6", img: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=400&h=300&fit=crop" },
  { id: 16, name: "Shrimp Scampi", desc: "Garlic butter shrimp pasta", price: "820", time: "20 min", review: "4.9", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop" },
  { id: 17, name: "Chocolate Lava Cake", desc: "Warm cake with molten center", price: "360", time: "10 min", review: "4.9", img: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=400&h=300&fit=crop" },
  { id: 18, name: "Greek Salad", desc: "Feta, olives, and greens", price: "420", time: "10 min", review: "4.5", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop" },
  { id: 19, name: "Chicken Tikka Masala", desc: "Creamy tomato curry with naan", price: "680", time: "25 min", review: "4.8", img: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=400&h=300&fit=crop" },
  { id: 20, name: "Matcha Latte", desc: "Sweet green tea with milk", price: "300", time: "5 min", review: "4.7", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop" },
];

const banners = [
  { id: 1, image: banner1 },
  { id: 2, image: banner2 },
  { id: 3, image: banner3 }
];

const Categories = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [currentBanner, setCurrentBanner] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleQuickAdd = (e, item) => {
    e.stopPropagation();
    const newItem = {
      cartId: Date.now(),
      ...item,
      price: parseFloat(item.price)
    };
    setCart(prev => [...(prev || []), newItem]);
  };

  return (
    <div className="w-full min-h-screen flex flex-col pb-20 font-sans overflow-x-hidden bg-[#f8f9fa]">
      
      <div className="px-5 pt-4">
        {/* Hero Banner Slider */}
        <div className="relative h-[160px] mb-6 overflow-hidden rounded-[12px] shadow-md cursor-pointer" onClick={() => navigate('/menu')}>
          <AnimatePresence>
            <motion.div
              key={currentBanner}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
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
                          {cat.icon}
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
                        {cat.icon}
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
            />
            <div className="w-[1px] h-5 bg-gray-200 mx-1"></div>
            <button className="p-1 text-amber-500">
              <SlidersHorizontal size={18} />
            </button>
          </div>
        </div>

      {/* Main Foods Section */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[20px] font-bold text-gray-900">Food and Drinks Menu</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 pb-4">
          {allFoods.map((item) => (
            <div 
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
                <div className="mt-auto flex justify-between items-center">
                  <button 
                    onClick={(e) => handleQuickAdd(e, item)}
                    className="bg-gradient-to-br from-amber-400 to-orange-500 text-white text-[13px] font-bold px-3 py-1.5 rounded-[8px] tracking-wide relative overflow-hidden group shadow-[0_4px_12px_rgba(245,158,11,0.3)]"
                  >
                    <span className="relative z-10">{item.price} <span className="text-[10px] ml-0.5">ETB</span></span>
                    <div className="absolute inset-0 bg-black/10 translate-y-full group-active:translate-y-0 transition-transform"></div>
                  </button>
                  
                  {/* Time Badge (Now in bottom right) */}
                  <div className="bg-gray-50 border border-gray-100 px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span className="text-[10px] font-bold text-gray-800">{item.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* ===== Hide Scrollbar CSS ===== */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `,
        }}
      />
      </div>
    </div>
  );
};

export default Categories;