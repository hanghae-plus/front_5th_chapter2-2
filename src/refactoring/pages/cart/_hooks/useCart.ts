// useCart.ts
import { useCallback, useContext } from "react";
import type { ICoupon, IProduct } from "#src/types";
import { addCartItem, calculateCartTotal, updateCartItemQuantity } from "#src/refactoring/pages/cart/_libs/cart";
import { CartContext } from "#src/refactoring/pages/cart/providers/CartProvider";

export const useCart = () => {
  const { cart, setCart, selectedCoupon, setSelectedCoupon } = useContext(CartContext);

  const addToCart = useCallback((product: IProduct) => {
    setCart((prev) => addCartItem(prev, product));
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, newQuantity: number) => {
    setCart((prev) => updateCartItemQuantity(prev, productId, newQuantity));
  }, []);

  const applyCoupon = useCallback((coupon: ICoupon) => {
    setSelectedCoupon(coupon);
  }, []);

  const calculateTotal = useCallback(() => {
    const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } = calculateCartTotal(cart, selectedCoupon);

    return {
      totalBeforeDiscount,
      totalAfterDiscount,
      totalDiscount,
    };
  }, [cart, selectedCoupon]);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  };
};
