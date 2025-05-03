import { CartItem, Coupon, Product } from "@/types";

/** 할인을 포함한 아이템의 총액을 계산합니다. */
export const calculateItemTotal = (item: CartItem) => {
  const { price } = item.product;
  const { quantity } = item;
  const discount = getMaxApplicableDiscount(item);
  let itemTotal = 0;
  itemTotal += price * quantity * (1 - discount);
  return itemTotal;
};

/** 가장 높은 할인율을 반환합니다. */
export const getMaxApplicableDiscount = (item: CartItem) => {
  const { quantity } = item;
  const discount = item.product.discounts.reduce((maxDiscount, d) => {
    return quantity >= d.quantity && d.rate > maxDiscount
      ? d.rate
      : maxDiscount;
  }, 0);
  return discount;
};

/** 장바구니의 쿠폰 적용 전후의 금액, 전체 할인율을 반환합니다.. */
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

/** 장바구니의 수량을 업데이트합니다. */
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

/**가장 큰 할인율을 반환합니다. */
export const getMaxDiscount = (
  discounts: { quantity: number; rate: number }[],
) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

/** %로 나타낼 할인률을 계산합니다.*/
export const getDiscountPercent = (discount: number) => {
  return (discount * 100).toFixed(0);
};

/**남은 재고 수량을 반환합니다.*/
export const getRemainingStock = (cart: CartItem[], product: Product) => {
  const cartItem = cart.find((item) => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
};

/** 남은 재고의 여부를 반환합니다.*/
export const isRemainingStock = (cart: CartItem[], product: Product) => {
  return getRemainingStock(cart, product) > 0;
};
