import { useState } from "react";
import { CartItem, Coupon, Product } from "../types";
import { calculateCartTotal, updateCartItemQuantity } from "../models/cart";

// 장바구니 상태를 관리하는 커스텀 훅
export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  // 상품 추가
  const addToCart = (product: Product) => {
    //함수형 업데이트 이곳에서 사용!!! 
    setCart(latest  => {
      const existing = latest .find(item => item.product.id === product.id);

      if (existing) {
        // 이미 있는 상품은 수량 증가
        return latest .map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // 새 상품은 수량 1로 추가
        return [...latest , { product, quantity: 1 }];
      }
    });
  };

  // 상품 제거
  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  // 수량 업데이트
  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart(prevCart => updateCartItemQuantity(prevCart, productId, newQuantity));
  };

  // 쿠폰 적용
  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  // 총액 계산
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
