import { CartItem, Coupon, Product } from '@/types';

export const getAppliedDiscount = (item: CartItem) => {
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

export const calculateRemainingStock = (product: Product, cartItems: CartItem[]) => {
  const cartItem = cartItems.find((item) => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
};

// 장바구니에 상품 찾기
export const findCartItem = (
  cart: CartItem[],
  productId: string,
): CartItem | undefined => {
  return cart.find((item) => item.product.id === productId);
};

// 장바구니에 새상품 추가
export const createCartItem = (product: Product): CartItem => {
  return { product, quantity: 1 };
};

// 장바구니에 기존상품 추가
export const addProductToCart = (cart: CartItem[], product: Product): CartItem[] => {
  const existingItem = findCartItem(cart, product.id);

  if (existingItem) {
    return updateCartItemQuantity(cart, product.id, existingItem.quantity + 1);
  }

  return [...cart, createCartItem(product)];
};

// 개별 상품 할인금액 계산
export const calculateItemTotal = (item: CartItem) => {
  const { product, quantity } = item;
  const { price } = product;

  const total = price * quantity;
  const maxDiscount = getMaxApplicableDiscount(item);
  const totalAfterDiscount = total * (1 - maxDiscount);

  return totalAfterDiscount;
};

// 최대 적용 할인금액 계산
export const getMaxApplicableDiscount = (item: CartItem) => {
  const { product, quantity } = item;
  const { discounts } = product;

  const maxDiscount = discounts.reduce((max, discount) => {
    return quantity >= discount.quantity && discount.rate > max ? discount.rate : max;
  }, 0);

  return maxDiscount;
};

// 최종 장바구니 할인금액 계산
export const calculateCartTotal = (cart: CartItem[], selectedCoupon: Coupon | null) => {
  // 각 상품별 할인 전 총액과 할인 후 총액 계산
  const itemTotals = cart.map((item) => {
    const { product, quantity } = item;
    const { price } = product;
    const itemTotal = price * quantity;
    const maxDiscount = getMaxApplicableDiscount(item);
    const itemAfterDiscount = itemTotal * (1 - maxDiscount);

    return {
      beforeDiscount: itemTotal,
      afterDiscount: itemAfterDiscount,
    };
  });

  // 전체 합계 계산
  const totalBeforeDiscount = itemTotals.reduce(
    (sum, item) => sum + item.beforeDiscount,
    0,
  );
  let totalAfterDiscount = itemTotals.reduce((sum, item) => sum + item.afterDiscount, 0);

  // 쿠폰 적용
  if (selectedCoupon) {
    if (selectedCoupon.discountType === 'amount') {
      totalAfterDiscount = Math.max(0, totalAfterDiscount - selectedCoupon.discountValue);
    } else {
      totalAfterDiscount *= 1 - selectedCoupon.discountValue / 100;
    }
  }

  const totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount,
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number,
): CartItem[] => {
  const cartItem = cart.find((item) => item.product.id === productId);

  if (!cartItem) {
    return cart;
  }

  const maxQuantity = cartItem.product.stock;
  const updatedQuantity = Math.max(0, Math.min(newQuantity, maxQuantity));

  return cart
    .map((item) =>
      item.product.id === productId ? { ...item, quantity: updatedQuantity } : item,
    )
    .filter((item) => item.quantity > 0);
};
