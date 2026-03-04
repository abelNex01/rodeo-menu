import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import banner1 from "../assets/banner1.webp";
import banner2 from "../assets/banner2.webp";
import banner3 from "../assets/banner3.webp";

import { 
  Search, 
  SlidersHorizontal, 
  Star, 
  Plus, 
  ChevronDown, 
  Utensils,
  Martini,
  ArrowRight
} from "lucide-react";
import section1 from "../assets/category/1.png";
import section2 from "../assets/category/2.png";
import section3 from "../assets/category/3.png";
import section4 from "../assets/category/4.png";
import section5 from "../assets/category/5.png";
import section6 from "../assets/category/6.png";
import section7 from "../assets/category/7.png";
import section8 from "../assets/category/8.png";
import section9 from "../assets/category/9.png";


// ── Keep existing data ──
const quickCategories = [
  { id: "all", name: "All", icon: <Utensils size={24} /> },
  { id: "mains", name: "Mains" , img: section4  },
  { id: "burgers", name: "Burgers", img: section6 },
  { id: "pizza", name: "Pizza", img: section1 },
  { id: "traditional", name: "Traditional" , img: section7  },
   { id: "beverages", name: "Beverages" , img: section5  },
    { id: "seafood", name: "Seafood", img: section8 },
  { id: "salads", name: "Salads" , img: section2  },
  { id: "soups", name: "Soups" , img: section3  },
  { id: "grill", name: "Grill" , img: section5  },
  { id: "sides", name: "Sides" , img: section2 },
  { id: "desserts", name: "Desserts", img: section6 },
  { id: "cocktails", name: "Cocktails", img: section9 },
];

const banners = [
  { id: 1, image: banner1 },
  { id: 2, image: banner2 },
  { id: 3, image: banner3 }
];

const topRated = [
  {
    id: 1,
    name: "Classic Burger",
    desc: "Juicy beef patty with cheese",
    price: "450",
    time: "15 min",
    review: "4.8",
    location: "Bole, Addis",
    distance: "2 km away",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Grilled Salmon",
    desc: "Fresh caught salmon steak",
    price: "780",
    time: "25 min",
    review: "4.9",
    location: "Kazanchis",
    distance: "5 km away",
    img: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Spicy Ramen",
    desc: "Rich pork broth with noodles",
    price: "520",
    time: "20 min",
    review: "4.7",
    location: "Piazza",
    distance: "8 km away",
    img: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Margherita Pizza",
    desc: "Wood-fired with fresh basil",
    price: "580",
    time: "20 min",
    review: "4.8",
    location: "Sarbet",
    distance: "3 km away",
    img: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=600&h=400&fit=crop",
  },
];

const suggested = [
  {
    id: 6,
    name: "Steak Frites",
    desc: "Ribeye with crispy fries",
    price: "889",
    time: "30 min",
    review: "4.9",
    location: "Mexico, Addis",
    distance: "4 km away",
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop",
  },
  {
    id: 7,
    name: "Lemon Cheesecake",
    desc: "Creamy dessert with crust",
    price: "320",
    time: "5 min",
    review: "4.6",
    location: "CMC, Addis",
    distance: "12 km away",
    img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&h=400&fit=crop",
  },
  {
    id: 9,
    name: "Tacos al Pastor",
    desc: "Pork tacos with pineapple",
    price: "480",
    time: "15 min",
    review: "4.8",
    location: "Gerji",
    distance: "6 km away",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop",
  },
  {
    id: 19,
    name: "Chicken Tikka",
    desc: "Creamy tomato curry with naan",
    price: "680",
    time: "25 min",
    review: "4.8",
    location: "Hayat",
    distance: "7 km away",
    img: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=600&h=400&fit=crop",
  },
];

const Specials = ({ setCart }) => {
  const navigate = useNavigate();
  const [currentBanner, setCurrentBanner] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
  const [showAllTop, setShowAllTop] = useState(false);
  const [showAllSuggested, setShowAllSuggested] = useState(false);

  React.useEffect(() => {
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

        {/* Search Bar */}
        <div className="mb-8">
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
          {topRated.map((item) => (
            <div 
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
            </div>
          ))}
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
          {suggested.map((item) => (
            <div 
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
            </div>
          ))}
        </div>
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
  );
};

export default Specials;
