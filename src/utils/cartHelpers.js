/**
 * Cart helper utilities.
 * Replaces duplicated cart-item creation patterns in Categories, Specials, and FoodDetails.
 */

/**
 * Create a customer-side cart item from a food item.
 * Previously duplicated inline in Categories.jsx, Specials.jsx, and FoodDetails.jsx.
 *
 * @param {Object} food — a menu item from menuData
 * @param {number} [quantity=1] — quantity to add
 * @returns {Object} cart item with cartId, parsed price, and quantity
 */
export function createCartItem(food, quantity = 1) {
  return {
    cartId: Date.now(),
    ...food,
    price: parseFloat(food.price),
    quantity,
  };
}
