import type { ICartItem, ICoupon, IProduct } from "#src/types";

/**
 * 상품 총액 계산
 *
 * 이 함수의 이름을 `calculateItemTotal`로 하고 싶어요
 */
const rename = (cartItem: ICartItem) => {
  const { product } = cartItem;
  const { price } = product;

  const total = price * cartItem.quantity;

  return total;
};

/** 적용 가능한 최대 할인률 계산 */
export const getMaxApplicableDiscount = (cartItem: ICartItem) => {
  const { product } = cartItem;
  const { discounts } = product;

  const applicableDiscounts = discounts.filter((discount) => discount.quantity <= cartItem.quantity);
  const maxDiscount = applicableDiscounts.reduce((max, discount) => Math.max(max, discount.rate), 0);

  return maxDiscount;
};

/**
 * 수량 할인이 적용된 상품 총액 계산
 *
 * 이 함수의 이름은 `calculateQuantityDiscountedTotal` ?
 */
export const calculateItemTotal = (cartItem: ICartItem) => {
  const total = rename(cartItem);
  const maxDiscount = getMaxApplicableDiscount(cartItem);

  return total - total * maxDiscount;
};

/**
 * 장바구니 총액 계산
 *
 * 총액 계산할때 결괏값이 총 3가지
 * 1. 할인이 적용안된 순수 총액
 * 2. (수량 + 쿠폰) 할인이 적용된 총액
 * 3. (수량 + 쿠폰) 할인 금액
 *
 * 근데 `calculateItemTotal()`은 왜 수량 할인이 적용된 함수여야할까요
 * 그러면 순수한 총액을 계산하는 함수가 따로 필요하잖아요
 * 그냥 `calculateItemTotal()`가 순수한 총액을 계산하는 함수이고 ( 현 `rename()` )
 * 수량 할인이 적용된채로 계산하는 함수가 따로 있으면 되는거 아닌가요? ( 현 `calculateItemTotal()` )
 */
export const calculateCartTotal = (cartItems: ICartItem[], selectedCoupon: ICoupon | null) => {
  // 전체 총액
  const totalBeforeDiscount = cartItems.reduce((sum, item) => sum + rename(item), 0);
  // 수량 할인 혜택 적용 금액
  const totalAfterAmountDiscount = cartItems.reduce((sum, item) => sum + calculateItemTotal(item), 0);

  // (수량+쿠폰) 할인 적용 금액
  let totalAfterDiscount = totalAfterAmountDiscount;
  // 금액 할인 쿠폰 적용
  if (selectedCoupon?.discountType === "amount") {
    totalAfterDiscount -= selectedCoupon.discountValue;
  }
  // 퍼센트 할인 쿠폰 적용
  if (selectedCoupon?.discountType === "percentage") {
    totalAfterDiscount -= totalAfterAmountDiscount * (selectedCoupon.discountValue / 100);
  }

  const totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount,
  };
};

/** 장바구니 상품 수량 업데이트 */
export const updateCartItemQuantity = (cartItems: ICartItem[], productId: string, newQuantity: number): ICartItem[] => {
  const updatedCart = cartItems
    .map((cartItem) => {
      const isTargetProduct = cartItem.product.id === productId;
      if (!isTargetProduct) return cartItem;

      const maxQuantity = cartItem.product.stock;
      const updatedQuantity = Math.min(newQuantity, maxQuantity);

      return { ...cartItem, quantity: updatedQuantity };
    })
    .filter((cartItem) => cartItem.quantity > 0);

  return updatedCart;
};

/** 장바구니 상품 추가 */
export const addCartItem = (cartItems: ICartItem[], product: IProduct) => {
  const exCartItem = cartItems.find((item) => item.product.id === product.id);

  if (exCartItem) {
    return updateCartItemQuantity(cartItems, product.id, exCartItem.quantity + 1);
  }

  return [...cartItems, { product, quantity: 1 }];
};
