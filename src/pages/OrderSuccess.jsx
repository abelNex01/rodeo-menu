import React from "react";
import { motion } from "framer-motion";

// Pre-calculate confetti values to avoid strict randomness during renders
// and create a realistic radial explosion
const CONFETTI_PIECES = Array.from({ length: 50 }).map((_, i) => {
  const angle = (Math.random() * 360) * (Math.PI / 180);
  const distance = 60 + Math.random() * 120;
  const colors = ["bg-[#22C55E]", "bg-[#4ADE80]", "bg-[#16A34A]"];
  return {
    id: i,
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance - 20,
    rotation: Math.random() * 360 + 180,
    scale: 0.4 + Math.random() * 0.6,
    delay: Math.random() * 0.15,
    color: colors[Math.floor(Math.random() * colors.length)],
  };
});

const circleVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.1 },
  },
};

const checkVariants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: { duration: 0.4, delay: 0.3, ease: "easeInOut" },
  },
};

const confettiVariants = {
  hidden: { opacity: 0, scale: 0, x: 0, y: 0 },
  visible: (custom) => ({
    opacity: [0, 1, 1, 0],
    scale: [0, custom.scale, custom.scale, custom.scale],
    x: custom.x,
    y: custom.y,
    rotate: custom.rotation,
    transition: {
      duration: 1.2,
      delay: custom.delay,
      ease: "easeOut",
      times: [0, 0.1, 0.7, 1],
    },
  }),
};

const textVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.5, ease: "easeOut" },
  },
};

const slotVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, delay: 0.6 },
  },
};

const receiptVariants = {
  hidden: { y: "-100%" },
  visible: {
    y: "0%",
    transition: { type: "spring", stiffness: 120, damping: 18, delay: 0.8 },
  },
};

const OrderSuccess = () => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center pt-10 font-sans overflow-hidden">
      {/* Celebration Area */}
      <div className="relative w-full flex justify-center items-center mb-6">
        {/* Confetti */}
        <div className="absolute w-[280px] h-[280px] flex justify-center items-center pointer-events-none">
          {CONFETTI_PIECES.map((piece) => (
            <motion.div
              key={piece.id}
              custom={piece}
              variants={confettiVariants}
              initial="hidden"
              animate="visible"
              className={`absolute w-1.5 h-3 rounded-sm ${piece.color}`}
            />
          ))}
        </div>

        {/* Green Success Circle */}
        <motion.div
          variants={circleVariants}
          initial="hidden"
          animate="visible"
          className="w-[90px] h-[90px] rounded-full bg-[#22C55E] flex justify-center items-center relative z-10"
        >
          <motion.svg
            width="46"
            height="46"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path d="M6 12L10 16L18 7" variants={checkVariants} />
          </motion.svg>
        </motion.div>
      </div>


      <motion.h1
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="text-gray-900 text-[26px] font-bold tracking-tight z-10 relative"
      >
       Order Complete
      </motion.h1>

      {/* Receipt Printer Area */}
      <div className="relative mt-8 flex flex-col items-center w-full max-w-[320px]">
        {/* Printer Slot */}
        <motion.div
          variants={slotVariants}
          initial="hidden"
          animate="visible"
          className="w-[280px] h-[6px] bg-[#E5E7EB] rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] relative z-20"
        />

        {/* Receipt Container & Mask */}
        <div className="w-[260px] overflow-hidden relative z-10 -mt-[3px]">
          <motion.div
            variants={receiptVariants}
            initial="hidden"
            animate="visible"
            className="w-full bg-white rounded-b-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] border border-gray-100 pb-2"
          >
            {/* Jagged Top Edge (SVG) */}
            <svg
              className="w-full h-[6px] text-white fill-current block drop-shadow-[0_-1px_1px_rgba(0,0,0,0.02)]"
              preserveAspectRatio="none"
              viewBox="0 0 100 8"
            >
              <path d="M0,8 L0,0 L5,8 L10,0 L15,8 L20,0 L25,8 L30,0 L35,8 L40,0 L45,8 L50,0 L55,8 L60,0 L65,8 L70,0 L75,8 L80,0 L85,8 L90,0 L95,8 L100,0 L100,8 Z" />
            </svg>

            {/* Receipt Content */}
            <div className="px-5 pt-5 pb-4 flex flex-col gap-4">
              {/* Row 1: User & Points */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="w-[30px] h-[30px] rounded bg-[#EADDFF] flex justify-center items-center text-[#4F378B] font-bold text-[11px] tracking-wide">
                    SH
                  </div>
                  <span className="text-[14px] font-semibold text-gray-900">
                    Sebastian Henderson
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-[14px] h-[14px] rounded-full bg-gray-200 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  </div>
                  <span className="text-[13px] font-medium text-gray-500">
                    13,521
                  </span>
                </div>
              </div>

              {/* Row 2: Method & Date */}
              <div className="flex flex-col gap-0.5 mt-1">
                <div className="flex items-center gap-2">
                  <div className="w-[22px] h-[22px] rounded-sm bg-[#FFC627] flex items-center justify-center">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2L22 12L12 22L2 12L12 2Z" fill="white" />
                    </svg>
                  </div>
                  <span className="text-[14px] font-bold text-gray-900">
                    e-Transfer®
                  </span>
                </div>
                <span className="text-[12px] text-gray-400 font-medium ml-[30px]">
                  May 12th, 2024
                </span>
              </div>

              {/* Row 3: Action Button */}
              <div className="w-full mt-2 border-2 border-dashed border-gray-200 bg-[#F9FAFB] rounded-lg py-2 flex justify-center items-center">
                <span className="text-[13px] font-medium text-gray-500">
                 Payment
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;