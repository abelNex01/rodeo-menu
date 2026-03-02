import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Minus, BadgePercent } from 'lucide-react';

const OrderList = ({ cart = [], setCart }) => {
  const navigate = useNavigate();

  const handleRemove = (id) => {
    setCart(cart.filter(item => item.cartId !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item => {
      if (item.cartId === id) {
        const newQty = Math.max(1, (item.quantity || 1) + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const TAX_RATE = 0.15;
  const subtotal = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const taxAmount = subtotal * TAX_RATE;
  const total = subtotal + taxAmount;

  return (
    <div className="w-full h-full bg-[#f8f9fb] flex flex-col font-sans relative overflow-hidden">
      

      <div className="px-6 mb-8 mt-2">
        <h1 className="text-[32px] font-bold text-gray-900 leading-[1.1] max-w-[50%]">My<br/>Cart List</h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-[220px] custom-scrollbar flex flex-col">
        
        {/* Items List */}
        <div className="flex flex-col gap-6 w-full">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-4">
              <p className="font-medium text-[15px]">Your cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.cartId} className="flex items-center justify-between w-full">
                
                <div className="flex items-center gap-4 flex-1">
                  {/* Item Image with subtle white background shape behind it like the mockups */}
                  <div className="w-[70px] h-[70px] bg-white rounded-[20px] shadow-sm flex items-center justify-center p-2 flex-shrink-0">
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-full h-full object-cover rounded-[14px]" 
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-col flex-1 truncate">
                    <h3 className="font-bold text-[16px] text-gray-900 truncate">{item.name}</h3>
                    <span className="text-gray-500 font-bold text-[15px] mt-1">
                      {item.price.toFixed(2)} ETB
                    </span>
                  </div>
                </div>

                {/* Horizontal Quantity Control + Delete Icon */}
                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-1.5 bg-white px-2 py-1.5 rounded-[12px] shadow-sm border border-gray-100">
                    <button 
                      onClick={() => {
                         if (item.quantity === 1) handleRemove(item.cartId);
                         else updateQuantity(item.cartId, -1);
                      }}
                      className="w-8 h-8 flex items-center justify-center text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Minus size={14} strokeWidth={3} />
                    </button>
                    
                    <span className="font-black text-[15px] text-gray-900 min-w-[20px] text-center">
                      {item.quantity || 1}
                    </span>
                    
                    <button 
                      onClick={() => updateQuantity(item.cartId, 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Plus size={14} strokeWidth={3} />
                    </button>
                  </div>

                  {/* Delete Button */}
                  <button 
                     onClick={() => handleRemove(item.cartId)}
                     className="w-10 h-10 flex items-center justify-center text-red-500 bg-red-50 rounded-[12px] hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={18} strokeWidth={2.5} />
                  </button>
                </div>
                
              </div>
            ))
          )}
        </div>

        {/* Discount Pill */}
        {cart.length > 0 && (
          <div className="mt-10 mb-8 bg-[#fdfdfd] border border-gray-100 rounded-[20px] px-5 py-4 flex items-center gap-3">
             <BadgePercent className="text-gray-500" strokeWidth={2} size={20} />
             <span className="text-[13px] font-bold text-gray-900">Do you have any discount code?</span>
          </div>
        )}

        {/* Totals Section */}
        {cart.length > 0 && (
          <div className="flex flex-col gap-4">
             <div className="flex justify-between items-center text-[15px]">
                <span className="font-bold text-gray-500">Subtotal</span>
                <span className="font-bold text-gray-900">{subtotal.toFixed(2)} ETB</span>
             </div>

             <div className="flex justify-between items-center text-[15px]">
                <span className="font-bold text-gray-500">VAT (15%)</span>
                <span className="font-bold text-gray-900">{taxAmount.toFixed(2)} ETB</span>
             </div>
             
             {/* Dashed Line */}
             <div className="w-full border-t-[2px] border-dashed border-gray-200 my-1"></div>

             <div className="flex justify-between items-center">
                <span className="text-[19px] font-black text-gray-900 uppercase">Total</span>
                <span className="text-[21px] font-black text-gray-900">{total.toFixed(2)} ETB</span>
             </div>
          </div>
        )}

      </div>

      {/* Floating Bottom Sticky Button (Moved above BottomNav) */}
      {cart.length > 0 && (
        <div className="absolute bottom-[110px] left-1/2 -translate-x-1/2 w-[80%] flex justify-center z-40">
           <button 
             onClick={() => navigate('/payment')}
             className="w-full max-w-[320px] py-4 bg-black text-white font-bold text-[18px] rounded-lg shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:opacity-90 transition-all active:scale-95"
           >
            Place Order
           </button>
        </div>
      )}

    </div>
  );
};

export default OrderList;