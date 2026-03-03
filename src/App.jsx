import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Welcome from "./pages/Welcome";
import Categories from "./pages/Categories";
import FoodDetails from "./pages/FoodDetails";
import OrderList from "./pages/OrderList";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";
import Specials from "./pages/Specials";
import BottomNav from "./components/BottomNav";
import Header from "./components/Header";

function App() {
  const [cart, setCart] = useState([]);
  const [orderItems, setOrderItems] = useState([]); // Specifically for the current order
  const [isCalling, setIsCalling] = useState(false);
  const location = useLocation();

  console.log("App Cart State:", cart);
  console.log("App Order Items:", orderItems);

  // Sync isCalling (this is simplified, ideally you'd use a context)
  const handleCallWaiter = () => {
    if (isCalling) return;
    setIsCalling(true);
    setTimeout(() => {
      setIsCalling(false);
    }, 5000);
  };

  // Only show header and bottom nav if not on the welcome page
  const showNav = location.pathname !== "/";

  return (
    <div className="w-full h-screen h-[100dvh] bg-gray-50 flex justify-center items-center overflow-hidden">
      <div className="w-full max-w-[450px] md:max-w-[768px] h-full bg-[#f8f9fa] relative overflow-hidden shadow-2xl flex flex-col mx-auto">
        
        {showNav && <Header isCalling={isCalling} handleCallWaiter={handleCallWaiter} />}

        <div className="flex-1 overflow-y-auto custom-scrollbar overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/categories" element={<Categories cart={cart} setCart={setCart} />} />
            <Route path="/menu" element={<Categories cart={cart} setCart={setCart} />} />
            <Route path="/food/:id" element={<FoodDetails cart={cart} setCart={setCart} setOrderItems={setOrderItems} />} />
            <Route path="/orders" element={<OrderList cart={cart} setCart={setCart} setOrderItems={setOrderItems} />} />
            <Route path="/payment" element={<Payment cart={orderItems} />} />
            <Route path="/order-success" element={<OrderSuccess cart={orderItems} setOrderItems={setOrderItems} />} />
            <Route path="/specials" element={<Specials cart={cart} setCart={setCart} />} />
          </Routes>
        </div>

        {showNav && <BottomNav cartCount={cart?.length || 0} isCalling={isCalling} handleCallWaiter={handleCallWaiter} />}
      </div>
    </div>
  );
}

export default App;
