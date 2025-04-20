// useCart.ts
import { useState } from 'react';
import { Cart, CartItem, Product } from '../../types';
import { updateCartItemQuantity } from '../models/cart.ts';

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

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getRemainingStock,
  };
};
