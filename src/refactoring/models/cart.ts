import {CartItem, Coupon, Product} from "../../types";

export const calculateItemTotal = (item: CartItem) => {
  const {product, quantity} = item;
  const {price} = product;

  const total = price * quantity * (1 - getMaxApplicableDiscount(item));

  return Math.round(total);
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const {product, quantity} = item;
  const {discounts} = product;

  let maxDiscountRate = 0;

  discounts.forEach(discount => {
    if (quantity >= discount.quantity) {
      maxDiscountRate = Math.max(maxDiscountRate, discount.rate);
    }
  });

  return maxDiscountRate;
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  let totalBeforeDiscount = 0;
  let totalAfterDiscount = 0;

  cart.forEach(item => {
    const {product, quantity} = item;
    const {price} = product;

    totalBeforeDiscount += price * quantity;
    totalAfterDiscount += calculateItemTotal(item);
  });

  // 쿠폰 할인 적용
  if (selectedCoupon) {
    if (selectedCoupon.discountType === 'amount') {
      totalAfterDiscount = Math.max(0, totalAfterDiscount - selectedCoupon.discountValue);
    } else {
      totalAfterDiscount *= (1 - selectedCoupon.discountValue / 100);
    }
  }

  // 최종 반올림 처리
  totalBeforeDiscount = Math.round(totalBeforeDiscount);
  totalAfterDiscount = Math.round(totalAfterDiscount);
  const totalDiscount = Math.round(totalBeforeDiscount - totalAfterDiscount);

  return {
    totalBeforeDiscount: totalBeforeDiscount,
    totalAfterDiscount: totalAfterDiscount,
    totalDiscount: totalDiscount,
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  // 수량 <= 0: 해당 아이템 제거
  if (newQuantity <= 0) {
    return cart.filter(item => item.product.id !== productId);
  }
  // 수량 > 0: 해당 아이템의 수량 업데이트
  return cart.map(item => {
    if (item.product.id === productId) {
      const maxQuantity = item.product.stock;
      // 새 수량 <= 재고한도
      const updatedQuantity = Math.min(newQuantity, maxQuantity);
      return { ...item, quantity: updatedQuantity };
    }
    return item;
  });
};

export const getMaxDiscount = (discounts: { quantity: number; rate: number }[]) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

export const getRemainingStock = (product: Product, cart: CartItem[]) => {
  const cartItem = cart.find(item => item.product.id === product.id);
  return product.stock - (cartItem?.quantity ?? 0);
};

export const getAppliedDiscount = (item: CartItem) => {
  const { discounts } = item.product;
  const { quantity } = item;
  let appliedDiscount = 0;
  for (const discount of discounts) {
    if (quantity >= discount.quantity) {
      appliedDiscount = Math.max(appliedDiscount, discount.rate);
    }
  }
  return appliedDiscount;
};