import { CartItem, Coupon } from '../../types';

export const calculateItemTotal = (item: CartItem) => {
  const { product, quantity } = item;
  const maxDiscount = getMaxApplicableDiscount(item);
  return product.price * quantity * (1 - maxDiscount);
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const { product, quantity } = item;
  const applicableDiscounts = product.discounts.filter((discount) => quantity >= discount.quantity);

  if (applicableDiscounts.length === 0) return 0;
  return Math.max(...applicableDiscounts.map((discount) => discount.rate));
};

export const calculateCartTotal = (cart: CartItem[], selectedCoupon: Coupon | null) => {
  const totalBeforeDiscount = cart.reduce((a, c) => a + c.product.price * c.quantity, 0);
  const totalAfterItemDiscount = cart.reduce((a, c) => a + calculateItemTotal(c), 0);

  let couponDiscount = 0;
  if (selectedCoupon) {
    if (selectedCoupon?.discountType === 'amount') {
      couponDiscount = selectedCoupon.discountValue;
    } else {
      couponDiscount = totalAfterItemDiscount * (selectedCoupon.discountValue / 100);
    }
  }
  //쿠폰 사용 후 가격
  const totalAfterDiscount = totalAfterItemDiscount - couponDiscount;
  //할인된 총 가격
  const totalDiscount = totalBeforeDiscount - totalAfterDiscount;
  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount,
  };
};

export const updateCartItemQuantity = (cart: CartItem[], productId: string, newQuantity: number): CartItem[] => {
  if (!Array.isArray(cart)) return [];

  return cart
    .map((item) => {
      if (item.product.id === productId) {
        //수량을 0으로 바꿨을 때
        if (newQuantity === 0) return null;
        //재고 제한
        const clampedQuantity = Math.min(newQuantity, item.product.stock);
        return { ...item, quantity: clampedQuantity };
      } else {
        return item;
      }
    })
    .filter(Boolean) as CartItem[];
};
