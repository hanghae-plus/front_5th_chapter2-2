import { CartItem, Coupon } from "../../types";
//솔직히 없어져도 됨. cart.ts는 entities에 들어가야함. 테스트 코드떔에 남아있다.
//계산
export const calculateItemTotal = (item: CartItem) => {
  const { quantity, product } = item;
  console.log("상품명", product.name);
  console.log("상품 수량", quantity);
  const total = product.price * quantity;
  if(product.discounts) {
    const applicableDiscount = product.discounts
      .filter(d => quantity >= d.quantity)
      .sort((a, b) => b.rate - a.rate)[0]; // 가장 높은 할인율 선택

    if (applicableDiscount) {
      const discountAmount = total * applicableDiscount.rate;
      console.log("할인 금액", discountAmount);
      return total - discountAmount;
    }
  }
  return total;
};

export const getMaxApplicableDiscount = (item: CartItem): number => {
  const { quantity, product } = item;

  if (!product.discounts || product.discounts.length === 0) return 0;

  const applicable = product.discounts
    .filter(d => quantity >= d.quantity)
    .sort((a, b) => b.rate - a.rate)[0]; // 가장 높은 할인율 선택

  return applicable ? applicable.rate : 0;
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  // 1. 상품별 할인 먼저 계산
  const totalBeforeDiscount = cart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const totalProductDiscount = cart.reduce((discount, item) => {
    const rate = getMaxApplicableDiscount(item);
    return discount + item.product.price * item.quantity * rate;
  }, 0);

  // 2. 상품 할인 후 금액 기준으로 쿠폰 할인 적용
  const afterProductDiscount = totalBeforeDiscount - totalProductDiscount;

  let couponDiscount = 0;
  if (selectedCoupon) {
    if (selectedCoupon.discountType === 'percentage') {
      couponDiscount = afterProductDiscount * (selectedCoupon.discountValue / 100);
    } else if (selectedCoupon.discountType === 'amount') {
      couponDiscount = selectedCoupon.discountValue;
    }
  }

  const totalAfterDiscount = totalBeforeDiscount - totalProductDiscount - couponDiscount;

  return {
    totalBeforeDiscount,
    totalAfterDiscount: Math.max(totalAfterDiscount, 0),
    totalDiscount: totalProductDiscount + couponDiscount,
  };
};


export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number,
): CartItem[] => {
  return cart
    .map((item) => {
      if (item.product.id !== productId) {
        return item;
      }

      const maxQuantity = item.product.stock;
      const updatedQuantity = Math.max(0, Math.min(newQuantity, maxQuantity));

      return updatedQuantity > 0
        ? { ...item, quantity: updatedQuantity }
        : null;
    })
    .filter((item) => item !== null);
};