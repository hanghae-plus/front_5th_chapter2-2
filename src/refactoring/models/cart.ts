import { CartItem, Coupon } from '../../types';

// 단일 상품 가격 계산 (최대 할인 적용)
export const calculateItemTotal = (item: CartItem): number =>
  applyDiscount(
    item.product.price * item.quantity,
    getMaxApplicableDiscount(item),
  );

// 할인 금액 적용하기
const applyDiscount = (amount: number, discountRate: number): number =>
  discountRate > 0 ? amount * (1 - discountRate) : amount;

// 최대 할인율 계산
export const getMaxApplicableDiscount = (item: CartItem) =>
  item.product.discounts
    .filter((discount) => item.quantity >= discount.quantity)
    .reduce((max, discount) => Math.max(max, discount.rate), 0);

// 쿠폰 적용 후 장바구니 총액 계산
// 할인 전 총액, 할인 후 총액, 총 할인액을 계산한다.
export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null,
) => {
  const totalBeforeDiscount = calculateTotal(
    cart,
    (item) => item.product.price * item.quantity,
  );

  const totalAfterDiscount = calculateTotal(cart, (item) =>
    calculateItemTotal(item),
  );

  const couponDiscount = calculateCouponDiscount(
    totalAfterDiscount,
    selectedCoupon,
  );

  return {
    totalBeforeDiscount,
    totalAfterDiscount: totalAfterDiscount - couponDiscount,
    totalDiscount: totalBeforeDiscount - (totalAfterDiscount - couponDiscount),
  };
};

// 장바구니 상품들의 총합을 계산
const calculateTotal = (
  cart: CartItem[],
  calculateFn: (item: CartItem) => number,
): number => cart.reduce((total, item) => total + calculateFn(item), 0);

// 쿠폰 할인 금액 계산하기
const calculateCouponDiscount = (
  totalAfterDiscount: number,
  coupon: Coupon | null,
): number => {
  if (!coupon) return 0;

  return coupon.discountType === 'amount'
    ? coupon.discountValue
    : (totalAfterDiscount * coupon.discountValue) / 100;
};

// 장바구니 상품들의 수량을 업데이트 후 재고에 반영
export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number,
): CartItem[] =>
  cart
    .map((item) =>
      item.product.id === productId
        ? updateSingleItemQuantity(item, newQuantity)
        : item,
    )
    .filter((item) => item !== null) as CartItem[];

// 단일 수량을 업데이트한다.
const updateSingleItemQuantity = (
  item: CartItem,
  newQuantity: number,
): CartItem | null => {
  const maxStock = item.product.stock || Infinity;
  const updatedQuantity = Math.min(newQuantity, maxStock);

  return updatedQuantity > 0 ? { ...item, quantity: updatedQuantity } : null;
};
