import type { CartItem, CouponItem } from "../types";

export const getMaxApplicableDiscount = (item: CartItem): number => {
  return item.product.discounts.reduce((maxRate, d) => {
    // 수량 조건을 만족하고, 할인율이 더 높으면 갱신
    if (item.quantity >= d.quantity && d.rate > maxRate) {
      return d.rate;
    }
    return maxRate;
  }, 0);
};

/**
 * 한 아이템의 총액(할인 적용 후)
 */
export const calculateItemTotal = (item: CartItem): number => {
  const discountRate = getMaxApplicableDiscount(item);
  return item.product.price * item.quantity * (1 - discountRate);
};

/**
 * 장바구니 전체 총액 계산
 */
export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: CouponItem | null
) => {
  console.log("cart", cart);
  const totalBeforeDiscount = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  let totalAfterDiscount = cart.reduce(
    (sum, item) => sum + calculateItemTotal(item),
    0
  );

  if (selectedCoupon) {
    if (selectedCoupon.discountType === "amount") {
      totalAfterDiscount = Math.max(
        0,
        totalAfterDiscount - selectedCoupon.discountValue
      );
    } else {
      totalAfterDiscount *= 1 - selectedCoupon.discountValue / 100;
    }
  }

  const totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  console.log("totalBeforeDiscount", totalBeforeDiscount);
  console.log("totalAfterDiscount", totalAfterDiscount);
  console.log("totalDiscount", totalDiscount);
  return {
    totalBeforeDiscount: Math.round(totalBeforeDiscount),
    totalAfterDiscount: Math.round(totalAfterDiscount),
    totalDiscount: Math.round(totalDiscount),
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  const updatedCart = cart
    .map((item) => {
      if (item.product.id === productId) {
        const maxQuantity = item.product.stock;
        const updatedQuantity = Math.max(0, Math.min(newQuantity, maxQuantity));
        return updatedQuantity > 0
          ? { ...item, quantity: updatedQuantity }
          : null;
      }
      return item;
    })
    .filter((item): item is CartItem => item !== null);
  return updatedCart;
};
