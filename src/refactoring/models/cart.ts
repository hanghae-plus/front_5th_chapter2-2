import { CartItem, Coupon } from "../../types";

export const calculateItemTotal = (item: CartItem) => {
  const discountRate = getMaxApplicableDiscount(item);
  const priceWithDiscount = item.product.price * (1 - discountRate); // 상품수량에 따라 할인
  return Math.floor(priceWithDiscount * item.quantity); // 소수점 버림 처리
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const { quantity, product } = item;
  const applicable = product.discounts.filter(d => quantity >= d.quantity);
  if (applicable.length === 0) return 0;
  return Math.max(...applicable.map(d => d.rate));
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  const totalBeforeDiscount = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,0
  );

  const discountedSubTotal = cart.reduce(
    (acc, item) => acc + calculateItemTotal(item),0
  );

  let totalDiscount = totalBeforeDiscount - discountedSubTotal;

  if (selectedCoupon) {
    if (selectedCoupon.discountType === "amount") {
      totalDiscount += selectedCoupon.discountValue;
    } else if (selectedCoupon.discountType === "percentage") {
      totalDiscount += discountedSubTotal * (selectedCoupon.discountValue / 100);
    }

    // 할인액이 총액을 초과하지 않도록 보정
    totalDiscount = Math.min(totalDiscount, totalBeforeDiscount);
  }

  // 할인된 총액 계산
  const totalAfterDiscount = totalBeforeDiscount - totalDiscount;

  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount,
  };
};

// updateQuantity 라는 함수 안에, item,productId,newQuantity 파라미터 명시.(타입스크립트니까 타입도 함께)
const updateQuantity = (
  item: CartItem,
  productId: string,
  newQuantity: number
): CartItem | null => {
  if (item.product.id !== productId) return item; // 다른 상품이면 수량 업데이트 x
  const maxQty = item.product.stock; // 재고수량
  const qty = Math.min(newQuantity, maxQty);

  return qty > 0 ? { ...item, quantity: qty } : null; // 수량이 0 아래면 null 반환.
}

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  return cart
  .map(item => updateQuantity(item, productId, newQuantity))
  .filter((item): item is CartItem => item !== null);
}