// useCart.ts
import { useState } from "react";
import { CartItem, Coupon, Product } from "../../types";
import { calculateCartTotal, updateCartItemQuantity } from "../models/cart";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        // 같은 상품이 장바구니에 있으면 수량만 증가
        return prevCart.map(item => 
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // 새상품추가
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return; // 최소 1개 이상
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  const calculateTotal = () => {
    // 쿠폰적용 전 합계
    const totalBeforeDiscount = cart.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    // 할인총액
    const totalDiscount = selectedCoupon
      ? selectedCoupon.discountType === "amount"
        ? selectedCoupon.discountValue
        : totalBeforeDiscount * (selectedCoupon.discountValue / 100)
      : 0;
    
    // 쿠폰적용 후 합계
    const totalAfterDiscount = totalBeforeDiscount - totalDiscount;

    return {
      totalBeforeDiscount,
      totalDiscount,
      totalAfterDiscount
    }
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
