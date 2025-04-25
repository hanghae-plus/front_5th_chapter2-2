import { type Cart, CartItem, Coupon, type ProductId } from '../../types';

// 장바구니 아이템 합계
export const calculateItemTotal = (item: CartItem) => {
  let totalAfterDiscount = 0;

  const { price } = item.product;
  const { quantity } = item;

  const discount = item.product.discounts.reduce((maxDiscount, d) => {
    return quantity >= d.quantity && d.rate > maxDiscount ? d.rate : maxDiscount;
  }, 0);

  totalAfterDiscount += price * quantity * (1 - discount);

  return totalAfterDiscount;
};

// 최대 적용 할인 계산
export const getMaxApplicableDiscount = (item: CartItem) => {
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

// 장바구니 계산(총 금액, 할인 금액, 최종 결제 금액)
export const calculateCartTotal = (cart: CartItem[], selectedCoupon: Coupon | null = null) => {
  let totalBeforeDiscount = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  let totalAfterDiscount = cart.reduce((total, item) => total + calculateItemTotal(item), 0);
  let totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  if (selectedCoupon) {
    if (selectedCoupon.discountType === 'amount') {
      totalAfterDiscount = Math.max(0, totalAfterDiscount - selectedCoupon.discountValue);
    } else {
      totalAfterDiscount *= 1 - selectedCoupon.discountValue / 100;
    }
    totalDiscount = totalBeforeDiscount - totalAfterDiscount;
  }

  return {
    totalBeforeDiscount: Math.round(totalBeforeDiscount),
    totalAfterDiscount: Math.round(totalAfterDiscount),
    totalDiscount: Math.round(totalDiscount)
  };
};

// 장바구니 아이템 수량 업데이트 정책
export const updateCartItemQuantity = (cart: Cart, productId: ProductId, newQuantity: number) =>
  cart
    .map((item) => {
      return item.product.id === productId ? { ...item, quantity: Math.min(newQuantity, item.product.stock) } : item;
    })
    .filter((item) => item.quantity > 0);
