import { CartItem, Coupon } from "../../types";
// import { calculateCartTotal, updateCartItemQuantity } from "../models/cart";

/**
 *1. 할인 없이 총액을 계산해야 한다.
 *2. 수량에 따라 올바른 할인을 적용해야한다.
 */
export const calculateItemTotal = (item: CartItem) => {
  const { price } = item.product;
  const { quantity } = item;
  const discount = getMaxApplicableDiscount(item);
  let itemTotal = 0;
  itemTotal += price * quantity * (1 - discount);
  return itemTotal;
};

/**
 *1. 할인이 적용되지 않으면 0을 반환해야 한다.
 *2. 적용 가능한 가장 높은 할인율을 반환해야한다.
 */
export const getMaxApplicableDiscount = (item: CartItem) => {
  const { quantity } = item;
  const discount = item.product.discounts.reduce((maxDiscount, d) => {
    return quantity >= d.quantity && d.rate > maxDiscount
      ? d.rate
      : maxDiscount;
  }, 0);
  return discount;
};

/**
 *1. 쿠폰 없이 총액을 올바르게 계산해야한다.
 *2. 금액쿠폰을 올바르게 적용해야 한다.
 *3. 퍼센트 쿠폰을 올바르게 적용해야 한다.
 */
export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null,
) => {
  let totalBeforeDiscount = 0; //상품 금액
  let totalAfterDiscount = 0; //최종 결제 금액

  cart.forEach((item) => {
    const { price } = item.product;
    const { quantity } = item;
    totalBeforeDiscount += price * quantity;

    const discount = getMaxApplicableDiscount(item);

    totalAfterDiscount += price * quantity * (1 - discount);
  });

  //할인 금액
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

/**
 *1. 수량을 올바르게 업데이트해야합니다.
 *2. 수량이 0으로 설정된 경우, 항목을 제거해야 한다.
 *3. 재고 한도를 초과해서는 안된다.
 */
export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number,
): CartItem[] => {
  const newCart: CartItem[] = cart
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

  return newCart;
};

export const getMaxDiscount = (
  discounts: { quantity: number; rate: number }[],
) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};
