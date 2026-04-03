import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
// Lazy loading customer routes for better performance
const Welcome = lazy(() => import("./pages/Welcome"));
const Categories = lazy(() => import("./pages/Categories"));
const FoodDetails = lazy(() => import("./pages/FoodDetails"));
const OrderList = lazy(() => import("./pages/OrderList"));
const Payment = lazy(() => import("./pages/Payment"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));
const Specials = lazy(() => import("./pages/Specials"));
const Login = lazy(() => import("./pages/Login"));
import BottomNav from "./components/BottomNav";
import Header from "./components/Header";
import RequireAuth from "./components/admin/RequireAuth";
import useCallWaiter from "./hooks/useCallWaiter";
import useCustomerCart from "./hooks/useCustomerCart";

// Lazy-load admin routes for code-splitting
const AdminShell = lazy(() => import("./layouts/AdminShell"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const MenuList = lazy(() => import("./pages/admin/MenuList"));
const MenuEditor = lazy(() => import("./pages/admin/MenuEditor"));
const Orders = lazy(() => import("./pages/admin/Orders"));
const OrderDetail = lazy(() => import("./pages/admin/OrderDetail"));
const Users = lazy(() => import("./pages/admin/Users"));
const Analytics = lazy(() => import("./pages/admin/Analytics"));
const Settings = lazy(() => import("./pages/admin/Settings"));

// Loading fallback for lazy-loaded admin pages
const AdminLoading = () => (
  <div className="flex items-center justify-center h-screen bg-dark-bg">
    <div className="w-8 h-8 border-3 border-brand-500/30 border-t-brand-500 rounded-full animate-spin" />
  </div>
);

function App() {
  const { isCalling, handleCallWaiter } = useCallWaiter();
  const { cart, setCart, orderItems, setOrderItems } = useCustomerCart();
  const location = useLocation();

  // Only show customer header/nav if not on welcome, login, or admin pages
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isLoginRoute = location.pathname === '/login';
  const showNav = location.pathname !== "/" && !isAdminRoute && !isLoginRoute;

  return (
    <>
      {/* Customer-facing app */}
      {!isAdminRoute && !isLoginRoute ? (
        <div className="w-full h-screen h-[100dvh] bg-gray-50 flex justify-center items-center overflow-hidden">
          <div className="w-full max-w-[450px] md:max-w-[768px] h-full bg-[#f8f9fa] relative overflow-hidden shadow-2xl flex flex-col mx-auto">
            {showNav && <Header isCalling={isCalling} handleCallWaiter={handleCallWaiter} />}
            <div className="flex-1 overflow-y-auto custom-scrollbar overflow-x-hidden">
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-4 border-gray-200 border-t-amber-500 animate-spin"></div>
                </div>
              }>
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
              </Suspense>
            </div>
            {showNav && <BottomNav cartCount={cart?.length || 0} isCalling={isCalling} handleCallWaiter={handleCallWaiter} />}
          </div>
        </div>
      ) : (
        /* Login + Admin routes */
        <Suspense fallback={<AdminLoading />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <RequireAuth>
                  <AdminShell />
                </RequireAuth>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="menu" element={<MenuList />} />
              <Route path="menu/new" element={<MenuEditor />} />
              <Route path="menu/:id/edit" element={<MenuEditor />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:id" element={<OrderDetail />} />
              <Route path="users" element={<Users />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Suspense>
      )}
    </>
  );
}

export default App;
