import { useNavigate } from "react-router-dom";
import { FaStar, FaPlus } from "react-icons/fa";

const FoodCard = ({ item }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden cursor-pointer"
      onClick={() => navigate(`/food/${item.id}`)}
    >
      <div className="relative h-32 w-full bg-gray-100">
        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 bg-gray-900/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
          <FaStar className="text-yellow-400" /> {item.rating}
        </div>
      </div>
      <div className="p-3 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="font-bold text-gray-900 text-[15px]">{item.name}</h3>
          <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">{item.desc}</p>
        </div>
        <div className="flex justify-between items-center mt-3">
          <span className="font-bold text-gray-900"><span className="text-xs">$</span> {item.price}</span>
          <button 
            className="w-7 h-7 bg-[#f86d38] text-white rounded-[10px] flex justify-center items-center shadow-md hover:bg-[#e65c27]"
            onClick={(e) => {
              e.stopPropagation();
              // Add to cart logic would go here
            }}
          >
            <FaPlus className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default FoodCard;
