// useCart.ts
import { useState } from 'react';
import { CartItem, Coupon, Product } from '../../types';
import { calculateCartTotal, updateCartItemQuantity } from '../models/cart';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product) => {
    const checkExisitingCartItem = cart.find((item) => item.product.id === product.id);

    if (checkExisitingCartItem) {
      const updatedCart = updateCartItemQuantity(
        cart,
        product.id,
        checkExisitingCartItem.quantity + 1,
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item.product.id !== productId);
    setCart(updatedCart);
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prevCart) => {
      const updatedCart = updateCartItemQuantity(prevCart, productId, newQuantity);
      return updatedCart;
    });
  };

  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  const calculateTotal = () => {
    const total = calculateCartTotal(cart, selectedCoupon);
    return total;
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
