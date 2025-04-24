import { CartItem, Coupon } from "../../types";

export const calculateItemTotal = (item: CartItem) => {
  const { price, discounts } = item.product;
  const { quantity } = item;

  // 수량 조건에 맞는 할인 목록 필터
  const applicableDiscounts = discounts
    .filter((discount) => quantity >= discount.quantity)
    .map((discount) => discount.rate);

  // 가장 큰 할인률 (없으면 0)
  const maxDiscountRate =
    applicableDiscounts.length > 0 ? Math.max(...applicableDiscounts) : 0;

  const discountedTotal = price * quantity * (1 - maxDiscountRate);

  return discountedTotal;
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const { quantity } = item;
  const { discounts } = item.product;

  // 수량 조건을 만족하는 할인만 필터링
  const applicableRates = discounts
    .filter((discount) => quantity >= discount.quantity)
    .map((discount) => discount.rate);

  // 가장 큰 할인률 (없으면 0)
  return applicableRates.length > 0 ? Math.max(...applicableRates) : 0;
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null,
) => {
  let totalBeforeDiscount = 0;
  let totalAfterDiscount = 0;

  cart.forEach((item) => {
    const { price } = item.product;
    const { quantity } = item;
    totalBeforeDiscount += price * quantity;

    const discount = item.product.discounts.reduce((maxDiscount, d) => {
      return quantity >= d.quantity && d.rate > maxDiscount
        ? d.rate
        : maxDiscount;
    }, 0);

    totalAfterDiscount += price * quantity * (1 - discount);
  });

  let totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  // 쿠폰 적용
  if (selectedCoupon) {
    if (selectedCoupon.discountType === "amount") {
      totalAfterDiscount = Math.max(
        0,
        totalAfterDiscount - selectedCoupon.discountValue,
      );
    } else {
      totalAfterDiscount *= 1 - selectedCoupon.discountValue / 100;
    }
    totalDiscount = totalBeforeDiscount - totalAfterDiscount;
  }

  return {
    totalBeforeDiscount: Math.round(totalBeforeDiscount),
    totalAfterDiscount: Math.round(totalAfterDiscount),
    totalDiscount: Math.round(totalDiscount),
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number,
): CartItem[] => {
  return cart
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
};
