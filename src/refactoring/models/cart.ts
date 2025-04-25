import { CartItem, Coupon, Product } from '../../types';

export const calculateItemTotal = (item: CartItem) => {
  return item.product.price * item.quantity * (1 - getMaxApplicableDiscount(item));
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const applicableDiscounts = item.product.discounts.filter(
    discount => discount.quantity <= item.quantity
  );
  return applicableDiscounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

export const calculateCartTotal = (cart: CartItem[], selectedCoupon: Coupon | null) => {
  const totalBeforeDiscount = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const itemTotal = cart.reduce((sum, item) => sum + calculateItemTotal(item), 0);

  const discountedTotal = selectedCoupon
    ? selectedCoupon.discountType === 'amount'
      ? Math.max(0, itemTotal - selectedCoupon.discountValue)
      : itemTotal * (1 - selectedCoupon.discountValue / 100)
    : itemTotal;

  return {
    totalBeforeDiscount,
    totalAfterDiscount: discountedTotal,
    totalDiscount: totalBeforeDiscount - discountedTotal
  };
};

export const getRemainingStock = (cart: CartItem[], product: Product) => {
  const cartItem = cart.find(item => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  return cart
    .map(item => {
      if (item.product.id !== productId) return item;
      const updatedQuantity = Math.max(0, Math.min(newQuantity, item.product.stock));
      if (updatedQuantity === 0) return null;
      return { ...item, quantity: updatedQuantity };
    })
    .filter((item): item is CartItem => item !== null);
};
