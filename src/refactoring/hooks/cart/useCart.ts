import { calculateCartTotal } from "../../calculations/cart/calc-total-discount";
import { useCartStore } from "../../store/cart-store";
import { useSelectedCoupon } from "../coupon/useSelectedCoupon";

/** 테스트 전용 hook - 실사용 로직에서는 사용하지 않음 */
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
