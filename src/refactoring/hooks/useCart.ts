// useCart.ts
import { useState } from "react";
import { CartItem, Coupon, Product } from "../../types";
import { calculateCartTotal, updateCartItemQuantity } from "../models/cart";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product) => {
    // 없는 상품이면 push.
    const isInCart = cart.some((item) => item.product.id === product.id);

    // 있는 상품이면 quantity ++1
    let newCart: CartItem[] = [];
    if (isInCart) {
      cart.forEach((item) => {
        if (item.product.id !== product.id)
          newCart.push({ ...item, quantity: item.quantity });
        const newItem = { ...item, quantity: item.quantity + 1 };
        newCart.push(newItem);
      });
    }

    if (!isInCart) {
      newCart = [...cart, { product, quantity: 1 }];
    }

    setCart(newCart);
  };

  const removeFromCart = (productId: string) => {
    const newCart = cart.filter((item) => item.product.id !== productId);
    setCart(newCart);
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prev) => updateCartItemQuantity(prev, productId, newQuantity));
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
