import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";
import rodeomini from "../assets/rodeomini.png";
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
  ChevronDown
} from "lucide-react";

// Expanded to 6 categories
const quickCategories = [
  { id: 1, name: "Salads", icon: <Leaf size={20} className="text-gray-700" /> },
  { id: 2, name: "Main Course", icon: <UtensilsCrossed size={20} className="text-gray-700" /> },
  { id: 3, name: "Pasta", icon: <Soup size={20} className="text-gray-700" /> },
  { id: 4, name: "Fast Food", icon: <Pizza size={20} className="text-gray-700" /> },
  { id: 5, name: "Drinks", icon: <Coffee size={20} className="text-gray-700" /> },
  { id: 6, name: "Desserts", icon: <Cake size={20} className="text-gray-700" /> },
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
      
      {/* Search Bar (Now without red container) */}
      <div className="px-4 pt-4 mb-6">
        <div className="flex items-center bg-white rounded-xl px-4 py-3.5 shadow-sm border border-gray-100">
          <Search size={20} className="text-gray-400 min-w-[20px]" />
          <input 
            type="text" 
            placeholder="Search any recipes of your choice..." 
            className="flex-1 bg-transparent outline-none px-3 text-[14px] text-gray-700 placeholder:text-gray-400" 
          />
          <div className="w-[1px] h-5 bg-gray-200 mx-1"></div>
          <button className="p-1 text-[#a0351a]">
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      <div className="px-4">
        {/* Rest of the content */}

      {/* Hero Banner Slider */}
      <div className="relative h-[160px] mb-6 overflow-hidden rounded-[12px]  shadow-md cursor-pointer" onClick={() => navigate('/menu')}>
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

      {/* Menu Categories Grid */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[17px] md:text-xl font-bold text-gray-900">Menu Categories</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {quickCategories.map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => navigate('/menu')}
              className="bg-white rounded-[12px] p-2 md:p-2.5 flex items-center gap-3 shadow-[0_2px_10px_-6px_rgba(0,0,0,0.05)] md:hover:shadow-md cursor-pointer active:scale-95 transition-all"
            >
              <div className="w-10 h-10 md:w-11 md:h-11 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                {cat.icon}
              </div>
              <span className="flex-1 text-[13px] md:text-[14px] font-semibold text-gray-800 truncate">
                {cat.name}
              </span>
              <ChevronRight size={16} className="text-gray-300 shrink-0 md:w-5 md:h-5 md:opacity-0 md:group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>

      {/* Main Foods Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[17px] md:text-xl font-bold text-gray-900">Food and Drinks Menu</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 pb-4">
          {allFoods.map((item) => (
            <div 
              key={item.id}
              onClick={() => navigate(`/food/${item.id}`)}
              className="bg-white rounded-[20px] p-2.5 flex flex-col shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] cursor-pointer active:scale-[0.98] transition-all"
            >
              {/* Top Image Section */}
              <div className="w-full h-[140px] rounded-[16px] overflow-hidden relative mb-3">
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
                <h4 className="text-[15px] font-bold text-gray-900 mb-1 leading-tight tracking-tight line-clamp-1">{item.name}</h4>
                
                {/* Product Description */}
                <p className="text-[11px] text-gray-400 font-medium mb-4 line-clamp-1">{item.desc}</p>
                
                {/* Bottom Row: Price & Time Badge (Replacing Share Icon) */}
                <div className="mt-auto flex justify-between items-center">
                  <button 
                    onClick={(e) => handleQuickAdd(e, item)}
                    className="bg-[#22c55e] text-white text-[13px] font-bold px-3 py-1.5 rounded-[8px] tracking-wide relative overflow-hidden group"
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
    </div>
  </div>
);
};

export default Categories;