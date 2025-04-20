// useCart.ts
import { useState } from "react";
import { CartItem, Coupon, Product } from "../../types";
import { calculateCartTotal, updateCartItemQuantity } from "../models/cart";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product) => {
    const isInCart = cart.some((p) => p.product.id === product.id);

    if (isInCart) {
      setCart((prev) =>
        prev.map((p) =>
          p.product.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    }

    if (!isInCart) {
      setCart((prev) => [...prev, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((p) => p.product.id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prev) => updateCartItemQuantity(prev, productId, newQuantity));
  };

  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  const calculateTotal = () => calculateCartTotal(cart, selectedCoupon);

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
