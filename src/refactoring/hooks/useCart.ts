import { calculateCartTotal } from "../calculations/cart/calc-total-discount";
import { useCartStore } from "../store/cart-store";
import { useSelectedCoupon } from "./useSelectedCoupon";

export const useCart = () => {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCartStore();
  const { selectedCoupon, applyCoupon } = useSelectedCoupon();

  const calculateTotal = () => {
    return calculateCartTotal(cart, selectedCoupon);
  };

  return {
    cart,
    selectedCoupon,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
  };
};
