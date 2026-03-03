import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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

const OrderSuccess = ({ cart = [] }) => {
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const tax = subtotal * 0.15; // 15% VAT
  const total = subtotal + tax;

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] flex flex-col items-center pt-10 font-sans overflow-hidden px-5">
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
        className="text-gray-900 text-[28px] font-bold tracking-tight z-10 relative"
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
        <div className="w-[280px] overflow-hidden relative z-10 -mt-[3px]">
          <motion.div
            variants={receiptVariants}
            initial="hidden"
            animate="visible"
            className="w-full bg-white rounded-b-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] border border-gray-100 pb-5"
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
            <div className="px-5 pt-5 flex flex-col gap-4">
              
              {/* Order Items Section */}
              <div className="flex flex-col gap-2.5">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div key={item.cartId} className="flex justify-between items-center text-[13px]">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 line-clamp-1">{item.name}</span>
                        <span className="text-gray-400 font-medium">Qty: {item.quantity || 1}</span>
                      </div>
                      <span className="font-bold text-gray-900">
                        {(item.price * (item.quantity || 1)).toFixed(0)} ETB
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-2 text-gray-400 text-[12px] font-medium">No items found</div>
                )}
              </div>

              {/* Total Section */}
              <div className="border-t border-dashed border-gray-200 pt-3 mt-1 flex flex-col gap-1">
                <div className="flex justify-between items-center">
                   <span className="text-[14px] font-bold text-gray-900">TOTAL AMOUNT</span>
                   <span className="text-[18px] font-black text-amber-500">{total.toFixed(0)} ETB</span>
                </div>
                <span className="text-[11px] text-gray-400 font-medium italic">Incl. 15% VAT</span>
              </div>

              {/* Pay Now Button (Functional) */}
              <button 
                onClick={() => navigate('/payment')}
                className="w-full mt-4 bg-gradient-to-br from-amber-400 to-orange-500 text-white py-4 rounded-[16px] font-bold text-[15px] shadow-[0_4px_15px_rgba(245,158,11,0.25)] hover:opacity-95 active:scale-95 transition-all flex items-center justify-center"
              >
                Pay Now
              </button>

            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;