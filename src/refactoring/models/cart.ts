import { CartItem, Coupon, Product } from '../../types';
import { percentageToDecimal } from '../utils';
import { getMaxDiscount } from './discount';

// 단일 상품 가격 계산 (최대 할인 적용)
export const calculateItemTotal = (item: CartItem): number =>
  applyDiscount(
    item.product.price * item.quantity,
    getMaxApplicableDiscount(item),
  );

// 할인 금액 적용하기
const applyDiscount = (amount: number, discountRate: number): number =>
  discountRate > 0 ? amount * (1 - discountRate) : amount;

// 장바구니 상품의 최대 할인율을 계산하기
export const getMaxApplicableDiscount = (item: CartItem) =>
  getMaxDiscount(
    item.product.discounts.filter(
      (discount) => item.quantity >= discount.quantity,
    ),
  );

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
    : totalAfterDiscount * percentageToDecimal(coupon.discountValue);
};

// 상품 추가 또는 수량 업데이트
export const addCartProduct = (
  cart: CartItem[],
  product: Product,
): CartItem[] => {
  const existingItem = cart.find((item) => item.product.id === product.id);
  return existingItem
    ? updateCartItemQuantity(cart, product.id, existingItem.quantity + 1)
    : [...cart, { product, quantity: 1 }];
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

// 상품 제거
export const removeCartProduct = (
  cart: CartItem[],
  productId: string,
): CartItem[] => cart.filter((item) => item.product.id !== productId);

// 빈 장바구니 총액을 반환
export const getDefaultCartTotal = () => ({
  totalBeforeDiscount: 0,
  totalAfterDiscount: 0,
  totalDiscount: 0,
});
