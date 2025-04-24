// useCart.ts
import { useState } from "react";
import { CartItem, Coupon, Product } from "../../types";
import { calculateCartTotal, updateCartItemQuantity } from "../models/cart";
import { useLocalStorage } from "../hooks";

export const addToCartOnExistItem = (
  cartItems: CartItem[],
  product: Product
) => {
  return cartItems.map((item) =>
    item.product.id === product.id
      ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
      : item
  );
};

export const useCart = () => {
  const { cart, setCart } = useLocalStorage("cart");
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const getRemainingStock = (product: Product) => {
    const cartItem = cart.find(
      (item: CartItem) => item.product.id === product.id
    );
    return product.stock - (cartItem?.quantity || 0);
  };

  const addToCart = (product: Product) => {
    const remainingStock = getRemainingStock(product);
    if (remainingStock <= 0) return;

    setCart((prevCart: CartItem[]) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return addToCartOnExistItem(prevCart, product);
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart: CartItem[]) =>
      prevCart.filter((item) => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prevCart: CartItem[]) => {
      return updateCartItemQuantity(prevCart, productId, newQuantity);
    });
  };

  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  const calculateTotal = () => calculateCartTotal(cart, selectedCoupon);

  return {
    cart,
    getRemainingStock,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  };
};
