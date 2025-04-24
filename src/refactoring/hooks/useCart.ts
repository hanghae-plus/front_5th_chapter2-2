// useCart.ts
import { useState } from "react";
import { CartItem, Coupon, Product } from "../../types";
import {
  calculateCartTotal,
  findCartItem,
  removeCartItem,
  updateCartItemQuantity,
} from "../models/cart";

export const useCart = (selectedCoupon: Coupon | null) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    if (cartItem) {
      setCart((cart) =>
        updateCartItemQuantity(
          cart,
          cartItem.product.id,
          cartItem.quantity + 1,
        ),
      );
      return;
    }

    setCart((cart) => [...cart, { product, quantity: 1 }]);
  };

  const getCartItem = (id: string) => findCartItem(cart, id);

  const removeFromCart = (productId: string) =>
    setCart((cart) => removeCartItem(cart, productId));

  const updateQuantity = (productId: string, newQuantity: number) =>
    setCart((cart) => updateCartItemQuantity(cart, productId, newQuantity));

  const calculateTotal = () => calculateCartTotal(cart, selectedCoupon);

  return {
    cart,
    addToCart,
    getCartItem,
    removeFromCart,
    updateQuantity,
    calculateTotal,
    selectedCoupon,
  };
};
