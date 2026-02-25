import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, 
  Copy, 
  Check, 
  Bell, 
  SlidersHorizontal,
  ArrowRightLeft
} from "lucide-react";

// Preserved Ethiopian bank options, mapped for the new UI
const paymentOptions = [
  { id: 1, name: "Telebirr", num: "0978004968", icon: "T" },
  { id: 2, name: "CBE Birr", num: "100034455678", icon: "C" },
  { id: 3, name: "Dashen Bank", num: "0978004968", icon: "D" },
  { id: 4, name: "Awash Bank", num: "0911223344", icon: "A" },
  { id: 5, name: "Abyssinia", num: "1122334455", icon: "B" },
  { id: 6, name: "Coop Bank", num: "5566778899", icon: "C" },
];

const Payment = ({ cart }) => {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState(null);
  const [tip, setTip] = useState(0);

  const handleCopy = (id, num) => {
    navigator.clipboard.writeText(num);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const tipOptions = [5, 10, 20, 50];
  const subtotal = 800.00;
  const serviceFee = 25.00;
  const total = subtotal + serviceFee + tip;

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans relative overflow-hidden">
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24 custom-scrollbar bg-gray-50/50">
        
        {/* --- Top Red Header Section --- */}
        <div className="bg-[#f01414] pt-12 pb-20 px-6 text-white rounded-b-[36px] relative z-10">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate(-1)}
                className="hover:bg-white/20 p-2 rounded-full transition-colors -ml-2"
              >
                <ChevronLeft size={24} strokeWidth={2.5} />
              </button>
              <div className="flex items-center gap-2">
                <ArrowRightLeft size={18} strokeWidth={2.5} className="rotate-90" />
                <span className="text-[13px] font-bold tracking-widest uppercase">Payment</span>
              </div>
            </div>
            <button className="relative p-2 hover:bg-white/20 rounded-full transition-colors">
              <Bell size={22} />
              <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full border border-[#f01414]"></div>
            </button>
          </div>
        </div>

        {/* --- Overlapping White Content Area --- */}
        <div className="bg-white rounded-t-[36px] -mt-12 relative z-20 px-6 pt-8 min-h-[50vh]">
          
          {/* Greeting & User Profile */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-gray-500 text-[17px] font-medium mb-1">Hello,</p>
              <h1 className="text-[26px] font-bold text-gray-900 leading-none">Complete<br/>Transfer</h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
                <SlidersHorizontal size={18} />
              </button>
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop" 
                alt="User Profile" 
                className="w-11 h-11 rounded-full object-cover"
              />
            </div>
          </div>

          {/* Integrated Tip Section (Adapted smoothly into the clean UI) */}
          <div className="mb-8">
            <div className="flex justify-between items-end mb-3">
               <h2 className="text-[15px] font-bold text-gray-900">Add Tip (Optional)</h2>
               <span className="text-[13px] font-medium text-gray-400">Total: {(total).toFixed(2)} ETB</span>
            </div>
            <div className="flex gap-2">
              {tipOptions.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setTip(amount)}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-[13px] transition-all border ${
                    tip === amount 
                    ? "bg-[#222325] text-white border-[#222325] shadow-md" 
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {amount}
                </button>
              ))}
              <input 
                type="number" 
                placeholder="Custom"
                onChange={(e) => setTip(Number(e.target.value))}
                className="w-[80px] bg-white border border-gray-200 rounded-xl px-2 text-center text-[13px] font-bold placeholder:text-gray-300 outline-none focus:border-[#f01414] transition-colors"
              />
            </div>
          </div>

          {/* --- The Beautiful Timeline Cards --- */}
          <div className="flex flex-col gap-4 pb-8">
            {paymentOptions.map((opt) => {
              // Making the selected/copied card turn into the Dark Card version from the image
              const isDark = copiedId === opt.id;
              
              return (
                <div 
                  key={opt.id} 
                  className={`p-5 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 border ${
                    isDark 
                    ? "bg-[#222325] text-white border-[#222325] shadow-[0_15px_30px_rgba(34,35,37,0.3)] scale-[1.02]" 
                    : "bg-white text-gray-900 border-gray-100"
                  }`}
                >
                  {/* Top section of Card */}
                  <div className="flex justify-between items-start">
                    
                    <div className="flex gap-4">
                      {/* Timeline Icon */}
                      <div className="flex flex-col items-center mt-1">
                        <div className={`w-[34px] h-[34px] rounded-full flex items-center justify-center font-bold text-[14px] border-[2px] ${
                          isDark ? "border-[#f01414] bg-transparent text-[#f01414]" : "border-[#f01414] bg-[#f01414] text-white"
                        }`}>
                          {opt.icon}
                        </div>
                        <div className={`w-[1px] h-4 my-1.5 ${isDark ? "bg-gray-600" : "bg-gray-200"}`}></div>
                        <div className="w-2 h-2 rounded-full bg-[#f01414]"></div>
                      </div>

                      {/* Text Details */}
                      <div className="flex flex-col">
                        <span className={`text-[12px] font-medium mb-0.5 ${isDark ? "text-gray-400" : "text-gray-400"}`}>
                          Transfer via
                        </span>
                        <span className="text-[17px] font-extrabold tracking-tight mb-1">
                          {opt.name}
                        </span>
                        <span className="text-[12px] text-[#f01414] font-bold tracking-wide">
                          Waiting for transfer
                        </span>
                        <span className={`text-[11px] font-medium mt-1 tracking-wider ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                          Acc. Nº {opt.num}
                        </span>
                      </div>
                    </div>

                    {/* Right Notification/Copy Button */}
                    <button 
                      onClick={() => handleCopy(opt.id, opt.num)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isDark 
                        ? "bg-white/10 text-white border border-white/20 hover:bg-white/20" 
                        : "bg-white text-gray-400 border border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {isDark ? <Check size={16} strokeWidth={3} className="text-green-400" /> : <Copy size={16} strokeWidth={2.5} />}
                    </button>
                  </div>

                  {/* Bottom section of Card (Total Amount) */}
                  <div className={`mt-5 pt-4 flex justify-between items-center border-t border-dashed ${
                    isDark ? "border-gray-700" : "border-gray-200"
                  }`}>
                    <span className={`text-[13px] font-medium ${isDark ? "text-gray-400" : "text-gray-400"}`}>
                      Pay amount
                    </span>
                    <button 
                      onClick={() => navigate('/order-success')}
                      className="text-[18px] font-extrabold tracking-tight hover:text-[#f86d38] transition-colors"
                    >
                      {total.toFixed(2)} <span className="text-[12px] font-bold ml-0.5">ETB</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Payment;