import {
  CartItem,
  Coupon,
  CouponDiscountProps,
  TotalDiscountProps,
} from '../../types';

export const getQuantityDiscount = (item: CartItem) => {
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

export const getCopuonDiscount = ({
  coupon,
  beforeAppliedCoupon,
}: CouponDiscountProps) => {
  if (!coupon) return 0;

  switch (coupon.discountType) {
    case 'amount':
      return coupon.discountValue;
    case 'percentage':
      return beforeAppliedCoupon * (coupon.discountValue / 100);
    default:
      return 0;
  }
};

export const getTotalDiscount = ({
  cart,
  coupon,
  totalBeforeDiscount,
}: TotalDiscountProps) => {
  const quantityDiscount = cart.reduce(
    (sum, cur) =>
      (sum += cur.product.price * cur.quantity * getMaxApplicableDiscount(cur)),
    0,
  );

  const couponDiscount = getCopuonDiscount({
    coupon,
    beforeAppliedCoupon: totalBeforeDiscount - quantityDiscount,
  });

  return quantityDiscount + couponDiscount;
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const maxDiscount: number = item.product.discounts.reduce(
    (maxDiscount, discount) => {
      if (discount.quantity <= item.quantity) {
        maxDiscount = discount.rate;
      }
      return maxDiscount;
    },
    0,
  );
  return maxDiscount;
};

export const calculateItemTotal = (item: CartItem) => {
  const itemTotalPrice = item.product.price * item.quantity;

  return itemTotalPrice * (1 - getMaxApplicableDiscount(item));
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null,
) => {
  const totalBeforeDiscount = cart.reduce(
    (sum, cur) => (sum += cur.product.price * cur.quantity),
    0,
  );

  const totalDiscount = getTotalDiscount({
    cart,
    coupon: selectedCoupon,
    totalBeforeDiscount,
  });

  const totalAfterDiscount = totalBeforeDiscount - totalDiscount;

  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount,
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number,
): CartItem[] => {
  const updatedCart =
    newQuantity === 0
      ? cart.filter((item) => item.product.id !== productId)
      : cart.map((item) => {
          if (item.product.id === productId) {
            return {
              ...item,
              quantity:
                newQuantity > item.product.stock
                  ? item.product.stock
                  : newQuantity,
            };
          }
          return item;
        });

  return updatedCart;
};
