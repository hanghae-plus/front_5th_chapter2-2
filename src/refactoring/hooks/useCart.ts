import { useState } from "react";
import { CartItem, Coupon, Product } from "../../types";
import { calculateCartTotal, updateCartItemQuantity } from "../models/cart";


/**
 * 장바구니 훅
 * @returns 장바구니 상태와 작업 함수
 */
export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product) => {
      setCart(prevCart =>{
        const cartItem = prevCart.find(({ product: { id } }) => id === product.id);
        if (!cartItem) return [...prevCart, { product, quantity: 1 }];
        return updateCartItemQuantity(prevCart, product.id, cartItem.quantity + 1);
      });
  }

  /**
   * 장바구니에서 제품을 제거
   * @param productId 제거할 제품의 ID
   * @returns 삭제된 장바구니
   */
  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(({product: {id}}) => id !== productId));
  };

  /**
   * 장바구니에서 제품의 수량을 업데이트
   * @param productId 수량을 업데이트할 제품의 ID
   * @param newQuantity 새로운 수량
   * @returns 업데이트된 장바구니
   */
  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) return removeFromCart(productId);
    setCart(prevCart => updateCartItemQuantity(prevCart, productId, newQuantity));
  };

  /**
   * 쿠폰을 적용
   * @param coupon 적용할 쿠폰
   * @returns 쿠폰 적용 여부
   */
  const applyCoupon = (coupon: Coupon) => setSelectedCoupon(coupon);

  /**
   * 총 금액을 계산
   * @returns 총 금액
   */
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