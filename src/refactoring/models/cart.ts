import { CartItem, Coupon } from '../../types';

// 단일 상품 가격 계산 (최대 할인 적용)
export const calculateItemTotal = (item: CartItem) => {
  const { product, quantity } = item;

  // 할인이 가능하다면 최대 할인율을 적용한다.
  const maxAppicableDiscount = getMaxApplicableDiscount(item);
  if (maxAppicableDiscount > 0) {
    return product.price * quantity * (1 - maxAppicableDiscount);
  }

  return product.price * quantity;
};

// 최대 할인율 계산
export const getMaxApplicableDiscount = (item: CartItem) => {
  const { product, quantity } = item;

  return product.discounts
    .filter((discount) => quantity >= discount.quantity)
    .reduce((max, discount) => Math.max(max, discount.rate), 0);
};

// 쿠폰 적용 후 장바구니 총액 계산
// 할인 전 총액, 할인 후 총액, 총 할인액을 계산한다.
export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null,
) => {
  const totalBeforeDiscount = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const totalAfterDiscount = cart.reduce(
    (total, item) => total + calculateItemTotal(item),
    0,
  );

  if (!selectedCoupon) {
    return {
      totalBeforeDiscount,
      totalAfterDiscount,
      totalDiscount: totalBeforeDiscount - totalAfterDiscount,
    };
  }

  let couponDiscount = 0;
  if (selectedCoupon.discountType === 'amount') {
    couponDiscount = selectedCoupon.discountValue;
  } else if (selectedCoupon.discountType === 'percentage') {
    couponDiscount = (totalAfterDiscount * selectedCoupon.discountValue) / 100;
  }
  return {
    totalBeforeDiscount,
    totalAfterDiscount: totalAfterDiscount - couponDiscount,
    totalDiscount: totalBeforeDiscount - (totalAfterDiscount - couponDiscount),
  };
};

// 장바구니 상품 수량을 업데이트 후 재고에 반영
export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number,
): CartItem[] =>
  cart
    .map((item) => {
      if (item.product.id === productId) {
        const maxStock = item.product.stock || Infinity;
        const updatedQuantity = Math.min(newQuantity, maxStock);
        return updatedQuantity > 0
          ? { ...item, quantity: updatedQuantity }
          : null;
      }
      return item;
    })
    .filter((item) => item !== null) as CartItem[];
