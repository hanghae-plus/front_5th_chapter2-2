import { CartItem, Product } from '../types';

export const addProductToCart = (cart: CartItem[], product: Product): CartItem[] => {
  const existing = cart.find(item => item.product.id === product.id);
  if (existing) {
    return cart.map(item =>
      item.product.id === product.id
        ? {
            ...item,
            quantity: Math.min(item.quantity + 1, product.stock)
          }
        : item
    );
  } else {
    return [...cart, { product, quantity: 1 }];
  }
};

export const removeProductFromCart = (cart: CartItem[], productId: string): CartItem[] => {
  return cart.filter(item => item.product.id !== productId);
};