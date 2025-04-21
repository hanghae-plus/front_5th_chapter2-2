import { useState } from "react";
import { CartItem, Coupon, Product } from "../../types";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.product.id === product.id);
    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart((prevCart) => [...prevCart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId),
    );
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    );
  };

  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  const calculateTotal = () => {
    const getItemDiscountRate = (item: CartItem) => {
      return item.product.discounts.reduce(
        (rate, d) =>
          item.quantity >= d.quantity ? Math.max(rate, d.rate) : rate,
        0,
      );
    };

    const getItemPrice = (item: CartItem) => {
      const base = item.product.price * item.quantity;
      const discountRate = getItemDiscountRate(item);
      return base * (1 - discountRate);
    };

    const totalBefore = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    const totalAfterItemDiscount = cart.reduce(
      (sum, item) => sum + getItemPrice(item),
      0,
    );

    const applyCouponDiscount = (amount: number) => {
      if (!selectedCoupon) return amount;

      return selectedCoupon.discountType === "amount"
        ? amount - selectedCoupon.discountValue
        : amount * (1 - selectedCoupon.discountValue / 100);
    };

    const totalAfter = Math.max(
      0,
      Math.floor(applyCouponDiscount(totalAfterItemDiscount)),
    );
    const discount = Math.floor(totalBefore - totalAfter);

    return {
      totalBeforeDiscount: totalBefore,
      totalAfterDiscount: totalAfter,
      totalDiscount: discount,
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
