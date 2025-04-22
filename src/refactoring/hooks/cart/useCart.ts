import { calculateCartTotal } from "@/refactoring/calculations/cart/calc-total-discount";
import { useSelectedCoupon } from "@/refactoring/hooks";
import { useCartStore } from "@/refactoring/store/cart-store";

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
