import { useState } from 'react';
import { CartItem, Coupon, Product } from '../../types';
import {
  calculateCartTotal,
  addCartProduct,
  updateCartItemQuantity,
  removeCartProduct,
  getDefaultCartTotal,
} from '../models/cart';

// 장바구니 관련 커스텀 훅
export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  // 장바구니에 상품 추가
  const addToCart = (product: Product) => {
    setCart((prev) => addCartProduct(prev, product));
  };

  // 장바구니에서 상품 제거
  const removeFromCart = (productId: string) => {
    setCart((prev) => removeCartProduct(prev, productId));
  };

  // 장바구니 수량 업데이트
  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prev) => updateCartItemQuantity(prev, productId, newQuantity));
  };

  // 쿠폰 적용
  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  // 장바구니 총액 계산
  const calculateTotal = () =>
    cart.length > 0
      ? calculateCartTotal(cart, selectedCoupon)
      : getDefaultCartTotal();

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
