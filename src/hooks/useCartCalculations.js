import { useMemo } from 'react';
import { TAX_RATE } from '../constants';

/**
 * Calculates cart totals (subtotal, tax, total).
 * Previously duplicated in OrderList.jsx, Payment.jsx, and OrderSuccess.jsx.
 *
 * @param {Array} cart — array of cart items with `price` and `quantity` fields
 * @param {number} [extraAmount=0] — additional amount (e.g. tip) added to total
 * @returns {{ subtotal: number, tax: number, total: number }}
 */
export default function useCartCalculations(cart, extraAmount = 0) {
  return useMemo(() => {
    const subtotal = cart.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax + extraAmount;
    return { subtotal, tax, total };
  }, [cart, extraAmount]);
}
