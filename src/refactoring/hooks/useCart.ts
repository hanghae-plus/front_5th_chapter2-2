// useCart.ts
import { useCallback, useState } from "react";
import { CartItem, Coupon, Product } from "../../types";
import { calculateCartTotal, updateCartItemQuantity } from "../models/cart";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const next = [...prev];
      const idx = next.findIndex((item) => item.product.id === product.id);

      // 있는 경우 재고
      if (idx !== -1) {
        const item = next[idx];
        const quantity = Math.min(item.quantity + 1, product.stock);
        next[idx] = { ...item, quantity };
        return next;
      }

      return [...next, { product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => updateCartItemQuantity(prev, productId, 0));
  }, []);

  const updateQuantity = useCallback((productId: string, newQuantity: number) => {
    setCart((prev) => updateCartItemQuantity(prev, productId, newQuantity));
  }, []);

  const applyCoupon = useCallback((coupon: Coupon) => {
    setSelectedCoupon(coupon);
  }, []);

  const calculateTotal = () => calculateCartTotal(cart, selectedCoupon);

  return { cart, addToCart, removeFromCart, updateQuantity, applyCoupon, calculateTotal, selectedCoupon };
};
