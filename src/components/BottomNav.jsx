import { useNavigate, useLocation } from "react-router-dom";
import { HiFire, HiBell } from "react-icons/hi";
import { IoFastFood } from "react-icons/io5";
import { BsCreditCard2Back } from "react-icons/bs";
import { ClipboardList } from "lucide-react";

const BottomNav = ({ cartCount = 0, isCalling, handleCallWaiter }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const NavItem = ({ icon, label, active, onClick, badge }) => (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-1 flex-1 py-2 relative group"
    >
      <div
        className={`text-[22px] flex items-center justify-center transition-colors duration-300 ${
          active ? "text-white" : "text-gray-400 group-hover:text-gray-200"
        }`}
      >
        {icon}
      </div>
      <span
        className={`text-[11px] font-semibold transition-colors duration-300 ${
          active ? "text-white" : "text-gray-500 group-hover:text-gray-300"
        }`}
      >
        {label}
      </span>
      {/* Active indicator dot */}
      {active && (
        <div className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-white" />
      )}
      {/* Badge */}
      {badge > 0 && (
        <span className="absolute top-1 right-1/4 bg-[#ef4444] text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-[#1c1c1e] z-20 pointer-events-none">
          {badge}
        </span>
      )}
    </button>
  );

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[92%] max-w-[420px] z-[999]">
      {/* Dark Pill Navbar */}
      <div className="relative bg-[#1c1c1e] rounded-[36px] h-[72px] flex items-center shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
        {/* Left side nav items */}
        <div className="flex items-center flex-1 pl-3 pr-1">
          <NavItem
            icon={<IoFastFood />}
            label="Menu"
            active={isActive("/categories")}
            onClick={() => navigate("/categories")}
          />
          <NavItem
            icon={<ClipboardList size={22} />}
            label="Orders"
            active={isActive("/orders")}
            onClick={() => navigate("/orders")}
            badge={cartCount}
          />
        </div>

        {/* Center spacer for the floating button */}
        <div className="w-[76px] flex-shrink-0" />

        {/* Right side nav items */}
        <div className="flex items-center flex-1 pl-1 pr-3">
          <NavItem
            icon={<HiFire />}
            label="Specials"
            active={isActive("/specials")}
            onClick={() => navigate("/specials")}
          />
          <NavItem
            icon={<BsCreditCard2Back />}
            label="Pay"
            active={isActive("/payment")}
            onClick={() => navigate("/payment")}
          />
        </div>

        {/* Center Floating Call Waiter Button */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-5">
          {/* Ping animation when calling */}
          {isCalling && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[72px] h-[72px] rounded-full border-2 border-amber-400 animate-ping opacity-60" />
            </div>
          )}

          {/* Orange ring */}
          <div
            className={`w-[68px] h-[68px] rounded-full flex items-center justify-center transition-all duration-300 ${
              isCalling
                ? "bg-gradient-to-br from-amber-400 to-orange-500 shadow-[0_4px_20px_rgba(241,171,21,0.5)]"
                : "bg-gradient-to-br from-amber-400 to-amber-500 shadow-[0_4px_20px_rgba(241,171,21,0.3)]"
            }`}
          >
            {/* Inner white/dark circle */}
            <button
              onClick={handleCallWaiter}
              className={`w-[56px] h-[56px] rounded-full flex flex-col items-center justify-center transition-all duration-300 active:scale-90 ${
                isCalling
                  ? "bg-[#1c1c1e] text-amber-400"
                  : "bg-[#fafafa] text-[#1c1c1e] hover:bg-white"
              }`}
            >
              <HiBell
                size={22}
                className={isCalling ? "animate-bounce" : ""}
              />
              <span
                className={`text-[9px] font-black mt-0.5 uppercase tracking-wider ${
                  isCalling ? "text-amber-400" : "text-gray-600"
                }`}
              >
                {isCalling ? "..." : "Call"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
