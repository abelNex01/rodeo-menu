import { useNavigate } from "react-router-dom";
import { ScanLine } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen bg-[#f8f9fa] flex flex-col justify-end overflow-hidden font-sans">
      {/* Background Image Area */}
      <div className="absolute inset-0 z-0 bg-[#f8f9fa]">
        {/* Adjusted image placeholder and centering */}
        <div className="w-full h-[70%] relative flex justify-center mt-8 overflow-hidden">
          
          <img 
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop" 
            alt="Welcome Food" 
            className="w-full h-full object-cover object-center mt-12 md:mt-16 rounded-t-3xl shadow-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f8f9fa] via-transparent to-transparent h-40"></div>
        </div>
        
        {/* Brand positioning at the top floating */}
        <div className="absolute top-12 left-0 right-0 flex flex-col items-center">
            <h1 className="font-[Lobster] text-6xl tracking-wide text-gray-900 drop-shadow-sm">Rodeo</h1>
            <p className="font-sans text-[13px] font-bold tracking-[0.2em] text-gray-500 uppercase mt-1">Restaurant</p>
        </div>
      </div>

      {/* Bottom Card */}
      <div className="relative z-10 bg-[#111111] w-full rounded-t-3xl pt-6 pb-6 px-5 flex flex-col items-center shadow-[0_-10px_40px_rgba(0,0,0,0.1)] h-[35%] justify-between">
        
        <div className="flex items-start gap-3 w-full">
          <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
             <ScanLine size={28} className="text-white" />
          </div>
          <div className="flex flex-col pt-1">
            <h2 className="text-white text-[28px] font-extrabold leading-tight mb-1">Welcome</h2>
            <p className="text-gray-400 text-[14px] font-medium tracking-wide">Scan. Browse. Enjoy.</p>
          </div>
        </div>

        <button 
          onClick={() => navigate('/categories')}
          className="w-full bg-[#f86d38] hover:bg-[#e65c27] transition-all duration-300 active:scale-95 text-white text-[16px] font-bold py-3.5 rounded-full mt-5 shadow-lg shadow-[#f86d38]/20"
        >
          Continue
        </button>
        
        <p className="text-gray-500 text-[13px] font-medium mt-3">
          No app download required
        </p>

        {/* Home indiciator dash at the bottom */}
        <div className="w-[120px] h-[5px] bg-gray-700/50 rounded-full mt-4"></div>
      </div>
    </div>
  );
};

export default Welcome;
