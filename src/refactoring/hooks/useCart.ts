// useCart.ts
import { useState } from "react";
import {
  calculateTotalAfterDiscount,
  calculateTotalBeforeDiscount,
} from "../calculations/cart/calc-total-discount";
import { applyCouponDiscount } from "../calculations/coupon/apply-coupon";
import { CartItem, Coupon, Product } from "../entities";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product) => {};

  const removeFromCart = (productId: string) => {};

  const updateQuantity = (productId: string, newQuantity: number) => {};

  const applyCoupon = (coupon: Coupon) => {};

  const calculateTotal = () => {
    const totalBeforeDiscount = calculateTotalBeforeDiscount(cart);
    const totalAfterDiscount = calculateTotalAfterDiscount(cart);
    const totalAfterCoupon = applyCouponDiscount(totalAfterDiscount, selectedCoupon!);
    const totalDiscount = totalBeforeDiscount - totalAfterCoupon;

    return {
      totalBeforeDiscount: Math.round(totalBeforeDiscount),
      totalAfterDiscount: Math.round(totalAfterCoupon),
      totalDiscount: Math.round(totalDiscount),
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
