import { CartItem, Coupon, Product } from '../../types';

// 1. 상품 가격 계산 - 개별 아이템
const calculateItemPrice = (item: CartItem): number => {
  const { price } = item.product; // 상품의 가격
  const { quantity } = item; // 카트에 담은 상품의 수량
  return price * quantity; // 상품 가격 * 수량 = 해당 아이템의 총 가격
};

// 2. 단일 상품의 최대 할인율 찾기
export const getMaxApplicableDiscount = (item: CartItem): number => {
  const { quantity } = item; // 카트에 담은 상품의 수량

  return item.product.discounts.reduce((maxDiscount, d) => {
    return quantity >= d.quantity && d.rate > maxDiscount ? d.rate : maxDiscount;
  }, 0);
};

// 3. 단일 상품의 할인된 가격 계산
export const calculateItemTotal = (item: CartItem) => {
  const itemPrice = calculateItemPrice(item); // 상품의 총 가격
  const discountRate = getMaxApplicableDiscount(item); // 적용 가능한 최대 할인율
  return itemPrice * (1 - discountRate); // 할인율을 적용한 최종 가격 (원가 * (1-할인율))
};

// 4. 상품 총 금액 계산 - 카트에 담긴 모든 상품의 가격을 더함
const calculateTotalBeforeDiscount = (cart: CartItem[]) => {
  return cart.reduce((total, item) => total + calculateItemPrice(item), 0);
};

// 5. 할인된 상품들의 총액 계산 (쿠폰 적용 전)
const calculateItemDiscountedTotal = (cart: CartItem[]): number => {
  // 각 상품별로 할인된 가격을 계산하고 이를 모두 합산
  // 이 단계에서는 아직 쿠폰 할인은 적용되지 않음
  return cart.reduce((total, item) => total + calculateItemTotal(item), 0);
};

// 6. 쿠폰 할인 적용
const applyCouponDiscount = (total: number, coupon: Coupon | null): number => {
  if (!coupon) return total; // 쿠폰이 없으면 총액 그대로 반환

  // 쿠폰 할인 적용
  if (coupon.discountType === 'amount') {
    // 금액 할인 쿠폰: 총액에서 쿠폰 금액만큼 차감 (음수가 되지 않도록 최소 0 보장)
    return Math.max(0, total - coupon.discountValue);
  } else {
    // 비율 할인 쿠폰: 총액에 할인율 적용 (예: 10% 할인이면 총액 * 0.9)
    return total * (1 - coupon.discountValue / 100);
  }
};

// 재고 확인
export const getRemainingStock = (product: Product, cart: CartItem[]) => {
  const cartItem = cart.find((item) => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
};

export const calculateCartTotal = (cart: CartItem[], selectedCoupon: Coupon | null) => {
  const totalBeforeDiscount = calculateTotalBeforeDiscount(cart);
  const itemDiscountedTotal = calculateItemDiscountedTotal(cart);
  const totalAfterDiscount = applyCouponDiscount(itemDiscountedTotal, selectedCoupon);

  // 총 할인 금액
  const totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  return {
    totalBeforeDiscount: Math.round(totalBeforeDiscount),
    totalAfterDiscount: Math.round(totalAfterDiscount),
    totalDiscount: Math.round(totalDiscount),
  };
};

// 카트에 담긴 수량 업데이트 -> 카트 반환
export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  return cart
    .map((item) => {
      if (item.product.id === productId) {
        const maxQuantity = item.product.stock;
        const updatedQuantity = Math.max(0, Math.min(newQuantity, maxQuantity));
        return updatedQuantity > 0 ? { ...item, quantity: updatedQuantity } : null;
      }
      return item;
    })
    .filter((item): item is CartItem => item !== null);
};
