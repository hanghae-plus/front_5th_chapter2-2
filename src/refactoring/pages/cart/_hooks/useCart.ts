// useCart.ts
import { useCallback, useContext } from "react";
import type { ICoupon, IProduct } from "#src/types";
import { calculateCartTotal, updateCartItemQuantity } from "#src/refactoring/pages/cart/_libs/cart";
import { CartContext } from "#src/refactoring/pages/cart/providers/CartProvider";

export const useCart = () => {
  const { cart, setCart, selectedCoupon, setSelectedCoupon } = useContext(CartContext);

  const addToCart = useCallback((product: IProduct) => {
    setCart((prev) => {
      const exProduct = prev.find((item) => item.product.id === product.id);
      if (!exProduct) return [...prev, { product, quantity: 1 }];

      return prev.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    });
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
