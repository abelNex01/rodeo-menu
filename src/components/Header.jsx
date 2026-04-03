import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, ChevronDown, ArrowLeft, User } from "lucide-react";
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

  const [selectedLang, setSelectedLang] = React.useState("ENG");

  return (
    <div className="bg-white px-4 py-2 shadow-sm border-b border-gray-100 sticky top-0 z-[100]">
      {/* Top Header */}
      <div className="relative flex justify-between items-center z-50">
        
        {/* Left Side: Logo or Back Button + Title */}
        <div className="flex items-center gap-3">
          {!isMenuPage && (
            <button 
              onClick={() => navigate("/categories")}
              className="p-1 -ml-1 text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} strokeWidth={2.5} />
            </button>
          )}
          
          {isMenuPage ? (
            <img src={rodeomini} alt="Rodeo Logo" className="h-[32px] w-auto object-contain" />
          ) : (
            <span className="text-[16px] font-bold text-gray-900">{title}</span>
          )}
        </div>

        {/* Actions (Right Side) */}
        <div className="flex items-center gap-2">
          {/* Language & Alert Container */}
          <div className="relative flex items-center justify-end h-[40px]">
            {/* Language Selector - Fades out when calling */}
            <div className={`transition-all duration-500 ${isCalling ? "opacity-0 invisible translate-x-4" : "opacity-100 visible translate-x-0"}`}>
              <div className="flex items-center bg-gray-100/80 rounded-full p-1 border border-gray-200/50">
                <button 
                  onClick={() => setSelectedLang("ENG")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all duration-300 ${
                    selectedLang === "ENG" 
                      ? "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] scale-100" 
                      : "bg-transparent opacity-50 hover:opacity-100"
                  }`}
                >
                  <img src="/uk.svg" alt="UK" className="w-4 h-4 rounded-full object-cover" />
                  <span className={`text-[10px] font-bold ${selectedLang === "ENG" ? "text-black" : "text-gray-600"}`}>ENG</span>
                </button>
                <button 
                  onClick={() => setSelectedLang("AMH")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all duration-300 ${
                    selectedLang === "AMH" 
                      ? "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] scale-100" 
                      : "bg-transparent opacity-50 hover:opacity-100"
                  }`}
                >
                  <img src="/ethio.svg" alt="ETH" className="w-4 h-4 rounded-full object-cover" />
                  <span className={`text-[10px] font-bold ${selectedLang === "AMH" ? "text-black" : "text-gray-600"}`}>AMH</span>
                </button>
              </div>
            </div>

            {/* Calling Waiter Alert Overlay */}
            <AnimatePresence>
              {isCalling && (
                <motion.div 
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.9 }}
                  className="absolute right-0 z-50"
                >
                  <span className="text-[11px] font-black text-gray-600 bg-amber-50 px-4 py-2.5 rounded-2xl border-2 border-amber-200 shadow-[0_4px_15px_rgba(245,158,11,0.15)] whitespace-nowrap flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    Calling Waiter...
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Call Waiter Button */}
          <div className="relative">
            {/* Outer Ring (Orange/Amber Gradient) */}
            <div 
              className={`w-[40px] h-[40px] rounded-full flex items-center justify-center transition-all duration-300 ${
                isCalling 
                  ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-[0_4px_15px_rgba(241,171,21,0.5)]' 
                  : 'bg-gradient-to-br from-amber-400 to-amber-500 shadow-[0_4px_15px_rgba(241,171,21,0.2)]'
              }`}
            >
              {/* Ping animation when calling */}
              {isCalling && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="absolute w-[40px] h-[40px] rounded-full border-2 border-amber-400 animate-ping opacity-60"></div>
                </div>
              )}
              
              {/* Inner Button */}
              <button 
                onClick={handleCallWaiter}
                className={`w-[32px] h-[32px] rounded-full flex flex-col items-center justify-center transition-all duration-300 active:scale-95 z-10 ${
                  isCalling 
                    ? 'bg-[#1c1c1e] text-amber-400' 
                    : 'bg-[#fafafa] text-[#1c1c1e] hover:bg-white'
                }`}
              >
                {isCalling ? (
                  <User size={14} className="animate-bounce" />
                ) : (
                  <HiBell size={14} />
                )}
                <span className={`text-[7px] font-black mt-0 uppercase tracking-tighter ${isCalling ? "text-amber-400" : "text-gray-600"}`}>
                  {isCalling ? "..." : "Call"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
