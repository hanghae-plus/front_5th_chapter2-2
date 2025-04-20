// useCart.ts
import { useState } from 'react';
import { Cart, Coupon, Product } from '../../types';

export type AddToCart = (product: Product) => void;
export type RemoveFromCart = (productId: string) => void;
export type UpdateQuantity = (productId: string, newQuantity: number) => void;
export type ApplyCoupon = (coupon: Coupon) => void;
export type GetRemainingStock = (product: Product) => number;
export type TotalPrices = {
  totalBeforeDiscount: number;
  totalAfterDiscount: number;
  totalDiscount: number;
};
export type CalculateTotal = () => TotalPrices;
export type SelectedCoupon = Coupon | null;
export const useCart = () => {
  const [cart, setCart] = useState<Cart>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const getRemainingStock = (product: Product) => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    return product.stock - (cartItem?.quantity || 0);
  };

  const addToCart: AddToCart = (product: Product) => {
    console.log({ product });
    console.log({ cart });

    const remainingStock = getRemainingStock(product);
    if (remainingStock <= 0) return;

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

  const removeFromCart: RemoveFromCart = (productId: string) => {};

  const updateQuantity: UpdateQuantity = (
    productId: string,
    newQuantity: number,
  ) => {};

  const applyCoupon: ApplyCoupon = (coupon: Coupon) => {};

  const calculateTotal = () => ({
    totalBeforeDiscount: 0,
    totalAfterDiscount: 0,
    totalDiscount: 0,
  });

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
    getRemainingStock,
  };
};
