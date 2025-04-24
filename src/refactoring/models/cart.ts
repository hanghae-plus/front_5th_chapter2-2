import { CartItem, Coupon, DISCOUNT_TYPE } from '../types';

export const calculateItemTotal = (item: CartItem) => {
  const { quantity, product } = item;

  const maxDiscount = getMaxApplicableDiscount(item);
  const discountAmount = product.price * (1 - maxDiscount);

  return quantity * discountAmount;
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const { quantity, product } = item;
  const { discounts } = product;

  const applicable = discounts.filter(d => quantity >= d.quantity);
  if (applicable.length === 0) return 0;

  return Math.max(...applicable.map(d => d.rate));
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  let totalDiscount = 0;

  const totalBeforeDiscount = cart.reduce((acc, item) => {
    const { quantity, product } = item;
    totalDiscount += getMaxApplicableDiscount(item) * product.price * quantity;
    const itemTotal = quantity * product.price;
    return acc + itemTotal;
  }, 0);

  if (selectedCoupon) {
    if (selectedCoupon.discountType === DISCOUNT_TYPE.AMOUNT) {
      totalDiscount += selectedCoupon.discountValue;
    } else {
      totalDiscount +=
        (totalBeforeDiscount - totalDiscount) *
        (selectedCoupon.discountValue / 100);
    }
  }

  return {
    totalBeforeDiscount,
    totalAfterDiscount: totalBeforeDiscount - totalDiscount,
    totalDiscount,
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  if (newQuantity <= 0) {
    return cart.filter(item => item.product.id !== productId);
  }

  return cart.map(item => {
    if (item.product.id !== productId) return item;

    // 변경이 없는 경우 (렌더링 최적화)
    if (item.quantity === newQuantity) return item;

    return {
      ...item,
      quantity: Math.min(newQuantity, item.product.stock),
    };
  });
};
