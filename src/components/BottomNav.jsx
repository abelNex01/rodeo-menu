import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { FaHorseHead } from "react-icons/fa";
import { BsCreditCard2Back } from "react-icons/bs";
import { ClipboardList } from "lucide-react";

const BottomNav = ({ cartCount = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCalling, setIsCalling] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleCallWaiter = () => {
    if (isCalling) return;
    setIsCalling(true);
    setTimeout(() => {
      setIsCalling(false);
    }, 5000);
  };

  const activeColor = "text-[#f86d38]";
  const inactiveColor = "text-white opacity-90";

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-[420px] z-[999] bg-[#1c1c1e] rounded-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.2)] h-[64px] flex items-center px-2">
      
      {/* Left Items */}
      <div className="flex-1 flex justify-evenly items-center h-full">
        {/* Home */}
        <button 
          className="flex flex-col items-center justify-center gap-1.5 h-full cursor-pointer md:hover:scale-105 transition-transform" 
          onClick={() => navigate("/categories")}
        >
          <HiHome className={`text-[22px] ${isActive("/categories") ? activeColor : inactiveColor}`} />
          <span className={`text-[11px] font-normal tracking-wide ${isActive("/categories") ? activeColor : inactiveColor}`}>Home</span>
        </button>

        {/* Search */}
        <button 
          className="flex flex-col items-center justify-center gap-1.5 h-full cursor-pointer md:hover:scale-105 transition-transform" 
          onClick={() => navigate("/categories")}
        >
          <FiSearch strokeWidth={2.5} className={`text-[22px] ${isActive("/categories") ? activeColor : inactiveColor}`} />
          <span className={`text-[11px] font-normal tracking-wide ${isActive("/categories") ? activeColor : inactiveColor}`}>Search</span>
        </button>
      </div>

      {/* Spacer for Center Button */}
      <div className="w-[75px] shrink-0"></div>

      {/* Right Items */}
      <div className="flex-1 flex justify-evenly items-center h-full">

        {/* Order List */}
        <button 
          className="flex flex-col items-center justify-center gap-1.5 h-full cursor-pointer md:hover:scale-105 transition-transform relative" 
          onClick={() => navigate("/orders")}
        >
          <ClipboardList 
            strokeWidth={isActive("/orders") ? 2.5 : 2} 
            className={`w-[24px] h-[24px] ${isActive("/orders") ? activeColor : inactiveColor}`} 
          />
          {cartCount > 0 && (
            <span className="absolute top-[8px] right-[12px] bg-[#f86d38] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#1c1c1e]">
              {cartCount}
            </span>
          )}
          <span className={`text-[11px] font-normal tracking-wide flex-shrink-0 ${isActive("/orders") ? activeColor : inactiveColor}`}>Order List</span>
        </button>

        {/* Payment */}
        <button 
          className="flex flex-col items-center justify-center gap-1.5 h-full cursor-pointer md:hover:scale-105 transition-transform" 
          onClick={() => navigate("/payment")}
        >
          <BsCreditCard2Back className={`text-[22px] ${isActive("/payment") ? activeColor : inactiveColor}`} />
          <span className={`text-[11px] font-normal tracking-wide ${isActive("/payment") ? activeColor : inactiveColor}`}>Payment</span>
        </button>

      </div>

      {/* Center Floating Button */}
      {/* We use border-[#f8f9fa] to match the app background and create the cutout illusion from the image */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-6 flex flex-col items-center">
        
        {/* Popup Text */}
        {isCalling && (
          <div className="absolute -top-10 bg-white text-gray-800 text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.1)] whitespace-nowrap animate-bounce z-50 pointer-events-none">
            Calling Waiter
            {/* Little triangle pointer for the popup */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
          </div>
        )}

        {/* Pulse Animations */}
        {isCalling && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
             <div className="absolute w-[80px] h-[80px] rounded-full border-2 border-[#f86d38] animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite] opacity-75"></div>
             <div className="absolute w-[80px] h-[80px] rounded-full border-2 border-[#f86d38] animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite] opacity-50" style={{ animationDelay: '0.4s' }}></div>
             <div className="absolute w-[80px] h-[80px] rounded-full border-2 border-[#f86d38] animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite] opacity-25" style={{ animationDelay: '0.8s' }}></div>
          </div>
        )}

        <button 
          onClick={handleCallWaiter}
          className="relative w-[74px] h-[74px] bg-[#f86d38] rounded-full flex items-center justify-center border-[6px] border-[#f8f9fa] shadow-sm transform active:scale-95 transition-transform z-10"
        >
          {/* Using the horse head to represent the logo in the center */}
          <FaHorseHead className="text-white text-[32px] ml-1" />
        </button>
      </div>

    </div>
  );
};

export default BottomNav;
