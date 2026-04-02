import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, ShoppingBag, Minus, Plus, Star, Watch } from "lucide-react";
import { useMenu } from "../context/AppContext";
import { createCartItem } from "../utils/cartHelpers";

const FoodDetails = ({ cart, setCart, setOrderItems }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { menuItems, categories } = useMenu();
  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    const item = menuItems.find(f => f.id === id);
    if (item) {
      const category = categories.find(c => c.id === item.category_id);
      setFood({
        ...item,
        id: item.id,
        name: item.name,
        desc: item.description,
        price: item.price,
        img: item.image_url,
        review: item.rating,
        time: `${item.preparation_time} min`,
        category: category ? category.name : 'Food'
      });
    } else if (menuItems.length > 0) {
      // If we have items but this id isn't one of them
      navigate('/categories');
    }
  }, [id, menuItems, categories, navigate]);

  if (!food) return null;

  const handleAddToCart = () => {
    setCart(prev => [...(prev || []), createCartItem(food, quantity)]);
  };

  const handleBuyNow = () => {
     setOrderItems([createCartItem(food, quantity)]);
     navigate("/order-success");
  }

  const handleDecreaseQuantity = () => {
     setQuantity(prev => Math.max(1, prev - 1));
  }
  
  const handleIncreaseQuantity = () => {
     setQuantity(prev => prev + 1);
  }

  return (
    <div className="w-full h-full bg-[#f8f9fa] font-sans flex flex-col relative overflow-hidden">
      
      {/* Scrollable Content Container */}
      <div className="flex-1 overflow-y-auto custom-scrollbar scroll-smooth">
        
        {/* Full-Width Hero Image Section */}
        <div className="w-full h-[350px] md:h-[400px] relative overflow-hidden">
           <img 
             src={food.img}
             alt={food.name}
             className="w-full h-full object-cover"
           />
           
           {/* Dark Gradient Overlay for text readability */}
           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>

           {/* White Blur/Fade-out at the bottom to transition to background */}
           <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white via-white/40 to-transparent"></div>

           {/* Back Button */}
           <button 
             onClick={() => navigate(-1)}
             className="absolute top-5 left-5 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 text-white z-20"
           >
             <ChevronLeft size={24} />
           </button>

           {/* Content overlay (Rating, Time, Kcal) move inside image section */}
           <div className="absolute bottom-10 left-5 flex items-center gap-3 z-10">
              <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-1.5">
                 <Star size={14} className="text-amber-400 fill-amber-400" />
                 <span className="text-white text-[12px] font-bold">{food.review}</span>
              </div>
              <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-1.5">
                 <Watch size={14} className="text-white" />
                 <span className="text-white text-[12px] font-bold">{food.time}</span>
              </div>
              <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-1.5">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]"></div>
                 <span className="text-white text-[12px] font-bold">Chef Choice</span>
              </div>
           </div>
        </div>

        {/* Content Area with Padding */}
        <div className="px-5 py-6 pb-[200px]">
           {/* Product Title & Row info */}
           <div className="relative mb-6">
              <h1 className="text-[32px] font-black text-gray-900 mb-1 tracking-tight">{food.name}</h1>
              <p className="text-amber-600 font-bold text-[14px] uppercase tracking-wider">{food.category}</p>

              {/* Quantity Controls */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-gray-50 rounded-full p-1 border border-gray-100 shadow-sm">
                 <button 
                    onClick={handleDecreaseQuantity}
                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors bg-white rounded-full shadow-sm"
                 >
                    <Minus size={18} strokeWidth={2.5} />
                 </button>
                 
                 <span className="w-10 text-center font-bold text-[16px] text-gray-800">
                    {quantity}
                 </span>
      
                 <button 
                    onClick={handleIncreaseQuantity}
                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors bg-white rounded-full shadow-sm"
                 >
                    <Plus size={18} strokeWidth={2.5} />
                 </button>
              </div>
           </div>

           {/* Details Section */}
           <div className="mb-10">
              <h2 className="text-[20px] font-bold text-gray-900 mb-3 uppercase tracking-tight">Details</h2>
              <p className="text-gray-500 text-[15px] leading-[1.6]">
                {food.desc}. Experience the authentic flavors carefully curated by our master chefs. This dish features premium ingredients sourced locally to ensure the highest quality and freshness in every bite.
              </p>
           </div>

           {/* Interactive User Rating Section */}
           <div className="mb-8">
              <h2 className="text-[20px] font-bold text-gray-900 mb-4 uppercase tracking-tight">Rate this food</h2>
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
              <h2 className="text-[20px] font-bold text-gray-900 mb-5 uppercase tracking-tight">Rating & Reviews</h2>
              
              <div className="bg-gray-50/50 rounded-[28px] p-6 border border-gray-100/50">
                 <div className="flex items-center gap-8">
                    {/* Big Score */}
                    <div className="flex flex-col items-center">
                       <span className="text-[42px] font-bold text-gray-900 leading-none">{food.review}</span>
                       <div className="flex items-center gap-0.5 mt-2">
                          {[1,2,3,4].map(i => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
                          <Star size={14} className="text-amber-400" />
                       </div>
                       <span className="text-[12px] text-gray-400 mt-2 font-medium">Verified Orders</span>
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
        
        {/* Add to List Button */}
        <button 
           onClick={handleAddToCart}
           className="h-[56px] px-6 bg-gray-50 text-gray-800 font-bold text-[14px] rounded-[18px] border border-gray-100 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
        >
           <ShoppingBag size={18} />
           <span>Add to List</span>
        </button>
  
        {/* Price / Order Button */}
        <button 
           onClick={handleBuyNow}
           className="flex-1 bg-gradient-to-br from-amber-400 to-orange-500 text-white py-4 px-6 rounded-[18px] font-bold text-[16px] shadow-[0_8px_25px_rgba(245,158,11,0.3)] hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center"
        >
           Order Now • {food.price * quantity} ETB
        </button>
      </div>

    </div>
  );
};

export default FoodDetails;

