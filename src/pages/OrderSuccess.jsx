import { Check } from "lucide-react";

const OrderSuccess = () => {
  return (
    <div className="w-full flex flex-col relative font-sans pt-20 pb-[100px] overflow-hidden">
      
      {/* Celebration Icon Area */}
      <div className="relative w-full flex justify-center items-center mb-8 mt-4">
        
        {/* Decorative Confetti */}
        <div className="absolute w-[280px] h-[280px] flex justify-center items-center pointer-events-none">
          <div className="absolute top-[5%] left-[15%] w-4 h-4 rounded-full bg-green-400"></div>
          <div className="absolute top-[0%] right-[20%] w-3 h-3 rounded-full bg-[#f86d38]"></div>
          <div className="absolute bottom-[-5%] right-[25%] w-5 h-5 rounded-full bg-yellow-400"></div>
          <div className="absolute bottom-[-10%] left-[30%] w-2 h-2 rounded-full bg-blue-400"></div>
          
          <div className="absolute top-[15%] left-[-5%] w-8 h-8 rounded-full border-[3px] border-yellow-400 border-t-transparent border-l-transparent -rotate-45"></div>
          <div className="absolute bottom-[15%] left-[5%] w-10 h-10 rounded-full border-[3px] border-green-400 border-b-transparent border-r-transparent rotate-[20deg]"></div>
          <div className="absolute top-[10%] right-[5%] w-12 h-12 rounded-full border-[3px] border-[#f86d38] border-b-transparent border-l-transparent rotate-12"></div>
          <div className="absolute top-[45%] right-[-5%] w-6 h-6 rounded-full border-2 border-purple-400"></div>
        </div>

        {/* Checkmark Circle */}
        <div className="w-[110px] h-[110px] rounded-full bg-[#f86d38] flex justify-center items-center shadow-[0_20px_50px_-10px_rgba(248,109,56,0.3)] relative z-10 border-[6px] border-[#f8f9fa] rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
          <Check size={56} strokeWidth={3} className="text-white" />
        </div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col items-center px-8 text-center space-y-2 relative z-10">
        <h1 className="text-gray-900 text-[28px] font-extrabold leading-[1.2] max-w-[90%]">
          Your Order has been<br />accepted
        </h1>
        <p className="text-gray-500 text-[15px] font-medium leading-relaxed max-w-[85%]">
          Your order has been placed successfully and is on its way to being processed.
        </p>
      </div>

    </div>
  );
};

export default OrderSuccess;
