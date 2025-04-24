// useCart.ts
import { useState } from 'react';
import { CartItem, Coupon, Product } from '../types';
import { calculateCartTotal, updateCartItemQuantity } from '../models/cart';
import { getRemainingStock } from '../utils/product';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  // cart에 제품을 추가하는 함수
  const addToCart = (product: Product) => {
    const remainingStock = getRemainingStock(product, cart);
    if (remainingStock <= 0) return;

    setCart(prevCart => {
      const existingItem = prevCart.find(
        item => item.product.id === product.id
      );
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  // cart에서 제품을 제거하는 함수
  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter(item => item.product.id !== productId);
    setCart(updatedCart);
  };

  // cart에서 제품의 수량을 업데이트하는 함수
  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart(prevCart =>
      updateCartItemQuantity(prevCart, productId, newQuantity)
    );
  };
  // 쿠폰을 적용하는 함수
  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  // 장바구니의 총합을 계산하는 함수
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
