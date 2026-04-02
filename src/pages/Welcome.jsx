import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, QrCode, Clock, ChefHat } from "lucide-react";
import heroImg from "../assets/hero-welcome.png";
import rodeologo from "../assets/rodeo.png";

const Welcome = () => {
  const navigate = useNavigate();

  // Pre-fetch categories page for a smoother transition
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = "/categories";
    document.head.appendChild(link);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#E80B0B] font-sans selection:bg-white/30 selection:text-white">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-black/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      </div>

      {/* Top Navigation / Logo */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-8"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
          <span className="text-[11px] font-bold text-white uppercase tracking-widest">
            Live Now
          </span>
        </div>
      </motion.div>

      {/* Hero Content Section */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
        {/* Main Floating Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.2,
          }}
          className="relative w-full max-w-[400px] aspect-square group"
        >
          {/* Decorative Halo */}
          <div className="absolute inset-0 bg-white/10 blur-2xl scale-75 group-hover:scale-95 transition-transform duration-1000" />

          <img
            src={heroImg}
            alt="Signature Dish"
            className="relative w-full h-full  object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] z-20 transition-transform duration-500 hover:scale-105"
          />

          {/* Floating Action Badges */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-4 top-1/4 z-30 bg-white/95 backdrop-blur-xl p-3 rounded-2xl shadow-2xl border border-white/50"
          >
            <QrCode className="w-5 h-5 text-amber-500" />
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute -left-4 bottom-1/4 z-30 bg-white/95 backdrop-blur-xl p-3 rounded-2xl shadow-2xl border border-white/50"
          >
            <ChefHat className="w-5 h-5 text-[#E80B0B]" />
          </motion.div>
        </motion.div>

        {/* Textual Content */}
        <div className="mt-12 text-center max-w-[340px]">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col items-center text-center px-4"
          >
            {/* Minimalist Subheader */}
            <div className="flex items-center gap-3 mb-6 opacity-40">
              <div className="h-[1px] w-8 bg-white" />
              <span className="text-[12px] font-bold uppercase tracking-[0.5em] text-white whitespace-nowrap">
                Est. 1990
              </span>
              <div className="h-[1px] w-8 bg-white" />
            </div>

            {/* Elevated Branding Title */}
            <div className="space-y-2 mb-6">
              <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.85]">
                Rodeo Addis
              </h1>
              <h2 className="text-lg md:text-xl font-medium text-white/50 uppercase tracking-[0.25em]">
                Restaurant
              </h2>
            </div>

            {/* Elegant Tagline */}
            <p className="text-white/30 text-[14px] max-w-[280px] font-medium italic mb-4">
              "Crafting culinary stories where every dish celebrates passion and
              excellence."
            </p>
          </motion.div>

          {/* Professional Action Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            onClick={() => navigate("/categories")}
            className="group relative w-full py-5 bg-white text-black font-black text-sm uppercase tracking-widest rounded-xl overflow-hidden transition-all shadow-[0_15px_35px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              Explore Our Menu
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        </div>

        {/* Subtle Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-12 flex items-center gap-8"
        >
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
              Open Now
            </span>
          </div>
          <div className="w-[1px] h-3 bg-white/10" />
          <div className="flex items-center gap-2">
            <QrCode className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
              Digital Menu
            </span>
          </div>
        </motion.div>
      </div>

      {/* Background Texture Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.6"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
    </div>
  );
};

export default Welcome;
