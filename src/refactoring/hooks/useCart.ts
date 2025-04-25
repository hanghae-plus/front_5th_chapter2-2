import { CartItem, Coupon, Product } from '../../types';
import { useLocalStorage } from './useLocalStorage';
import { calculateDiscount, DiscountCalculation } from './useDiscountCalculator';
import { useState } from 'react';
/**
 * 장바구니 관리를 위한 커스텀 훅
 * @returns 장바구니 상태와 관련 함수들
 */
export const useCart = () => {
  // 로컬 스토리지를 사용하여 장바구니 정보 유지
  const [cart, setCart] = useLocalStorage<CartItem[]>('cart', []);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  /**
   * 장바구니에 상품 추가
   * @param product 추가할 상품
   * @param quantity 추가할 수량
   */
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        return [...prev, { product, quantity }];
      }
    });
  };

  /**
   * 장바구니에서 상품 제거
   * @param productId 제거할 상품의 ID
   */
  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  /**
   * 장바구니 상품 수량 업데이트
   * @param productId 상품 ID
   * @param quantity 새 수량
   */
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prev => 
      prev.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  /**
   * 쿠폰 적용
   * @param coupon 적용할 쿠폰
   */
  const applyCoupon = (coupon: Coupon | null) => {
    setSelectedCoupon(coupon);
  };

  /**
   * 장바구니 비우기
   */
  const clearCart = () => {
    setCart([]);
    setSelectedCoupon(null);
  };

  /**
   * 할인 적용 후 최종 금액 계산 (함수로 반환)
   * @returns 할인 계산 결과
   */
  const calculateTotal = (): DiscountCalculation => {
    return calculateDiscount(cart, selectedCoupon);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    selectedCoupon,
    applyCoupon,
    clearCart,
    calculateTotal
  };
};