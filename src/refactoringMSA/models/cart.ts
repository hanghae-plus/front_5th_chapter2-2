import { CartItem, Coupon } from '../../types';

/**
 * 장바구니 아이템의 총 가격을 계산합니다.
 * @param item 장바구니 아이템
 * @returns 장바구니 아이템의 총 가격
 */
export const calculateItemTotal = (item: CartItem) => {
  const { product, quantity } = item;
  const total = product.price * quantity;
  const applicableDiscount = getMaxApplicableDiscount(item);
  // 할인율이 100% 이상이면 할인을 적용하지 않음
  if (!applicableDiscount || applicableDiscount >= 1) {
    return total;
  }
  return total * (1 - applicableDiscount);
};

/**
 * 장바구니 아이템의 최대 적용 할인율을 계산합니다.
 * @param item 장바구니 아이템
 * @returns 장바구니 아이템의 최대 적용 할인율
 */
export const getMaxApplicableDiscount = (item: CartItem) => {
  const { product, quantity } = item;
  const { discounts } = product;

  const applicableDiscount = discounts.reduce((max, discount) => {
    if (quantity >= discount.quantity) {
      return Math.max(max, discount.rate);
    }
    return max;
  }, 0);
  return applicableDiscount;
};

/**
 * 장바구니의 총 가격을 계산합니다.
 * @param cart 장바구니
 * @param selectedCoupon 선택된 쿠폰
 * @returns 장바구니의 총 가격
 */
export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null,
) => {
  // 총 할인 금액
  let totalDiscount = 0;

  // 총 가격
  const totalBeforeDiscount = cart.reduce((acc, item) => {
    const { product, quantity } = item;
    totalDiscount += product.price * quantity * getMaxApplicableDiscount(item);
    return acc + product.price * quantity;
  }, 0);

  // 쿠폰 적용
  if (selectedCoupon) {
    if (selectedCoupon.discountType === 'amount') {
      // 쿠폰 할인 타입이 금액인 경우
      totalDiscount += selectedCoupon.discountValue;
    } else {
      // 쿠폰 할인 타입이 퍼센트인 경우
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

/**
 * 장바구니 아이템의 수량을 업데이트합니다.
 * @param cart 장바구니
 * @param productId 상품 ID
 * @param newQuantity 새로운 수량
 * @returns 업데이트된 장바구니
 */
export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number,
): CartItem[] => {
  if (newQuantity <= 0) {
    return cart.filter((item) => item.product.id !== productId);
  }

  const updatedCart = cart.map((item) => {
    if (item.product.id === productId) {
      const quantity =
        item.product.stock >= newQuantity ? newQuantity : item.product.stock;
      return {
        ...item,
        quantity,
      };
    }
    return item;
  });
  return updatedCart;
};
