// useCart.ts
import { useState } from 'react';
import { Cart, CartItem, Coupon, Product } from '../../types';
import { calculateCartTotal, updateCartItemQuantity } from '../models/cart.ts';
import { ApplyCoupon } from './useCoupon.ts';

export type AddToCart = (product: Product) => void;
export type RemoveFromCart = (productId: string) => void;
export type UpdateQuantity = (productId: string, newQuantity: number) => void;

export type GetRemainingStock = (product: Product) => number;

//계산
const findItemById = (cart: Cart, id: string): CartItem | undefined => {
  const foundItem = cart.find((item) => item.product.id === id);
  return foundItem ? { ...foundItem } : undefined;
};

//계산
const addNewItemToCart = (prevCart: Cart, product: Product): Cart => [
  ...prevCart,
  { product, quantity: 1 },
];

// 계산
const addExitingItemToCart = (prevCart: Cart, product: Product) =>
  prevCart.map((item) =>
    item.product.id === product.id
      ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
      : item,
  );

export const useCart = () => {
  const [cart, setCart] = useState<Cart>([]);

  const getRemainingStock = (product: Product) => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    return product.stock - (cartItem?.quantity || 0);
  };

  const addToCart: AddToCart = (product: Product) => {
    const remainingStock = getRemainingStock(product);
    if (remainingStock <= 0) return;

    setCart((prevCart) => {
      const existingItem = findItemById(prevCart, product.id);
      return existingItem
        ? addExitingItemToCart(prevCart, product)
        : addNewItemToCart(prevCart, product);
    });
  };

  const removeFromCart: RemoveFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          return item.product.id === productId ? null : item;
        })
        .filter((item): item is CartItem => item !== null),
    );
  };

  const updateQuantity: UpdateQuantity = (
    productId: string,
    newQuantity: number,
  ) => {
    setCart((prevCart) =>
      updateCartItemQuantity(prevCart, productId, newQuantity),
    );
  };

  //todo: 따로 분리하고 싶은데 test코드 상 분리할 수가 없어보임..
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const applyCoupon: ApplyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };
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
