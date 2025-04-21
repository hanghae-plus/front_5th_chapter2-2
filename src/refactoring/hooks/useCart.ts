// useCart.ts
import { useState } from "react";
import { CartItem, Coupon, Product } from "../../types";
import { getTotalDiscount } from "../utils/discount";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product) => {
    const isProductInCart = cart.some(item => item.product.id === product.id)

    if(isProductInCart) {
      const updatedCart = cart.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      setCart(updatedCart)
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter(item => item.product.id !== productId)
    setCart(updatedCart)
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    const updatedCart = cart.map(item => item.product.id === productId ? { ...item, quantity: newQuantity } : item)
    setCart(updatedCart)
  };

  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon)
  };

  const calculateTotal = () => {
    const totalBeforeDiscount = cart.reduce((sum, cur) => sum += cur.product.price * cur.quantity, 0)

    const totalAfterDiscount = totalBeforeDiscount - getTotalDiscount({ cart, coupon: selectedCoupon, totalBeforeDiscount })

    const totalDiscount = totalBeforeDiscount - totalAfterDiscount

    return {
      totalBeforeDiscount,
      totalAfterDiscount,
      totalDiscount,
    }
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
