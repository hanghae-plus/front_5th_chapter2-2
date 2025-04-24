import type { CartItem, Product } from '@/types';

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number,
): CartItem[] => {
  const targetIdx = cart.findIndex((item) => item.product.id === productId);
  if (targetIdx === -1) return cart;

  const updatedCart = [...cart];
  if (newQuantity === 0) {
    updatedCart.splice(targetIdx, 1);
  } else {
    const cartItem = cart[targetIdx];
    const quantity = Math.min(cartItem.product.stock, newQuantity);
    updatedCart[targetIdx] = { ...cartItem, quantity };
  }

  return updatedCart;
};

export const updateCartWithProduct = (
  prevCart: CartItem[],
  product: Product,
): CartItem[] => {
  const existingItem = prevCart.find((item) => item.product.id === product.id);
  if (!existingItem) {
    return [...prevCart, { product, quantity: 1 }];
  }

  return prevCart.map((item) => {
    if (item.product.id !== product.id) return item;
    const newQuantity = Math.min(item.quantity + 1, product.stock);
    return { ...item, quantity: newQuantity };
  });
};
