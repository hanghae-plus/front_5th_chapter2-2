// useCart.ts
import { useState } from 'react';
import { CartItem, Coupon, Product } from '../../types';
import { updateCartItemQuantity } from '../models/cart';
import { getTotalDiscount } from '../utils/discount';
export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product, initialQuantity: number = 1) => {
    const isProductInCart = cart.some((item) => item.product.id === product.id);
    let updatedCart: CartItem[];

    if (isProductInCart) {
      updatedCart = cart.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + initialQuantity }
          : item,
      );
    } else {
      updatedCart = [...cart, { product, quantity: initialQuantity }];
    }

    setCart(updatedCart);
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item.product.id !== productId);
    setCart(updatedCart);
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prev) => updateCartItemQuantity(prev, productId, newQuantity));
  };

  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  const calculateTotal = () => {
    const totalBeforeDiscount = cart.reduce(
      (sum, cur) => (sum += cur.product.price * cur.quantity),
      0,
    );

    const totalAfterDiscount =
      totalBeforeDiscount -
      getTotalDiscount({ cart, coupon: selectedCoupon, totalBeforeDiscount });

    const totalDiscount = totalBeforeDiscount - totalAfterDiscount;

    return {
      totalBeforeDiscount,
      totalAfterDiscount,
      totalDiscount,
    };
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
