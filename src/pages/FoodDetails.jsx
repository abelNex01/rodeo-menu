import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ShoppingBag, Heart, Bike, Target, Map, Minus, Plus, Star, Watch } from "lucide-react";

const FoodDetails = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userRating, setUserRating] = useState(0);

  // Preserved User Logic
  const handleAddToCart = () => {
    console.log("Adding to cart from details");
    const newItem = {
      cartId: Date.now(),
      id: 1, // Currently hardcoded
      name: "Avocado Toast",
      price: 45,
      quantity: quantity,
      img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop&q=60",
      time: "45 min"
    };
    setCart(prev => [...(prev || []), newItem]);
  };

  const handleBuyNow = () => {
     handleAddToCart();
     navigate("/orders");
  }

  const handleDecreaseQuantity = () => {
     setQuantity(prev => Math.max(1, prev - 1));
  }
  
  const handleIncreaseQuantity = () => {
     setQuantity(prev => prev + 1);
  }

  return (
    <div className="w-full h-full bg-white font-sans flex flex-col relative overflow-hidden">
      
      {/* Scrollable Content Container */}
      <div className="flex-1 overflow-y-auto custom-scrollbar scroll-smooth">
        
        {/* Full-Width Hero Image Section */}
        <div className="w-full h-[320px] md:h-[380px] relative overflow-hidden">
           <img 
             src="https://images.unsplash.com/photo-1525351484163-7529414344d8?w=1200&auto=format&fit=crop&q=80"
             alt="Avocado Toast"
             className="w-full h-full object-cover"
           />
           {/* Subtle gradient overlay to make top header transition smoother */}
           <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent pointer-events-none"></div>
        </div>

        {/* Content Area with Padding */}
        <div className="px-6 py-6 pb-[200px]">
           {/* Product Title & Row info */}
           <div className="relative mb-6">
              <h1 className="text-[28px] font-bold text-gray-900 mb-2">Avocado Toast</h1>
              
              <div className="flex items-center gap-4 text-[13px] font-semibold text-gray-400">
                 <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <span>245 kcal.</span>
                 </div>
                 <div className="flex items-center gap-1">
                    <Star size={14} className="text-amber-400 fill-amber-400" />
                    <span>4.5 star</span>
                 </div>
                 <div className="flex items-center gap-1">
                    <Watch size={14} className="text-blue-400" />
                    <span>45 min</span>
                 </div>
              </div>

              {/* Favorite Heart Button */}
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className={`absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition-all ${isFavorite ? 'bg-red-500 text-white' : 'bg-[#6dbd6e] text-white'}`}
              >
                 <Heart size={24} fill={isFavorite ? "white" : "none"} strokeWidth={isFavorite ? 0 : 2} />
              </button>
           </div>

           {/* Details Section */}
           <div className="mb-10">
              <h2 className="text-[19px] font-bold text-gray-900 mb-3 uppercase tracking-tight">Details</h2>
              <p className="text-gray-500 text-[15px] leading-[1.6]">
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Turpis sit massa in imperdiet feugiat quis enim Cras egestas. Turpis sit massa in imperdiet feugiat quis enim Cras egestas.
              </p>
           </div>

           {/* Interactive User Rating Section */}
           <div className="mb-8">
              <h2 className="text-[19px] font-bold text-gray-900 mb-4 uppercase tracking-tight">Rate this food</h2>
              <div className="flex items-center justify-between bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm">
                 <span className="text-[14px] font-medium text-gray-500">How was your meal?</span>
                 <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                       <button 
                          key={star}
                          onClick={() => setUserRating(star)}
                          className="transition-transform active:scale-90"
                       >
                          <Star 
                             size={22} 
                             className={`${star <= userRating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} 
                             strokeWidth={star <= userRating ? 0 : 2}
                          />
                       </button>
                    ))}
                 </div>
              </div>
           </div>

           {/* Rating & Review Section */}
           <div className="mb-8">
              <h2 className="text-[19px] font-bold text-gray-900 mb-5 uppercase tracking-tight">Rating & Reviews</h2>
              
              <div className="bg-gray-50/50 rounded-[28px] p-6 border border-gray-100/50">
                 <div className="flex items-center gap-8">
                    {/* Big Score */}
                    <div className="flex flex-col items-center">
                       <span className="text-[42px] font-bold text-gray-900 leading-none">4.5</span>
                       <div className="flex items-center gap-0.5 mt-2">
                          {[1,2,3,4].map(i => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
                          <Star size={14} className="text-amber-400" />
                       </div>
                       <span className="text-[12px] text-gray-400 mt-2 font-medium">124 Reviews</span>
                    </div>

                    {/* Progress Bars */}
                    <div className="flex-1 flex flex-col gap-2">
                       {[5, 4, 3, 2, 1].map((star) => (
                          <div key={star} className="flex items-center gap-3">
                             <span className="text-[11px] font-bold text-gray-400 w-2">{star}</span>
                             <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                   className="h-full bg-amber-400 rounded-full" 
                                   style={{ width: `${star === 5 ? '70%' : star === 4 ? '20%' : star === 3 ? '5%' : '2.5%'}` }}
                                ></div>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>

      </div>

      {/* Sticky Bottom Action Bar - Anchored to the container bottom */}
      <div className="absolute bottom-[108px] left-1/2 -translate-x-1/2 w-[92%] bg-white/95 backdrop-blur-xl px-4 py-3.5 rounded-[22px] shadow-[0_15px_35px_rgba(0,0,0,0.12)] border border-gray-100 flex items-center justify-between gap-3 z-50">
        
        {/* Quantity Controls */}
        <div className="flex items-center bg-gray-50 rounded-full p-1 border border-gray-100 shadow-inner">
           <button 
              onClick={handleDecreaseQuantity}
              className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors bg-white rounded-full shadow-sm"
           >
              <Minus size={16} strokeWidth={2.5} />
           </button>
           
           <span className="w-8 text-center font-bold text-[14px] text-gray-800">
              {quantity}x
           </span>

           <button 
              onClick={handleIncreaseQuantity}
              className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors bg-white rounded-full shadow-sm"
           >
              <Plus size={16} strokeWidth={2.5} />
           </button>
        </div>

        {/* Price / Order Button */}
        <button 
           onClick={handleBuyNow}
           className="flex-1 bg-[#6dbd6e] text-white py-4 px-6 rounded-[18px] font-bold text-[16px] shadow-[0_8px_25px_rgba(109,189,110,0.3)] hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center"
        >
           Order for ${45 * quantity}
        </button>
      </div>

    </div>
  );
};

export default FoodDetails;
