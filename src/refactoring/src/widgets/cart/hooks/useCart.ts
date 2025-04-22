// /src/widgets/cart/hooks/useCart.ts 파일에 추가
import { useState } from "react";
import { CartItem } from "../../../entities/cart/types";
import { Coupon } from "../../../entities/coupon/types";
import { Product } from "../../../entities/product/types";
import { useLocalStorage } from "../../../shared/hooks";
import { calculateCartTotal } from "../../../shared/utils";

export const useCart = () => {
  const [cart, setCart] = useLocalStorage<CartItem[]>("cart", []);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      if (product.stock <= 0) {
        return prevCart;
      }
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id,
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId),
    );
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prevCart) => {
      // 수량이 0 이하면 항목 제거
      if (newQuantity <= 0) {
        return prevCart.filter((item) => item.product.id !== productId);
      }

      // 수량 업데이트 (재고 범위 내에서)
      return prevCart.map((item) => {
        if (item.product.id === productId) {
          const limitedQuantity = Math.min(newQuantity, item.product.stock);
          return { ...item, quantity: limitedQuantity };
        }
        return item;
      });
    });
  };

  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  const calculateTotal = () => {
    const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
      calculateCartTotal(cart, selectedCoupon);
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
