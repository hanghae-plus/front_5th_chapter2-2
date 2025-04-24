// useCart.ts
import { useState } from "react";
import { CartItem, Coupon, Product } from "../../types";
import { calculateCartTotal, updateCartItemQuantity } from "../models/cart";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if(existingItem) {
      const updatedCart = cart.map(item => {
        if(item.product.id === product.id) {
          return {...item, quantity: item.quantity + 1};
        }
        return item;
      });
      setCart(updatedCart);
      return;
    } else if(product.stock <= 0) {
      alert("재고가 없습니다.");
      return;
    }
    setCart((prevCart) => {
      return [...prevCart, { product, quantity: 1 }];
    })
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter(item => item.product.id !== productId);
    setCart(updatedCart);
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prev) => updateCartItemQuantity(prev, productId, newQuantity)) 
  };

  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  const calculateTotal = () => {
    const result = calculateCartTotal(cart, selectedCoupon);
    return result;
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
