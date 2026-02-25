import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Welcome from "./pages/Welcome";
import Categories from "./pages/Categories";
import FoodDetails from "./pages/FoodDetails";
import OrderList from "./pages/OrderList";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";
import BottomNav from "./components/BottomNav";

function App() {
  const [cart, setCart] = useState([]);
  const location = useLocation();
  console.log("App Cart State:", cart);

  // Only show bottom nav if not on the welcome page
  const showBottomNav = location.pathname !== "/";

  return (
    <div className="w-full h-screen h-[100dvh] bg-gray-50 flex justify-center items-center overflow-hidden">
      <div className="w-full max-w-[450px] md:max-w-[768px] h-full bg-white relative overflow-hidden shadow-2xl flex flex-col mx-auto">
        <div className="flex-1 overflow-y-auto custom-scrollbar overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/categories" element={<Categories cart={cart} setCart={setCart} />} />
            <Route path="/food/:id" element={<FoodDetails cart={cart} setCart={setCart} />} />
            <Route path="/orders" element={<OrderList cart={cart} setCart={setCart} />} />
            <Route path="/payment" element={<Payment cart={cart} />} />
            <Route path="/order-success" element={<OrderSuccess />} />
          </Routes>
        </div>
        {showBottomNav && <BottomNav cartCount={cart?.length || 0} />}
      </div>
    </div>
  );
}

export default App;
