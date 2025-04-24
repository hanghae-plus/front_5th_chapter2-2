import { CartItem, Coupon } from "../../types";

export const calculateItemTotal = (item: CartItem) => {
  const { product, quantity } = item;
  const { price } = product;

  const applicableDiscount = getAppliedDiscount(item); // 그냥 비율만 가져오자

  const total = quantity * price * (1 - applicableDiscount);
  return total;
};




export const getMaxApplicableDiscount = (item: CartItem) => {
  const { discounts } = item.product;
  const { quantity } = item;
  let maxRate = 0;

  for (const discount of discounts) {
    if (quantity >= discount.quantity) {
      maxRate = Math.max(maxRate, discount.rate);
    }
  }
  return maxRate;
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  let totalBeforeDiscount = 0
  let totalAfterDiscount = 0

  cart.forEach((item) => {
    const { price } = item.product
    const { quantity } = item
    totalBeforeDiscount += price * quantity
    totalAfterDiscount += calculateItemTotal(item)
  })

  let totalDiscount = totalBeforeDiscount - totalAfterDiscount

  // 쿠폰 적용
  if (selectedCoupon) {
    if (selectedCoupon.discountType === "amount") {
      totalAfterDiscount = Math.max(0, totalAfterDiscount - selectedCoupon.discountValue)
    } else {
      totalAfterDiscount *= 1 - selectedCoupon.discountValue / 100
    }
    totalDiscount = totalBeforeDiscount - totalAfterDiscount
  }

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
  return cart.map((item) => {
    if (item.product.id === productId) {
      const maxQuantity = item.product.stock;
      const updateQuantity = Math.max(0, Math.min(newQuantity, maxQuantity));
      return updateQuantity > 0 ? { ...item, quantity: updateQuantity } : null;

    }
    return item
  }).filter((item): item is CartItem => {
    return item !== null && item.quantity > 0
  });
};
function getAppliedDiscount(item: CartItem): number {
  const { discounts } = item.product;
  const { quantity } = item;
  let maxRate = 0;

  for (const discount of discounts) {
    if (quantity >= discount.quantity) {
      maxRate = Math.max(maxRate, discount.rate);
    }
  }

  return maxRate;
}


