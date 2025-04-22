import { CartItem, Coupon, Discount, Product } from '../../types';

export const getMaxDiscount = (discounts: { quantity: number; rate: number }[]) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

export const getRemainingStock = (product: Product, cart: CartItem[]) => {
  const cartItem = cart.find((item) => item.product.id === product.id);

  return product.stock - (cartItem?.quantity || 0);
};

export const calculateAppliedDiscount = (discounts: Discount[], quantity: number) => {
  return discounts
    .filter((discount) => quantity >= discount.quantity)
    .reduce((maxRate, discount) => Math.max(maxRate, discount.rate), 0);
};

export const getAppliedDiscount = (item: CartItem) => {
  const { discounts } = item.product;
  const { quantity } = item;

  return calculateAppliedDiscount(discounts, quantity);
};

const getAvailableDiscounts = (item: CartItem) => {
  const discounts = item.product.discounts;

  return discounts.filter((discount) => item.quantity >= discount.quantity);
};

const getApplicableDiscount = (item: CartItem) => {
  const availableDiscounts = getAvailableDiscounts(item);
  const bestDiscount = availableDiscounts.sort((a, b) => b.rate - a.rate)[0];

  return bestDiscount;
};

export const calculateItemTotal = (item: CartItem) => {
  const applicableDiscount = getApplicableDiscount(item);

  if (applicableDiscount) {
    return item.product.price * item.quantity * (1 - applicableDiscount.rate);
  }

  return item.product.price * item.quantity;
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const availableDiscounts = getAvailableDiscounts(item);

  return availableDiscounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

export const getTotalAfterDiscount = (cart: CartItem[], selectedCoupon: Coupon | null) => {
  const itemsAfterDiscount = cart.reduce((acc, item) => acc + calculateItemTotal(item), 0);

  if (!selectedCoupon) {
    return itemsAfterDiscount;
  }

  if (selectedCoupon.discountType === 'amount') {
    // 상품 가격이 음수가 되는 경우 0으로 보정
    return Math.max(0, itemsAfterDiscount - selectedCoupon.discountValue);
  }

  return itemsAfterDiscount * (1 - selectedCoupon.discountValue / 100);
};

export const calculateCartTotal = (cart: CartItem[], selectedCoupon: Coupon | null) => {
  const totalBeforeDiscount = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalAfterDiscount = getTotalAfterDiscount(cart, selectedCoupon);
  const totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount,
  };
};

export const getProductById = (cart: CartItem[], productId: string) =>
  cart.find((cartItem) => cartItem.product.id === productId)?.product;

export const getFilteredCart = (cart: CartItem[], productId: string) =>
  cart.filter((cartItem) => cartItem.product.id !== productId);

export const updateCartItemQuantity = (cart: CartItem[], productId: string, newQuantity: number): CartItem[] => {
  if (newQuantity <= 0) {
    return getFilteredCart(cart, productId);
  }

  const product = getProductById(cart, productId);

  if (product && newQuantity > product.stock) {
    newQuantity = product.stock;
  }

  return cart.map((cartItem) =>
    cartItem.product.id === productId ? { ...cartItem, quantity: newQuantity } : cartItem,
  );
};
