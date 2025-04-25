import { useState } from "react";
import { CartItem, Coupon, Product } from "../../types";
import * as CartModel from "../models/cart";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const findCartItem = (product: Product) => {
    return cart.find((cartItem) => cartItem.product.id === product.id);
  };

  const addToCart = (product: Product) => {
    const targetCartItem = findCartItem(product);

    // 기존 상품 수량 변경
    if (targetCartItem) {
      setCart((prevCart) =>
        CartModel.updateCartItemQuantity(
          prevCart,
          product.id,
          targetCartItem.quantity + 1
        )
      );
      return;
    }

    // 새로 추가
    setCart((prevCart) => [...prevCart, { product, quantity: 1 }]);
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.product.id !== productId)
    );
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prevCart) =>
      CartModel.updateCartItemQuantity(prevCart, productId, newQuantity)
    );
  };

  const applyCoupon = (coupon: Coupon) => setSelectedCoupon(coupon);

  const calculateTotal = () =>
    CartModel.calculateCartTotal(cart, selectedCoupon);

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
