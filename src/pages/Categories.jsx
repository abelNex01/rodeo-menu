import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Bell, 
  Search, 
  SlidersHorizontal, 
  ChevronRight, 
  Bookmark,
  Leaf,
  UtensilsCrossed,
  Soup,
  Pizza,
  Coffee,
  Cake,
  Star,
  Plus,
  ChevronDown
} from "lucide-react";

// Expanded to 6 categories
const quickCategories = [
  { id: 1, name: "Salads", icon: <Leaf size={20} className="text-gray-700" /> },
  { id: 2, name: "Main Course", icon: <UtensilsCrossed size={20} className="text-gray-700" /> },
  { id: 3, name: "Pasta", icon: <Soup size={20} className="text-gray-700" /> },
  { id: 4, name: "Fast Food", icon: <Pizza size={20} className="text-gray-700" /> },
  { id: 5, name: "Drinks", icon: <Coffee size={20} className="text-gray-700" /> },
  { id: 6, name: "Desserts", icon: <Cake size={20} className="text-gray-700" /> },
];

// Replaced recommended with 20 dummy items for the complete menu
const allFoods = [
  { id: 1, name: "Classic Burger", desc: "Juicy beef patty with cheese", price: "12.50", time: "15 min", review: "4.8", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop" },
  { id: 2, name: "Grilled Salmon", desc: "Fresh caught salmon steak", price: "24.00", time: "25 min", review: "4.9", img: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=400&h=300&fit=crop" },
  { id: 3, name: "Spicy Ramen", desc: "Rich pork broth with noodles", price: "16.00", time: "20 min", review: "4.7", img: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=400&h=300&fit=crop" },
  { id: 4, name: "Caesar Salad", desc: "Crisp romaine & parmesan", price: "10.00", time: "10 min", review: "4.5", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop" },
  { id: 5, name: "Margherita Pizza", desc: "Wood-fired with fresh basil", price: "18.50", time: "20 min", review: "4.8", img: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=400&h=300&fit=crop" },
  { id: 6, name: "Steak Frites", desc: "Ribeye with crispy fries", price: "32.00", time: "30 min", review: "4.9", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop" },
  { id: 7, name: "Lemon Cheesecake", desc: "Creamy dessert with crust", price: "8.00", time: "5 min", review: "4.6", img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop" },
  { id: 8, name: "Iced Caramel Latte", desc: "Espresso, milk, and caramel", price: "5.50", time: "5 min", review: "4.7", img: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=400&h=300&fit=crop" },
  { id: 9, name: "Tacos al Pastor", desc: "Pork tacos with pineapple", price: "14.00", time: "15 min", review: "4.8", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop" },
  { id: 10, name: "Avocado Toast", desc: "Poached eggs on sourdough", price: "12.00", time: "10 min", review: "4.5", img: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=400&h=300&fit=crop" },
  { id: 11, name: "Mushroom Risotto", desc: "Creamy Arborio rice", price: "20.00", time: "25 min", review: "4.7", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop" },
  { id: 12, name: "Buffalo Wings", desc: "Spicy chicken wings", price: "15.00", time: "15 min", review: "4.6", img: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=400&h=300&fit=crop" },
  { id: 13, name: "Mango Smoothie", desc: "Fresh mango and yogurt", price: "6.50", time: "5 min", review: "4.8", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop" },
  { id: 14, name: "Beef Stroganoff", desc: "Tender beef in mushroom cream", price: "22.00", time: "25 min", review: "4.7", img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop" },
  { id: 15, name: "Pancakes", desc: "Fluffy stack with syrup", price: "11.00", time: "15 min", review: "4.6", img: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=400&h=300&fit=crop" },
  { id: 16, name: "Shrimp Scampi", desc: "Garlic butter shrimp pasta", price: "24.00", time: "20 min", review: "4.9", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop" },
  { id: 17, name: "Chocolate Lava Cake", desc: "Warm cake with molten center", price: "9.00", time: "10 min", review: "4.9", img: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=400&h=300&fit=crop" },
  { id: 18, name: "Greek Salad", desc: "Feta, olives, and greens", price: "13.00", time: "10 min", review: "4.5", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop" },
  { id: 19, name: "Chicken Tikka Masala", desc: "Creamy tomato curry with naan", price: "19.00", time: "25 min", review: "4.8", img: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=400&h=300&fit=crop" },
  { id: 20, name: "Matcha Latte", desc: "Sweet green tea with milk", price: "6.00", time: "5 min", review: "4.7", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop" },
];

const Categories = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const handleQuickAdd = (e, item) => {
    e.stopPropagation();
    console.log("Quick adding item:", item);
    const newItem = {
      cartId: Date.now(),
      ...item,
      price: parseFloat(item.price)
    };
    setCart(prev => {
      const updated = [...(prev || []), newItem];
      console.log("Updated cart:", updated);
      return updated;
    });
  };

  return (
    <div className="w-full flex flex-col pt-4 pb-20 px-4 font-sans overflow-x-hidden">
      
      {/* Top Header */}
      <div className="relative flex justify-between items-center mb-4 z-50">
        {/* Restaurant Logo & Name (Left Side) */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-[#f86d38] rounded-[12px] flex items-center justify-center shadow-sm">
            <span className="font-[Lobster] text-[22px] text-white">R</span>
          </div>
          <div>
            <h1 className="text-[16px] font-extrabold text-gray-900 tracking-tight leading-none mb-1">Rodeo</h1>
            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.15em] leading-none">Restaurant</p>
          </div>
        </div>

        {/* Actions (Right Side) */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <div className="relative group cursor-pointer bg-white rounded-full px-3 py-2 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-center gap-1 border border-gray-50">
            <span className="text-[12px] font-bold text-gray-700">ENG</span>
            <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-800 transition-colors" />
            
            {/* Dropdown Menu (Static) */}
            <div className="absolute top-10 right-0 w-[110px] bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all overflow-hidden flex flex-col py-1 mt-1 origin-top">
               <div className="px-3 py-2.5 text-[12px] font-bold text-[#f86d38] bg-orange-50/50 flex items-center gap-2">
                 <span>🇺🇸</span> ENG
               </div>
               <div className="px-3 py-2.5 text-[12px] font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2">
                 <span>🇪🇹</span> AMH
               </div>
            </div>
          </div>

          {/* Call Waiter */}
          <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] text-gray-600 hover:text-[#f86d38] transition-colors border border-gray-50 relative group">
            <Bell size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>


      {/* Search Bar */}
      <div className="flex items-center bg-white rounded-full px-4 py-3 shadow-[0_2px_15px_-6px_rgba(0,0,0,0.05)] mb-4">
        <Search size={20} className="text-gray-400 min-w-[20px]" />
        <input 
          type="text" 
          placeholder="Search any recipes of your choice..." 
          className="flex-1 bg-transparent outline-none px-3 text-[13px] text-gray-700 placeholder:text-gray-400" 
        />
        <div className="w-[1px] h-5 bg-gray-200 mx-1"></div>
        <button className="p-1 text-gray-600">
          <SlidersHorizontal size={18} />
        </button>
      </div>

      {/* Hero Banner */}
      <div className="bg-[#111111] rounded-2xl p-5 flex items-center relative overflow-hidden mb-6 shadow-md">
        {/* Abstract background pattern placeholder (optional subtle dots/lines could go here) */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent mix-blend-overlay"></div>
        
        <div className="relative z-10 w-[60%]">
          <h2 className="text-white text-[15px] font-semibold leading-snug mb-4">
            Discover the secrets to becoming a master chef!
          </h2>
          <button 
            onClick={() => navigate('/menu')}
            className="bg-white text-black text-[13px] font-bold px-5 py-2.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            Start Now
          </button>
        </div>
        
        {/* Banner Image - Positioned absolutely to break out slightly on the right */}
        <div className="absolute right-[-20px] bottom-0 w-[45%] h-[120%] flex items-end justify-end">
           <img 
            src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=300&h=300&fit=crop" 
            alt="Chef Special" 
            className="w-full h-[90%] object-cover object-left rounded-tl-full shadow-2xl"
          />
        </div>
      </div>

      {/* Menu Categories Grid */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[17px] md:text-xl font-bold text-gray-900">Menu Categories</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {quickCategories.map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => navigate('/menu')}
              className="bg-white rounded-xl p-2 md:p-2.5 flex items-center gap-3 shadow-[0_2px_10px_-6px_rgba(0,0,0,0.05)] md:hover:shadow-md cursor-pointer active:scale-95 transition-all"
            >
              <div className="w-10 h-10 md:w-11 md:h-11 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                {cat.icon}
              </div>
              <span className="flex-1 text-[13px] md:text-[14px] font-semibold text-gray-800 truncate">
                {cat.name}
              </span>
              <ChevronRight size={16} className="text-gray-300 shrink-0 md:w-5 md:h-5 md:opacity-0 md:group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>

      {/* Main Foods Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[17px] md:text-xl font-bold text-gray-900">Food and Drinks Menu</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 pb-4">
          {allFoods.map((item) => (
            <div 
              key={item.id}
              onClick={() => navigate(`/food/${item.id}`)}
              className="bg-white rounded-xl p-2 flex flex-col shadow-[0_2px_15px_-6px_rgba(0,0,0,0.05)] cursor-pointer group active:scale-95 transition-transform"
            >
              {/* Image with Review Badge overlaying it */}
              <div className="w-full h-[120px] md:h-[150px] rounded-xl overflow-hidden relative mb-2">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                
                {/* Review Badge */}
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star size={11} className="text-[#f86d38] fill-[#f86d38]" />
                  <span className="text-[11px] font-bold text-gray-800">{item.review}</span>
                </div>

                {/* Quick Add Button - Moved inside image relative container */}
                <button 
                  onClick={(e) => handleQuickAdd(e, item)}
                  className="absolute bottom-2 right-2 w-8 h-8 bg-[#1c1c1e] text-white rounded-[12px] flex items-center justify-center shadow-lg active:scale-90 transition-transform z-10"
                >
                  <Plus size={18} strokeWidth={3} />
                </button>
              </div>

              {/* Text Info */}
              <div className="flex flex-col flex-1 px-1">
                <h4 className="text-[14px] md:text-[15px] font-bold text-gray-900 mb-1 leading-tight">{item.name}</h4>
                <p className="text-[11px] md:text-[12px] text-gray-500 font-medium mb-3 line-clamp-1">{item.desc}</p>
                
                <div className="mt-auto flex justify-between items-end">
                  <span className="text-[15px] font-extrabold text-[#f86d38]">
                    {item.price} <span className="text-[10px] uppercase ml-0.5">ETB</span>
                  </span>
                  <span className="text-[11px] bg-gray-50 text-gray-600 px-2 py-1 rounded-md font-semibold">
                    {item.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Categories;