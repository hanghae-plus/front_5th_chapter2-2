// useCart.ts
import {useState} from "react";
import {CartItem, Coupon, Product} from "../../types";
import {
  calculateCartTotal,
  updateCartItemQuantity,
  getRemainingStock,
  getAppliedDiscount,
  getMaxDiscount,
} from "../models/cart";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product) => {
    if (product.stock <= 0) return;

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.product.id === product.id);

      if (existingIndex >= 0) {
        const updatedCart = [...prevCart];
        const existingItem = updatedCart[existingIndex];

        const newQuantity = Math.min(existingItem.quantity + 1, product.stock);

        updatedCart[existingIndex] = {
          ...existingItem,
          quantity: newQuantity,
        };

        return updatedCart;
      } else {
        return [...prevCart, {product, quantity: 1}];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart(prevCart => updateCartItemQuantity(prevCart, productId, newQuantity));
  };

  const getProductRemainingStock = (product: Product) => {
    return getRemainingStock(product, cart);
  }

  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  const getItemAppliedDiscount = (item: CartItem) => {
    return getAppliedDiscount(item);
  }

  const calculateTotal = () => calculateCartTotal(cart, selectedCoupon);


  return {
    cart,
    selectedCoupon,
    addToCart,
    removeFromCart,
    updateQuantity,
    getProductRemainingStock,
    getItemAppliedDiscount,
    getMaxDiscount,
    applyCoupon,
    calculateTotal,
  };
};
