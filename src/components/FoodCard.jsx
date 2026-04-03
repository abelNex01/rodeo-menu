import React from 'react';
import { motion } from 'framer-motion';
import { Star, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FoodCard = ({ item, handleQuickAdd }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={() => navigate(`/food/${item.id}`)}
      className="bg-white rounded-[20px] p-1.5 flex flex-col shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] cursor-pointer active:scale-[0.98] transition-all"
    >
      {/* Top Image Section */}
      <div className="w-full h-[140px] rounded-[16px] overflow-hidden relative mb-2">
        <img 
          src={item.img} 
          alt={item.name} 
          loading="lazy"
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
  );
};

export default React.memo(FoodCard);
