// useCart.ts
import { useCallback, useState } from "react";
import { CartItem, Coupon, LOCAL_STORAGE_KEY, Product } from "../../types";
import { addToCartCheckStock, calculateCartTotal, updateCartItemQuantity } from "../models/cart";
import { useLocalStorage } from "./useLocalStorage";

export const useCart = () => {
  // const [cart, setCart] = useState<CartItem[]>([]);
  const [cart, setCart] = useLocalStorage<CartItem[]>(LOCAL_STORAGE_KEY.CART, []);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => addToCartCheckStock(prev, product));
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

  const getRemainingStock = useCallback(
    (product: Product) => {
      const cartItem = cart.find((item) => item.product.id === product.id);
      return product.stock - (cartItem?.quantity || 0);
    },
    [cart]
  );

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
    getRemainingStock,
  };
};
