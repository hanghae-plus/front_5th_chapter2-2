// useCart.ts
import { useState } from "react";
import type { ICartItem, ICoupon, IProduct } from "#src/types";
import { calculateCartTotal, updateCartItemQuantity } from "#src/refactoring/pages/cart/_libs/cart";

export const useCart = () => {
  const [cart, setCart] = useState<ICartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<ICoupon | null>(null);

  const addToCart = (product: IProduct) => {
    setCart((prev) => {
      const exProduct = prev.find((item) => item.product.id === product.id);
      if (!exProduct) return [...prev, { product, quantity: 1 }];

      return prev.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prev) => updateCartItemQuantity(prev, productId, newQuantity));
  };

  const applyCoupon = (coupon: ICoupon) => {
    setSelectedCoupon(coupon);
  };

  const calculateTotal = () => {
    const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } = calculateCartTotal(cart, selectedCoupon);

    return {
      totalBeforeDiscount,
      totalAfterDiscount,
      totalDiscount,
    };
  };

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
