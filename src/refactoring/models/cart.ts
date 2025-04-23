import { CartItem, Coupon } from '../../types';

export const calculateItemTotal = (item: CartItem) => {
  const { price } = item.product;
  const { quantity } = item;
  const discount = getMaxApplicableDiscount(item);
  return price * quantity * (1 - discount);
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const { quantity } = item;
  return item.product.discounts.reduce(
    (maxDiscount, d) =>
      quantity >= d.quantity && d.rate > maxDiscount ? d.rate : maxDiscount,
    0
  );
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  const totalBeforeDiscount = cart.reduce((acc, item) => {
    const { price } = item.product;
    const { quantity } = item;
    return acc + price * quantity;
  }, 0);

  let totalAfterDiscount = cart.reduce(
    (acc, item) => acc + calculateItemTotal(item),
    0
  );

  let totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  if (selectedCoupon) {
    if (selectedCoupon.discountType === 'amount') {
      totalAfterDiscount = Math.max(
        0,
        totalAfterDiscount - selectedCoupon.discountValue
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
  newQuantity: number
): CartItem[] => {
  const updatedCart = cart.map((item) => {
    if (item.product.id === productId) {
      return { ...item, quantity: Math.min(newQuantity, item.product.stock) };
    }
    return item;
  });

  return updatedCart.filter((item) => item.quantity > 0);
};
