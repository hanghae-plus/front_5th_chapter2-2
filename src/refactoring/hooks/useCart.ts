import { useState } from "react";
import { CartItem, Coupon, Product } from "../../types";
import { calculateCartTotal, updateCartItemQuantity } from "../models/cart";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product) => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    if (cartItem) {
      setCart((cart) =>
        updateCartItemQuantity(cart, cartItem.product.id, cartItem.quantity + 1)
      );
      return;
    }

    setCart((cart) => [...cart, { product, quantity: 1 }]);
  };

  const removeFromCart = (productId: string) => {
    setCart((cart) => cart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((cart) => updateCartItemQuantity(cart, productId, newQuantity));
  };

  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  const calculateTotal = () => {
    return calculateCartTotal(cart, selectedCoupon);
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
