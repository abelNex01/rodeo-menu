import { useState } from 'react';

/**
 * Encapsulates the customer-side cart and orderItems state.
 * Previously inline in App.jsx as two separate useState calls.
 */
export default function useCustomerCart() {
  const [cart, setCart] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  return { cart, setCart, orderItems, setOrderItems };
}
