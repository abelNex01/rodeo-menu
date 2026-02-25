import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, 
  MoreHorizontal, 
  ChefHat, 
  ClipboardList 
} from "lucide-react";

// --- The Core Component ---
const FoodDetails = ({ cart, setCart }) => {
  const navigate = useNavigate();

  // Preserved User Logic
  const handleAddToList = () => {
    console.log("Adding to list from details");
    const newItem = {
      cartId: Date.now(),
      id: 1, // Currently hardcoded
      name: "Creamy Mustard Shallot Chicken",
      price: 390,
      img: "https://images.unsplash.com/photo-1598515320092-3c87f3b89083?w=800&fit=crop",
      time: "45 min"
    };
    setCart(prev => [...(prev || []), newItem]);
    navigate("/orders");
  };

  return (
    <div className="w-full h-full relative font-sans overflow-x-hidden bg-white flex flex-col">
      
      {/* Scrollable Content Container */}
      <div className="flex-1 overflow-y-auto w-full pb-8 custom-scrollbar">
        
        {/* Full-width large hero image area */}
        <div className="relative w-full h-[55vh] overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1598515320092-3c87f3b89083?w=800&fit=crop" 
            alt="Creamy Mustard Shallot Chicken" 
            className="w-full h-full object-cover"
          />
          
          {/* Gradients matching the reference image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40"></div>
          
          {/* Top Navigation Overlay */}
          <div className="absolute top-12 w-full px-6 flex justify-between items-center z-20">
            <button 
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-all active:scale-95 shadow-sm"
            >
              <ChevronLeft size={22} className="mr-0.5" />
            </button>
            <span className="text-white font-medium text-[15px] tracking-wide shadow-sm">
              Nutritions
            </span>
            <button 
              className="w-10 h-10 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-all active:scale-95 shadow-sm"
            >
              <MoreHorizontal size={22} />
            </button>
          </div>
          
          {/* Over-image Text (Mapped from user content to match reference layout) */}
          <div className="absolute bottom-10 w-full px-6 z-20">
            {/* Pill Badge */}
            <div className="bg-white/95 text-[#f84a4a] px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wide w-max mb-4 shadow-sm">
              Top Rated Recipe
            </div>
            
            <div className="flex justify-between items-end mb-1">
              <h1 className="text-[32px] font-light text-white leading-[1.15] max-w-[70%]">
                Creamy Mustard Chicken
              </h1>
              <span className="text-[28px] text-white font-light tracking-tight">
                $390
              </span>
            </div>
            
            <div className="flex justify-between items-center mt-3">
              <span className="text-white/80 text-[13px] font-light">By Rachel Gurjar</span>
              <span className="text-white/80 text-[13px] font-light">45 min cook time</span>
            </div>
          </div>
        </div>

        {/* Bottom Sheet Card */}
        <div className="relative z-30 bg-white rounded-t-[36px] px-6 py-7 -mt-6 shadow-[0_-15px_40px_rgba(0,0,0,0.15)] flex flex-col min-h-[45vh]">
          
          {/* Card Header */}
          <div className="flex justify-between items-end mb-3">
            <h2 className="text-[19px] font-bold text-gray-900 leading-tight max-w-[75%]">
              Creamy Mustard Shallot Chicken
            </h2>
            <span className="text-gray-400 font-medium text-sm mb-0.5">4.8 ⭐</span>
          </div>

          <p className="text-gray-500 text-[13px] leading-relaxed font-light mb-8">
            This weeknight one-skillet recipe features creamy mustard chicken breasts in a velvety sauce with Dijon, thyme, and a hint of turmeric. Perfectly served over a bed of mashed potatoes or pasta.
          </p>

          {/* Pillars Layout (Adapting user's Time, Yield, Rating to the reference's pillared UI) */}
          <div className="flex justify-between gap-3 h-[130px] mb-8">
            
            <div className="flex-1 bg-[#f5f7fa] rounded-[22px] flex flex-col items-center justify-between py-3.5 relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 w-full bg-[#e3effd] h-[45%] rounded-[22px] z-0 transition-all duration-500 group-hover:h-[50%]"></div>
              <span className="text-gray-400 text-[11px] font-medium z-10">Time</span>
              <span className="text-gray-900 text-[14px] font-bold z-10">45 min</span>
            </div>

            <div className="flex-1 bg-[#f5f7fa] rounded-[22px] flex flex-col items-center justify-between py-3.5 relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 w-full bg-[#e3effd] h-[65%] rounded-[22px] z-0 transition-all duration-500 group-hover:h-[70%]"></div>
              <span className="text-gray-400 text-[11px] font-medium z-10">Yield</span>
              <span className="text-gray-900 text-[14px] font-bold z-10">2 serv</span>
            </div>

            <div className="flex-1 bg-[#f5f7fa] rounded-[22px] flex flex-col items-center justify-between py-3.5 relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 w-full bg-[#e3effd] h-[85%] rounded-[22px] z-0 transition-all duration-500 group-hover:h-[90%]"></div>
              <span className="text-gray-400 text-[11px] font-medium z-10">Rating</span>
              <span className="text-gray-900 text-[14px] font-bold z-10">4.8</span>
            </div>

          </div>

          {/* Preserved Action Buttons seamlessly integrated at the bottom */}
          <div className="flex gap-2 mt-auto">
            <button 
              onClick={() => navigate('/payment')}
              className="flex-[1.5] bg-[#111111] hover:bg-gray-900 transition-colors py-3.5 rounded-2xl flex items-center justify-center gap-2 text-white font-bold text-[14px] shadow-md"
            >
              <ChefHat size={18} />
              Cook Now
            </button>
            <button 
              onClick={handleAddToList}
              className="flex-1 bg-[#fdfdfd] hover:bg-gray-50 transition-colors py-2 rounded-2xl flex flex-col items-center justify-center text-gray-700 shadow-sm border border-gray-100 border-b-2 group"
            >
              <ClipboardList size={20} className="mb-1 text-[#f84a4a] group-active:scale-95 transition-transform" strokeWidth={2.2} />
              <span className="text-[10px] uppercase font-bold tracking-tight">Add to List</span>
            </button>
            <button 
              className="flex-1 bg-[#fdfdfd] hover:bg-gray-50 transition-colors py-2 rounded-2xl flex flex-col items-center justify-center text-gray-700 shadow-sm border border-gray-100 border-b-2 group"
            >
              <Bell size={20} className="mb-1 text-gray-400 group-active:scale-95 transition-transform" strokeWidth={2.2} />
              <span className="text-[10px] uppercase font-bold tracking-tight">Waiter</span>
            </button>
          </div>
          

        </div>
      </div>
    </div>
  );
};

export default FoodDetails;