import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiMap } from "react-icons/fi";
import { FaFire, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import {
  Leaf,
  UtensilsCrossed,
  Soup,
  Pizza,
  Coffee,
  Cake,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import rodeomini from "../assets/rodeomini.png";

// ── Keep existing data ──
const quickCategories = [
  { id: "all", name: "All buka", icon: <UtensilsCrossed size={22} /> },
  { id: "rice", name: "Rice", icon: <Soup size={22} /> },
  { id: "swallow", name: "Swallow", icon: <Pizza size={22} /> },
  { id: "snacks", name: "Snacks", icon: <Coffee size={22} /> },
  { id: "salads", name: "Salads", icon: <Leaf size={22} /> },
  { id: "desserts", name: "Desserts", icon: <Cake size={22} /> },
];

const topRated = [
  {
    id: 1,
    name: "Classic Burger",
    desc: "Juicy beef patty with cheese",
    price: "450",
    time: "15 min",
    review: "4.8",
    location: "Bole, Addis",
    distance: "2 km away",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Grilled Salmon",
    desc: "Fresh caught salmon steak",
    price: "780",
    time: "25 min",
    review: "4.9",
    location: "Kazanchis",
    distance: "5 km away",
    img: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Spicy Ramen",
    desc: "Rich pork broth with noodles",
    price: "520",
    time: "20 min",
    review: "4.7",
    location: "Piazza",
    distance: "8 km away",
    img: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Margherita Pizza",
    desc: "Wood-fired with fresh basil",
    price: "580",
    time: "20 min",
    review: "4.8",
    location: "Sarbet",
    distance: "3 km away",
    img: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=600&h=400&fit=crop",
  },
];

const suggested = [
  {
    id: 6,
    name: "Steak Frites",
    desc: "Ribeye with crispy fries",
    price: "889",
    time: "30 min",
    review: "4.9",
    location: "Mexico, Addis",
    distance: "4 km away",
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop",
  },
  {
    id: 7,
    name: "Lemon Cheesecake",
    desc: "Creamy dessert with crust",
    price: "320",
    time: "5 min",
    review: "4.6",
    location: "CMC, Addis",
    distance: "12 km away",
    img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&h=400&fit=crop",
  },
  {
    id: 9,
    name: "Tacos al Pastor",
    desc: "Pork tacos with pineapple",
    price: "480",
    time: "15 min",
    review: "4.8",
    location: "Gerji",
    distance: "6 km away",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop",
  },
  {
    id: 19,
    name: "Chicken Tikka",
    desc: "Creamy tomato curry with naan",
    price: "680",
    time: "25 min",
    review: "4.8",
    location: "Hayat",
    distance: "7 km away",
    img: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=600&h=400&fit=crop",
  },
];

const Specials = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="w-full min-h-full bg-[#fcfcfc] pb-[100px] text-gray-900 font-sans">
      {/* ===== Location Header ===== */}
      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <FaMapMarkerAlt className="text-[14px] text-gray-800" />
            <span className="text-[15px] font-bold text-gray-900">
              Bole, Addis Ababa.
            </span>
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              className="ml-0.5 mt-0.5"
            >
              <path
                d="M1 1L5 5L9 1"
                stroke="#666"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-[12px] text-gray-400 mt-0.5 ml-5">
            Locate restaurants in your area today.
          </span>
        </div>
        {/* Avatar */}
        <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-amber-400 flex-shrink-0">
          <img
            src={rodeomini}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* ===== Greeting ===== */}
      <div className="px-5 pt-2 pb-4">
        <h1 className="text-[26px] font-bold text-gray-900 leading-tight">
          Good evening Guest...
        </h1>
      </div>

      {/* ===== Search Bar ===== */}
      <div className="px-5 pb-5">
        <div className="flex items-center bg-white rounded-[14px] px-4 py-3.5 border border-gray-200 shadow-sm">
          <FiSearch className="text-gray-400 text-[18px] mr-3 flex-shrink-0" />
          <span className="text-[14px] text-gray-400">Search here</span>
        </div>
      </div>

      {/* ===== Category Pills ===== */}
      <div className="px-5 pb-5 flex gap-3 overflow-x-auto hide-scrollbar">
        {quickCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex flex-col items-center gap-2 px-5 py-3 rounded-[16px] min-w-[80px] transition-all flex-shrink-0 ${
              activeCategory === cat.id
                ? "bg-white text-gray-900 shadow-md border border-gray-100"
                : "bg-transparent text-gray-400 border border-gray-100"
            }`}
          >
            <span
              className={`${
                activeCategory === cat.id ? "text-gray-900" : "text-gray-400"
              }`}
            >
              {cat.icon}
            </span>
            <span
              className={`text-[11px] font-semibold whitespace-nowrap ${
                activeCategory === cat.id ? "text-gray-900" : "text-gray-400"
              }`}
            >
              {cat.name}
            </span>
          </button>
        ))}
      </div>

      {/* ===== Top Rated Section ===== */}
      <div className="px-5 pb-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[20px] font-bold text-gray-900">
            Top rated bukas
          </h2>
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 bg-white">
            <span className="text-[12px] font-medium text-gray-500">
              See all
            </span>
            <ArrowRight size={12} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Horizontal scrolling cards */}
      <div className="px-5 pb-6 flex gap-3 overflow-x-auto hide-scrollbar">
        {topRated.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/food/${item.id}`)}
            className="min-w-[260px] bg-white rounded-[18px] overflow-hidden shadow-sm border border-gray-100 cursor-pointer active:scale-[0.98] transition-transform flex-shrink-0"
          >
            {/* Card Image */}
            <div className="w-full h-[150px] overflow-hidden relative">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Card Info */}
            <div className="p-3 pb-3.5">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-[14px] font-bold text-gray-900 truncate flex-1">
                  {item.name}
                </h3>
                <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                  <FaStar className="text-[11px] text-amber-400" />
                  <span className="text-[12px] font-semibold text-gray-700">
                    {item.review}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <FaMapMarkerAlt className="text-[10px] text-gray-400" />
                  <span className="text-[11px] text-gray-400">
                    {item.location}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    width="10"
                    height="12"
                    viewBox="0 0 10 12"
                    fill="none"
                  >
                    <path
                      d="M5 0C5 0 5 3 2 5C5 5 5 8 5 12C5 8 5 5 8 5C5 3 5 0 5 0Z"
                      fill="#999"
                    />
                  </svg>
                  <span className="text-[11px] text-gray-400">
                    {item.distance}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== Suggested Section ===== */}
      <div className="px-5 pb-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[20px] font-bold text-gray-900">
            Suggested bukas
          </h2>
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 bg-white">
            <span className="text-[12px] font-medium text-gray-500">
              See all
            </span>
            <ArrowRight size={12} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Horizontal scrolling cards */}
      <div className="px-5 pb-6 flex gap-3 overflow-x-auto hide-scrollbar">
        {suggested.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/food/${item.id}`)}
            className="min-w-[260px] bg-white rounded-[18px] overflow-hidden shadow-sm border border-gray-100 cursor-pointer active:scale-[0.98] transition-transform flex-shrink-0"
          >
            {/* Card Image */}
            <div className="w-full h-[150px] overflow-hidden relative">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Card Info */}
            <div className="p-3 pb-3.5">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-[14px] font-bold text-gray-900 truncate flex-1">
                  {item.name}
                </h3>
                <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                  <FaStar className="text-[11px] text-amber-400" />
                  <span className="text-[12px] font-semibold text-gray-700">
                    {item.review}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <FaMapMarkerAlt className="text-[10px] text-gray-400" />
                  <span className="text-[11px] text-gray-400">
                    {item.location}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    width="10"
                    height="12"
                    viewBox="0 0 10 12"
                    fill="none"
                  >
                    <path
                      d="M5 0C5 0 5 3 2 5C5 5 5 8 5 12C5 8 5 5 8 5C5 3 5 0 5 0Z"
                      fill="#999"
                    />
                  </svg>
                  <span className="text-[11px] text-gray-400">
                    {item.distance}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== Hide Scrollbar CSS ===== */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `,
        }}
      />
    </div>
  );
};

export default Specials;
