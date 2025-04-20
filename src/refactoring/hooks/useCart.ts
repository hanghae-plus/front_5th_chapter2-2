// useCart.ts
import { useState } from "react";
import { ICartItem, ICoupon, IProduct } from "../../types";
import { calculateCartTotal, updateCartItemQuantity } from "../models/cart";

export const useCart = () => {
  const [cart, setCart] = useState<ICartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<ICoupon | null>(null);

  const addToCart = (product: IProduct) => {};

  const removeFromCart = (productId: string) => {};

  const updateQuantity = (productId: string, newQuantity: number) => {};

  const applyCoupon = (coupon: ICoupon) => {};

  const calculateTotal = () => ({
    totalBeforeDiscount: 0,
    totalAfterDiscount: 0,
    totalDiscount: 0,
  });

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
