import { CartItem, Coupon, Discount } from "../../types";

export interface CartTotal {
  totalBeforeDiscount: number;
  totalAfterDiscount: number;
  totalDiscount: number;
}

const isDiscountApplicable = (cartItem: CartItem, discount: Discount) => {
  return cartItem.quantity >= discount.quantity;
};

const calculateOriginalItemTotal = (cartItem: CartItem) => {
  return cartItem.quantity * cartItem.product.price;
};

const percentageToRate = (percentage: number) => {
  return percentage / 100;
};

const applyDiscount = (originalPrice: number, discountRate: number) => {
  return originalPrice * (1 - discountRate);
};

export const calculateItemTotal = (cartItem: CartItem) => {
  const originalPrice = calculateOriginalItemTotal(cartItem);
  const maxDiscountRate = getMaxApplicableDiscount(cartItem);

  return applyDiscount(originalPrice, maxDiscountRate);
};

export const getMaxApplicableDiscount = (cartItem: CartItem) => {
  return cartItem.product.discounts.reduce((maxDiscountRate, discount) => {
    if (discount.rate <= maxDiscountRate) return maxDiscountRate;
    if (!isDiscountApplicable(cartItem, discount)) return maxDiscountRate;

    return discount.rate;
  }, 0);
};

const calculateCouponAppliedTotal = (
  cartTotal: CartTotal,
  selectedCoupon: Coupon | null
): CartTotal => {
  if (!selectedCoupon) return cartTotal;

  const couponAppliedTotal = { ...cartTotal };

  switch (selectedCoupon.discountType) {
    case "amount": {
      couponAppliedTotal.totalAfterDiscount -= selectedCoupon.discountValue;
      couponAppliedTotal.totalDiscount =
        couponAppliedTotal.totalBeforeDiscount -
        couponAppliedTotal.totalAfterDiscount;
      break;
    }
    case "percentage": {
      couponAppliedTotal.totalAfterDiscount *=
        1 - percentageToRate(selectedCoupon.discountValue);
      couponAppliedTotal.totalDiscount =
        couponAppliedTotal.totalBeforeDiscount -
        couponAppliedTotal.totalAfterDiscount;
      break;
    }
    default:
      throw new Error("discountType 오류");
  }

  return couponAppliedTotal;
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
): CartTotal => {
  // 카트 총 금액 계산
  const cartTotal = cart.reduce(
    (cartTotal, cartItem) => {
      const updatedCartTotal = { ...cartTotal };

      const itemBeforeDiscount = calculateOriginalItemTotal(cartItem);
      const itemAfterDiscount = calculateItemTotal(cartItem);
      const itemDiscount = itemBeforeDiscount - itemAfterDiscount;

      updatedCartTotal.totalBeforeDiscount += itemBeforeDiscount;
      updatedCartTotal.totalAfterDiscount += itemAfterDiscount;
      updatedCartTotal.totalDiscount += itemDiscount;

      return updatedCartTotal;
    },
    {
      totalBeforeDiscount: 0,
      totalAfterDiscount: 0,
      totalDiscount: 0,
    }
  );

  // 쿠폰 적용 총 금액 계산
  const couponAppliedTotal = calculateCouponAppliedTotal(
    cartTotal,
    selectedCoupon
  );

  return couponAppliedTotal;
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  // 카트에서 제거
  if (newQuantity <= 0) {
    return cart.filter((cartItem) => cartItem.product.id !== productId);
  }

  // 카트 수량 업데이트
  return cart.map((cartItem) => {
    if (cartItem.product.id === productId) {
      return {
        ...cartItem,
        quantity: Math.min(newQuantity, cartItem.product.stock),
      };
    }

    return cartItem;
  });
};
