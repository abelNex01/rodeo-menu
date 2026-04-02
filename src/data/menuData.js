import section1 from "../assets/category/1.webp";
import section2 from "../assets/category/2.webp";
import section3 from "../assets/category/3.webp";
import section4 from "../assets/category/4.webp";
import section5 from "../assets/category/5.webp";
import section6 from "../assets/category/6.webp";
import section7 from "../assets/category/7.webp";
import section8 from "../assets/category/8.webp";
import section9 from "../assets/category/9.webp";
import banner1 from "../assets/banner1.webp";
import banner2 from "../assets/banner2.webp";
import banner3 from "../assets/banner3.webp";

export const quickCategories = [
  { id: "all", name: "All" },
  { id: "mains", name: "Mains", img: section4 },
  { id: "burgers", name: "Burgers", img: section6 },
  { id: "pizza", name: "Pizza", img: section1 },
  { id: "traditional", name: "Traditional", img: section7 },
  { id: "beverages", name: "Beverages", img: section5 },
  { id: "cocktails", name: "Cocktails", img: section9 },
  { id: "seafood", name: "Seafood", img: section8 },
  { id: "salads", name: "Salads", img: section2 },
  { id: "soups", name: "Soups", img: section3 },
  { id: "grill", name: "Grill", img: section5 },
  { id: "sides", name: "Sides", img: section2 },
  { id: "desserts", name: "Desserts", img: section6 },
];

export const allFoods = [
  { id: 1, category: "burgers", name: "Classic Burger", desc: "Juicy beef patty with cheese", price: "450", time: "15 min", review: "4.8", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop" },
  { id: 2, category: "seafood", name: "Grilled Salmon", desc: "Fresh caught salmon steak", price: "780", time: "25 min", review: "4.9", img: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=400&h=300&fit=crop" },
  { id: 3, category: "mains", name: "Spicy Ramen", desc: "Rich pork broth with noodles", price: "520", time: "20 min", review: "4.7", img: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=400&h=300&fit=crop" },
  { id: 4, category: "salads", name: "Caesar Salad", desc: "Crisp romaine & parmesan", price: "350", time: "10 min", review: "4.5", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop" },
  { id: 5, category: "pizza", name: "Margherita Pizza", desc: "Wood-fired with fresh basil", price: "580", time: "20 min", review: "4.8", img: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=400&h=300&fit=crop" },
  { id: 6, category: "mains", name: "Steak Frites", desc: "Ribeye with crispy fries", price: "889", time: "30 min", review: "4.9", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop" },
  { id: 7, category: "desserts", name: "Lemon Cheesecake", desc: "Creamy dessert with crust", price: "320", time: "5 min", review: "4.6", img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop" },
  { id: 8, category: "beverages", name: "Iced Caramel Latte", desc: "Espresso, milk, and caramel", price: "310", time: "5 min", review: "4.7", img: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=400&h=300&fit=crop" },
  { id: 9, category: "traditional", name: "Tacos al Pastor", desc: "Pork tacos with pineapple", price: "480", time: "15 min", review: "4.8", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop" },
  { id: 10, category: "mains", name: "Avocado Toast", desc: "Poached eggs on sourdough", price: "340", time: "10 min", review: "4.5", img: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=400&h=300&fit=crop" },
  { id: 11, category: "mains", name: "Mushroom Risotto", desc: "Creamy Arborio rice", price: "620", time: "25 min", review: "4.7", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop" },
  { id: 12, category: "mains", name: "Buffalo Wings", desc: "Spicy chicken wings", price: "430", time: "15 min", review: "4.6", img: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=400&h=300&fit=crop" },
  { id: 13, category: "beverages", name: "Mango Smoothie", desc: "Fresh mango and yogurt", price: "320", time: "5 min", review: "4.8", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop" },
  { id: 14, category: "mains", name: "Beef Stroganoff", desc: "Tender beef in mushroom cream", price: "750", time: "25 min", review: "4.7", img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop" },
  { id: 15, category: "mains", name: "Pancakes", desc: "Fluffy stack with syrup", price: "380", time: "15 min", review: "4.6", img: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=400&h=300&fit=crop" },
  { id: 16, category: "mains", name: "Shrimp Scampi", desc: "Garlic butter shrimp pasta", price: "820", time: "20 min", review: "4.9", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop" },
  { id: 17, category: "desserts", name: "Chocolate Lava Cake", desc: "Warm cake with molten center", price: "360", time: "10 min", review: "4.9", img: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=400&h=300&fit=crop" },
  { id: 18, category: "salads", name: "Greek Salad", desc: "Feta, olives, and greens", price: "420", time: "10 min", review: "4.5", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop" },
  { id: 19, category: "traditional", name: "Chicken Tikka Masala", desc: "Creamy tomato curry with naan", price: "680", time: "25 min", review: "4.8", img: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=400&h=300&fit=crop" },
  { id: 20, category: "beverages", name: "Matcha Latte", desc: "Sweet green tea with milk", price: "300", time: "5 min", review: "4.7", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop" },
];

export const banners = [
  { id: 1, image: banner1 },
  { id: 2, image: banner2 },
  { id: 3, image: banner3 }
];

export const topRated = allFoods.filter(food => parseFloat(food.review) >= 4.8);
export const suggested = allFoods.slice(5, 10);
