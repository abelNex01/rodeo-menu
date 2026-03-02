import React from 'react';
import { useNavigate } from "react-router-dom";
import { ScanLine } from "lucide-react";

// User's specified logo import
import rodeologo from '../assets/rodeo.png';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Injecting specific Google Fonts to exactly match the blocky/retro typography in the image */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Squada+One&display=swap');
          
          .bg-terracotta {
            background-color: #A03116;
          }
          .text-cream {
            color: #F2E0B9;
          }
          .border-cream {
            border-color: #F2E0B9;
          }
          .bg-cream {
            background-color: #F2E0B9;
          }
          .text-terracotta {
            color: #A03116;
          }
          
          .font-display {
            font-family: 'Squada One', system-ui, sans-serif;
          }
          .font-tall {
            font-family: 'Bebas Neue', system-ui, sans-serif;
          }

          /* Subtle texture overlay to match the "paper/painted" feel of the image */
          .noise-bg {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.06'/%3E%3C/svg%3E");
          }
        `}
      </style>

      {/* Main Container: Fixed to screen, no scrolling, matching vignette shadow */}
      <div className="relative w-full h-[100dvh] bg-terracotta noise-bg flex flex-col justify-between overflow-hidden shadow-[inset_0_0_80px_rgba(0,0,0,0.15)] select-none">
        


     

        {/* Center Graphic Placeholder (Where the hat/bean was) */}
        <div className="flex-1 flex items-center justify-center relative z-10 w-full px-12 -mt-4">
          <img 
            src={rodeologo} 
            alt="Rodeo Logo" 
            className="w-full max-w-[320px] h-auto object-contain drop-shadow-xl" 
          />
        </div>

        {/* Bottom Content Area */}
        <div className="w-full relative z-10">
          <div className="px-8 pb-8">
            
            {/* Splash Accents (The three drops above the main text) */}
            <div className="flex gap-2 mb-3 ml-1">
              <div className="w-2.5 h-6 bg-cream rounded-[40%] transform -rotate-45" />
              <div className="w-3.5 h-8 bg-cream rounded-[40%] transform -rotate-12 -mt-2" />
              <div className="w-2.5 h-5 bg-cream rounded-[40%] transform rotate-12 mt-1" />
            </div>

            {/* Replaced Image Text with User's Text Logic but kept Image's Typography Style */}
            <h2 className="font-display text-cream text-[3.25rem] leading-[1.05] tracking-wide uppercase drop-shadow-sm">
              Welcome,
              <br />
              Scan. Browse.
              <br />
              Order!
            </h2>
            
            {/* Integrated Lucide Icon & Small Text gracefully */}
            <div className="flex items-center gap-2.5 mt-5 text-cream/80 pl-1">
              <ScanLine size={18} />
              <p className="font-sans text-[13px] font-bold tracking-[0.12em] uppercase">
                No app download required
              </p>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div 
            onClick={() => navigate('/categories')}
            className="w-full border-t border-cream/30 px-8 py-5 flex justify-between items-center cursor-pointer active:bg-black/10 transition-colors duration-200"
          >
            <span className="text-cream font-tall text-3xl tracking-[0.12em] mt-1.5 opacity-90">
              Continue
            </span>
            
            {/* Square Button from Image */}
            <button className="w-12 h-12 bg-cream text-terracotta flex items-center justify-center rounded-[2px] transition-transform active:scale-95 shadow-md pointer-events-none">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

export default Welcome;