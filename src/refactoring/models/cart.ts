import { CartItem, Coupon, Product } from '../../types';

export const calculateItemTotal = (item: CartItem) => {
  const { product, quantity } = item;
  const discount = getMaxApplicableDiscount(item);
  return product.price * quantity * (1 - discount);
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const { product, quantity } = item;
  const { discounts } = product;
  return discounts.reduce((max, discount) => {
    if (quantity >= discount.quantity) {
      return Math.max(max, discount.rate);
    }
    return max;
  }, 0);
};

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

export const getMaxDiscount = (discounts: { quantity: number; rate: number }[]) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

export const getRemainingStock = ({ cart, product }: { cart: CartItem[]; product: Product }) => {
  const cartItem = cart.find((item) => item.product.id === product.id);
  const result = product.stock - (cartItem?.quantity || 0);
  return result;
};

export const calculateCartTotal = (cart: CartItem[], selectedCoupon: Coupon | null) => {
  let totalBeforeDiscount = 0;
  let totalAfterDiscount = 0;

  cart.forEach((item) => {
    const { price } = item.product;
    const { quantity } = item;
    totalBeforeDiscount += price * quantity;

    const discount = getMaxApplicableDiscount(item);
    totalAfterDiscount += price * quantity * (1 - discount);
  });

  let totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  // 쿠폰 적용
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
    totalDiscount: Math.round(totalDiscount),
  };
};

/** 카드에 상품 추가할 때 수정하기 */
export const getUpdatedCart = (cart: CartItem[], product: Product): CartItem[] => {
  const remainingStock = getRemainingStock({ cart, product });
  if (remainingStock <= 0) return cart;

  const existingItem = cart.find((item) => item.product.id === product.id);
  const newQuantity = existingItem ? existingItem.quantity + 1 : 1;

  return updateCartItemQuantity(cart, product.id, newQuantity, product);
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number,
  product?: Product
): CartItem[] => {
  // 수량이 0보다 작으면 제거
  if (newQuantity <= 0) {
    return cart.filter((item) => item.product.id !== productId);
  }

  // 이미 장바구니에 있는지 체크
  const existingItem = cart.find((item) => item.product.id === productId);

  // 최대 수량 체크
  const maxQuantity = product?.stock || existingItem?.product.stock || 0;

  // 업데이트할 수량 계산
  const finalQuantity = Math.min(newQuantity, maxQuantity);

  if (existingItem) {
    return cart.map((item) =>
      item.product.id === productId ? { ...item, quantity: finalQuantity } : item
    );
  }

  // 3. 아이템이 없고 product가 제공되면 새로 추가 (add)
  if (!existingItem && product) {
    return [...cart, { product, quantity: finalQuantity }];
  }

  // 4. 아이템이 있으면 수량 업데이트 (update)

  if (existingItem) {
    return cart.map((item) =>
      item.product.id === productId ? { ...item, quantity: finalQuantity } : item
    );
  }

  return cart;
};
