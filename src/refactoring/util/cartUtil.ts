import { CartItem, Coupon, Product } from "../../types.ts";

/**
 * 상품의 남은 재고를 계산합니다.
 */
export const getRemainingStock = (
  product: Product,
  cart: CartItem[]
): number => {
  const cartItem = cart.find((item) => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
};

/**
 * 상품의 최대 할인율을 계산합니다.
 */
export const getMaxDiscount = (
  discounts: { quantity: number; rate: number }[]
): number => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

/**
 * 장바구니 항목에 적용된 할인율을 계산합니다.
 */
export const getAppliedDiscount = (item: CartItem): number => {
  const { discounts } = item.product;
  const { quantity } = item;

  return discounts.reduce((maxDiscount, discount) => {
    return quantity >= discount.quantity && discount.rate > maxDiscount
      ? discount.rate
      : maxDiscount;
  }, 0);
};

/**
 * 장바구니의 총액을 계산합니다.
 */
export const calculateTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  let totalBeforeDiscount = 0;
  let totalAfterDiscount = 0;

  cart.forEach((item) => {
    const { price } = item.product;
    const { quantity } = item;
    totalBeforeDiscount += price * quantity;

    const discount = getAppliedDiscount(item);
    totalAfterDiscount += price * quantity * (1 - discount);
  });

  let finalTotalAfterDiscount = totalAfterDiscount;

  // 쿠폰 적용
  if (selectedCoupon) {
    if (selectedCoupon.discountType === "amount") {
      finalTotalAfterDiscount = Math.max(
        0,
        totalAfterDiscount - selectedCoupon.discountValue
      );
    } else {
      finalTotalAfterDiscount *= 1 - selectedCoupon.discountValue / 100;
    }
  }

  const totalDiscount = totalBeforeDiscount - finalTotalAfterDiscount;

  return {
    totalBeforeDiscount: Math.round(totalBeforeDiscount),
    totalAfterDiscount: Math.round(finalTotalAfterDiscount),
    totalDiscount: Math.round(totalDiscount),
  };
};
