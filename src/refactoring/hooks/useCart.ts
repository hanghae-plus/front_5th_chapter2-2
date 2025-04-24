import { useState } from "react";
import { CartItem, Coupon, Product } from "../../types";
import { calculateCartTotal, updateCartItemQuantity } from "../models/cart";

/**
 * 장바구니 기능을 제공하는 커스텀 훅
 * 엔티티 상태: cart, selectedCoupon
 * 액션 함수: addToCart, removeFromCart, updateQuantity, applyCoupon
 */
export const useCart = () => {
  // 엔티티 관련 상태
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  // UI 관련 상태
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  /**
   * 상품을 장바구니에 추가하는 액션 함수
   */
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

  /**
   * 상품을 장바구니에서 제거하는 액션 함수
   */
  const removeFromCart = (productId: string) => {
    setCart((cart) => cart.filter((item) => item.product.id !== productId));
  };

  /**
   * 장바구니 상품의 수량을 업데이트하는 액션 함수
   */
  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((cart) => updateCartItemQuantity(cart, productId, newQuantity));
  };

  /**
   * 쿠폰을 적용하는 액션 함수
   */
  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  /**
   * 장바구니 총액을 계산하는 순수 함수
   */
  const calculateTotal = () => {
    return calculateCartTotal(cart, selectedCoupon);
  };

  /**
   * 장바구니 열기/닫기를 제어하는 UI 액션 함수
   */
  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  // 장바구니가 비어있는지 확인하는 순수 함수
  const isCartEmpty = (): boolean => cart.length === 0;

  // 장바구니 아이템 총 개수를 계산하는 순수 함수
  const getTotalItems = (): number =>
    cart.reduce((total, item) => total + item.quantity, 0);

  return {
    // 엔티티 상태
    cart,
    selectedCoupon,

    // UI 상태
    isCartOpen,

    // 액션 함수
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    toggleCart,

    // 순수 함수 (계산)
    calculateTotal,
    isCartEmpty,
    getTotalItems,
  };
};
