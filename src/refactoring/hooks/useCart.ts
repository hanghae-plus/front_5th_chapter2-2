// useCart.ts
import { useState } from 'react';
import { Cart, Coupon, Product } from '../../types';
import {
  addExitingItemToCart,
  addNewItemToCart,
  calculateCartTotal,
  findCartItemById,
  removeItemFromCart,
  updateCartItemQuantity,
} from '../models/cart.ts';

export type AddToCart = (product: Product) => void;
export type RemoveFromCart = (productId: string) => void;
export type UpdateQuantity = (productId: string, newQuantity: number) => void;
export type GetRemainingStock = (product: Product) => number;

export const useCart = () => {
  const [cart, setCart] = useState<Cart>([]);

  function getRemainingStock(product: Product) {
    const cartItem = findCartItemById(cart, product.id);
    return product.stock - (cartItem?.quantity || 0);
  }

  function addToCart(product: Product) {
    const remainingStock = getRemainingStock(product);
    if (remainingStock <= 0) return;

    setCart((prevCart) => {
      return findCartItemById(prevCart, product.id)
        ? addExitingItemToCart(prevCart, product)
        : addNewItemToCart(prevCart, product);
    });
  }

  function removeFromCart(productId: string) {
    setCart((prevCart) => removeItemFromCart(prevCart, productId));
  }

  function updateQuantity(productId: string, newQuantity: number) {
    setCart((prevCart) =>
      updateCartItemQuantity(prevCart, productId, newQuantity),
    );
  }

  //todo: 따로 분리하고 싶은데 test코드 상 분리할 수가 없어보임..
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  function applyCoupon(coupon: Coupon) {
    setSelectedCoupon(coupon);
  }
  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getRemainingStock,
    selectedCoupon,
    applyCoupon,
    calculateTotal: () => calculateCartTotal(cart, selectedCoupon),
  };
};
