// useCart.ts
import { useState } from "react";
import { CartItem, Coupon, Product } from "../../types";
import { calculateCartTotal, updateCartItemQuantity } from "../models/cart";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product) => {
    console.log("addToCart", product);
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        console.log("Product already in cart, updating quantity");
        return prevCart.map((item) =>
          item.product.id === product.id ? {
            ...item,
            quantity: item.quantity + 1,
          } : item
        );
      } else {
        console.log("Product not in cart, adding to cart");
        return [
          ...prevCart,
          {
            product: product,
            quantity: 1,
          },
        ];
      };
    })
  }


  const removeFromCart = (productId: string) => {
    console.log("removeFromCart", productId);
    setCart((preCart) => preCart.filter((item) => item.product.id !== productId))
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    console.log("updateQuantity", productId, newQuantity);

    setCart((prevCart) => {
      const updatedCart = updateCartItemQuantity(prevCart, productId, newQuantity);
      return updatedCart;
    }
    );
  };

  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon((prevCoupon) => {
      if (prevCoupon && prevCoupon.code === coupon.code) {
        console.log("Coupon already applied, removing coupon");
        return null;
      } else {
        console.log("Applying new coupon", coupon);
        return coupon;
      }

    })

  };

  const calculateTotal = () => (
    calculateCartTotal(cart, selectedCoupon)
  );

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
