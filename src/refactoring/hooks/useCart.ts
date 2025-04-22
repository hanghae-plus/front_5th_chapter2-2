// useCart.ts
import { useState } from 'react';
import { CartItem, Coupon, Product } from '../../types';
import { calculateCartTotal, updateCartItemQuantity } from '../models/cart';

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

// util 함수들
// 상품 추가 또는 수량 업데이트
const addCartProduct = (cart: CartItem[], product: Product): CartItem[] => {
  const existingItem = cart.find((item) => item.product.id === product.id);
  return existingItem
    ? updateCartItemQuantity(cart, product.id, existingItem.quantity + 1)
    : [...cart, { product, quantity: 1 }];
};

// 상품 제거
const removeCartProduct = (cart: CartItem[], productId: string): CartItem[] =>
  cart.filter((item) => item.product.id !== productId);

// 빈 장바구니 총액을 반환
const getDefaultCartTotal = () => ({
  totalBeforeDiscount: 0,
  totalAfterDiscount: 0,
  totalDiscount: 0,
});
