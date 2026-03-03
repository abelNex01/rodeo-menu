import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, ChevronDown, ArrowLeft } from "lucide-react";
import { HiBell } from "react-icons/hi";
import rodeomini from "../assets/rodeomini.png";

const Header = ({ isCalling, handleCallWaiter }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Pages where we should show a back button instead of/next to the logo
  const isMenuPage = ["/categories", "/menu"].includes(location.pathname);
  
  const getPageTitle = () => {
    if (location.pathname.startsWith("/food/")) return "Details";
    if (location.pathname === "/orders") return "Order";
    if (location.pathname === "/payment") return "Payment";
    if (location.pathname === "/specials") return "Specials";
    if (location.pathname === "/order-success") return "Success";
    return "";
  };

  const title = getPageTitle();

  return (
    <div className="bg-white px-5 pt-6 pb-4 shadow-sm border-b border-gray-100 sticky top-0 z-[100]">
      {/* Top Header */}
      <div className="relative flex justify-between items-center z-50">
        
        {/* Left Side: Logo or Back Button + Title */}
        <div className="flex items-center gap-3">
          {!isMenuPage && (
            <button 
              onClick={() => navigate("/categories")}
              className="p-1 -ml-1 text-gray-900 transition-colors"
            >
              <ArrowLeft size={24} strokeWidth={2.5} />
            </button>
          )}
          
          {isMenuPage ? (
            <img src={rodeomini} alt="Rodeo Logo" className="h-[50px] w-auto object-contain" />
          ) : (
            <span className="text-[18px] font-bold text-gray-900">{title}</span>
          )}
        </div>

        {/* Actions (Right Side) */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <div className="relative group cursor-pointer bg-gray-100 rounded-full px-3 py-2 border border-gray-200 flex items-center gap-1">
            <span className="text-[12px] font-bold text-gray-700">ENG</span>
            <ChevronDown size={14} className="text-gray-500 group-hover:text-gray-900 transition-colors" />
            
            {/* Dropdown Menu */}
            <div className="absolute top-10 right-0 w-[110px] bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all overflow-hidden flex flex-col py-1 mt-1 origin-top z-50">
               <div className="px-3 py-2.5 text-[12px] font-bold text-[#a0351a] bg-red-50/50 flex items-center gap-2">
                 <span>🇺🇸</span> ENG
               </div>
               <div className="px-3 py-2.5 text-[12px] font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2">
                 <span>🇪🇹</span> AMH
               </div>
            </div>
          </div>

          {/* Call Waiter */}
          <div className="flex items-center gap-3">
            <AnimatePresence>
              {isCalling && (
                <motion.span 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="text-[11px] font-black text-amber-600 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100 shadow-sm"
                >
                  Calling Waiter...
                </motion.span>
              )}
            </AnimatePresence>
            
            <div className="relative">
              {/* Outer Ring (Orange/Amber Gradient) */}
              <div 
                className={`w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCalling 
                    ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-[0_4px_15px_rgba(241,171,21,0.5)]' 
                    : 'bg-gradient-to-br from-amber-400 to-amber-500 shadow-[0_4px_15px_rgba(241,171,21,0.2)]'
                }`}
              >
                {/* Ping animation when calling */}
                {isCalling && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="absolute w-[52px] h-[52px] rounded-full border-2 border-amber-400 animate-ping opacity-60"></div>
                  </div>
                )}
                
                {/* Inner Button */}
                <button 
                  onClick={handleCallWaiter}
                  className={`w-[42px] h-[42px] rounded-full flex flex-col items-center justify-center transition-all duration-300 active:scale-95 z-10 ${
                    isCalling 
                      ? 'bg-[#1c1c1e] text-amber-400' 
                      : 'bg-[#fafafa] text-[#1c1c1e] hover:bg-white'
                  }`}
                >
                  <HiBell size={18} className={isCalling ? "animate-bounce" : ""} />
                  <span className={`text-[8px] font-black mt-0.5 uppercase tracking-tighter ${isCalling ? "text-amber-400" : "text-gray-600"}`}>
                    {isCalling ? "..." : "Call"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
