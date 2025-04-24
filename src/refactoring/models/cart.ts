import { CartItem, Coupon } from "../../types";

export const calculateItemTotal = (item: CartItem) => {
  const { quantity, product } = item;

  const checkDiscount = product.discounts.find(
    (discount) => discount.quantity === quantity,
  );

  const discountRate = checkDiscount ? checkDiscount.rate : 0;

  const total = product.price * quantity * (1 - discountRate);

  return Math.round(total);
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const { quantity, product } = item;

  return product.discounts.reduce((maxRate, discount) => {
    return quantity >= discount.quantity
      ? Math.max(maxRate, discount.rate)
      : maxRate;
  }, 0);
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null,
) => {
  const totalBeforeDiscount = cart.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  const totalAfterItemDiscount = cart.reduce((acc, item) => {
    const discountRate = getMaxApplicableDiscount(item);
    const discountedPrice =
      item.product.price * item.quantity * (1 - discountRate);
    return acc + discountedPrice;
  }, 0);

  const couponDiscount = (() => {
    if (!selectedCoupon) return 0;
    if (selectedCoupon.discountType === "amount") {
      return selectedCoupon.discountValue;
    }
    if (selectedCoupon.discountType === "percentage") {
      return (totalAfterItemDiscount * selectedCoupon.discountValue) / 100;
    }
    return 0;
  })();

  const totalAfterDiscount = Math.max(
    totalAfterItemDiscount - couponDiscount,
    0,
  );

  const totalDiscount = totalBeforeDiscount - totalAfterDiscount;

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
  return cart.reduce<CartItem[]>((acc, item) => {
    if (item.product.id !== productId) {
      // 대상이 아닌 상품은 그대로 유지
      acc.push(item);
      return acc;
    }

    // 수량이 0 이하라면 제거 (추가 안 함)
    if (newQuantity <= 0) {
      return acc;
    }

    // 재고보다 많은 수량은 제한
    const validQuantity = Math.min(newQuantity, item.product.stock);

    acc.push({
      ...item,
      quantity: validQuantity,
    });

    return acc;
  }, []);
};
