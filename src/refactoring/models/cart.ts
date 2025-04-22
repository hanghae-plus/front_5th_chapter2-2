import { CartItem, Coupon } from '../../types';

export const calculateItemTotal = (item: CartItem) => {
  const originalTotal = calculateItemOriginalTotal(item);
  const discountTotal = calculateItemDiscountTotal(originalTotal, item);

  return discountTotal;
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  return item.product.discounts.reduce((maxDiscount, d) => {
    return item.quantity >= d.quantity && d.rate > maxDiscount
      ? d.rate
      : maxDiscount;
  }, 0);
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null,
) => {
  let totalBeforeDiscount = 0;
  let totalAfterDiscount = 0;

  cart.forEach((item) => {
    const originalTotal = calculateItemOriginalTotal(item);
    totalBeforeDiscount += originalTotal;
    totalAfterDiscount += calculateItemDiscountTotal(originalTotal, item);
  });

  let totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  // TODO: 쿠폰 할인을 별도로 분리할지 말지 체크
  if (selectedCoupon) {
    if (selectedCoupon.discountType === 'amount') {
      const discountValue = totalAfterDiscount - selectedCoupon.discountValue;
      totalAfterDiscount = Math.max(0, discountValue);
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
  const targetIdx = cart.findIndex((item) => item.product.id === productId);
  if (targetIdx === -1) return cart;

  const updatedCart = [...cart];
  if (newQuantity === 0) {
    updatedCart.splice(targetIdx, 1);
  } else {
    const cartItem = cart[targetIdx];
    const quantity = Math.min(cartItem.product.stock, newQuantity);
    const newCartItem = { ...cartItem, quantity };

    updatedCart[targetIdx] = newCartItem;
  }

  return updatedCart;
};

const calculateItemOriginalTotal = (item: CartItem): number => {
  const { price } = item.product;
  const { quantity } = item;

  return price * quantity;
};

const calculateItemDiscountTotal = (total: number, item: CartItem): number => {
  if (item.product.discounts.length === 0) return total;

  const discount = getMaxApplicableDiscount(item);

  return total * (1 - discount);
};
