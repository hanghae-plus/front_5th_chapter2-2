// useCart.ts
import { useState } from "react";
import { CartItem, Coupon, Product } from "../../types";
import { calculateCartTotal, updateCartItemQuantity } from "../models/cart";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product) => {
    // 리팩토링 필요
    const targetProduct = cart.find((item) => item.product.id === product.id);
    if (!targetProduct) {
      setCart((prev) => [
        ...prev,
        {
          product: { ...product, stock: product.stock - 1 },
          quantity: 1,
        },
      ]);
      return;
    }
    setCart(
      cart.map((item) => {
        if (item.product.id === product.id) {
          return {
            product: { ...item.product, stock: product.stock - 1 },
            quantity: item.quantity + 1,
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string) => {
    const removeItem = cart.filter((item) => item.product.id !== productId);
    setCart(removeItem);
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    const updatedCartItem = updateCartItemQuantity(
      cart,
      productId,
      newQuantity
    );
    const targetProduct = cart.find((item) => item.product.id === productId);
    if (targetProduct && targetProduct.product.stock === 0) {
      return;
    }

    setCart(updatedCartItem);
  };

  const applyCoupon = (coupon: Coupon) => {};

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
