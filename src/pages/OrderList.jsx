import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Trash2, ShoppingBag, Plus, Minus, ShoppingCart } from 'lucide-react';

const OrderList = ({ cart = [], setCart }) => {
  const navigate = useNavigate();

  const handleRemove = (id) => {
    setCart(cart.filter(item => item.cartId !== id));
  };

  // Logic for quantity updates (assuming cart items have a quantity property)
  const updateQuantity = (id, delta) => {
    setCart(cart.map(item => {
      if (item.cartId === id) {
        const newQty = Math.max(1, (item.quantity || 1) + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const deliveryFee = 0.00;
  const total = subtotal + deliveryFee;

  return (
    <div className="w-full h-full bg-[#f8f9fb] flex flex-col font-sans relative overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center px-6 pt-8 pb-4 bg-[#f8f9fb]">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-gray-800 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent active:border-gray-100"
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>
        <button className="p-2 text-gray-800 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent active:border-gray-100">
          <Trash2 size={20} />
        </button>
      </div>

      <div className="px-6 mb-6">
        <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">My Order</h1>
      </div>

      {/* Order Items List */}
      <div className="flex-1 overflow-y-auto px-6 flex flex-col gap-5 pb-40">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-4">
            <div className="w-20 h-20 rounded-full bg-white flex justify-center items-center shadow-sm">
              <ShoppingBag size={32} className="text-gray-200" />
            </div>
            <p className="font-medium text-[15px]">Your cart is empty</p>
            <button 
              onClick={() => navigate("/")}
              className="mt-2 text-[#1c1c1e] font-bold text-[14px] underline"
            >
              Back to Menu
            </button>
          </div>
        ) : (
          cart.map((item) => (
            <div key={item.cartId} className="group relative flex items-center bg-white p-4 rounded-[28px] shadow-[0_10px_25px_-10px_rgba(0,0,0,0.04)] border border-gray-50/50">
              
              {/* Product Image */}
              <div className="relative w-20 h-20 flex-shrink-0">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300" 
                />
              </div>

              {/* Details */}
              <div className="flex flex-col flex-1 ml-4 pr-12">
                <h3 className="font-bold text-[16px] text-gray-900 leading-tight mb-1">{item.name}</h3>
                <p className="text-gray-400 text-[12px] font-medium mb-2">With secret sauce</p>
                <span className="text-gray-900 font-extrabold text-[17px]">
                  ${item.price.toFixed(2)}
                </span>
              </div>

              {/* Quantity Controls & Delete Action */}
              <div className="absolute right-4 flex flex-col items-center gap-3">
                 <div className="flex items-center bg-gray-50/80 rounded-full px-1 py-1 border border-gray-100">
                    <button 
                      onClick={() => updateQuantity(item.cartId, -1)}
                      className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
                    >
                      <Minus size={14} strokeWidth={3} />
                    </button>
                    <span className="w-6 text-center font-bold text-[14px] text-gray-900">
                      {item.quantity || 1}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.cartId, 1)}
                      className="w-6 h-6 flex items-center justify-center text-gray-900"
                    >
                      <Plus size={14} strokeWidth={3} />
                    </button>
                 </div>
                 
                 {/* Hidden delete reveal like in the UI image - simplified for this component */}
                 <button 
                   onClick={() => handleRemove(item.cartId)}
                   className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors"
                 >
                   <Trash2 size={16} />
                 </button>
              </div>
            </div>
          ))
        )}

        {/* Delivery Service Line */}
        {cart.length > 0 && (
          <div className="flex justify-between items-center py-4 border-t border-dashed border-gray-200 mt-2">
            <span className="text-gray-400 font-medium text-[14px]">Delivery services:</span>
            <span className="text-gray-900 font-bold text-[15px]">${deliveryFee.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Bottom Sticky Checkout */}
      {cart.length > 0 && (
        <div className="absolute bottom-0 left-0 w-full bg-white px-8 pt-8 pb-10 rounded-t-[40px] shadow-[0_-20px_40px_rgba(0,0,0,0.03)] border-t border-gray-50">
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col">
              <span className="text-gray-400 text-[13px] font-medium mb-1">Total price</span>
              <span className="text-[26px] font-black text-gray-900 leading-none">
                ${total.toFixed(2)}
              </span>
            </div>
            
            <button 
              onClick={() => navigate('/payment')}
              className="bg-[#1c1c1e] text-white flex items-center gap-3 px-8 py-4 rounded-full font-bold text-[16px] shadow-lg shadow-black/10 active:scale-[0.96] transition-all"
            >
              <ShoppingCart size={18} strokeWidth={2.5} />
              Checkout
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default OrderList;