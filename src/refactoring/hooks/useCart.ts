// useCart.ts
import { useState } from "react";
import { CartItem, Coupon, Product } from "../../types";
import { calculateCartTotal, updateCartItemQuantity } from "../models/cart";
/**
 * 엔티티(cart,selectedCoupon)을 다루는 훅
 *
 *데이터: cart
 *액션: 
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
  계산:
    getRemainingStock,
    isRemainingStock,
    calculateTotal
 */
export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  /**남은 재고 수량을 반환합니다.*/
  const getRemainingStock = (product: Product) => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    return product.stock - (cartItem?.quantity || 0);
  };

  const isRemainingStock = (product: Product) => {
    return getRemainingStock(product) > 0;
  };

  /**장바구니에 상품을 추가합니다. */
  const addToCart = (product: Product) => {
    if (!isRemainingStock(product)) return;

    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id,
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item,
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  /**장바구니에서 상품을 삭제합니다 */
  const removeFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId),
    );
  };

  /** 재고수량을 업데이트합니다. */
  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prevCart) =>
      updateCartItemQuantity(prevCart, productId, newQuantity),
    );
  };

  /**쿠폰을 적용합니다.*/
  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  /**상품금액, 최종 결제 금액, 할인 금액을 반환합니다.  */
  const calculateTotal = () => calculateCartTotal(cart, selectedCoupon);

  return {
    cart,
    selectedCoupon,
    getRemainingStock,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
  };
};
