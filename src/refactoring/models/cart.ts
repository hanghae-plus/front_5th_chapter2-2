import { CartItem, Coupon, DISCOUNT_TYPE, Product } from "@/types";

export const calculateItemTotal = (item: CartItem) => {
  const { product, quantity } = item;
  const total = product.price * quantity;
  const applicableDiscount = getMaxApplicableDiscount(item);
  if (!applicableDiscount || applicableDiscount >= 1) {
    return total;
  }
  return total * (1 - applicableDiscount);
};

// 컴포넌트에서 최대 할인 금액 표기 UI
export const getMaxDiscount = (discounts: { quantity: number; rate: number }[]) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

export const getMaxApplicableDiscount = ({ quantity, product: { discounts } }: CartItem) => {
  // 상품 수량과 제한 기준에 따른 적용가능한 할인율
  return discounts.reduce((acc, { quantity: limit, rate }) => {
    return quantity >= limit ? Math.max(acc, rate) : acc;
  }, 0);
};

// 수량에 따른 할인금액 계산 내부함수
const _calculateCartTotalWithoutCoupon = (cart: CartItem[]) => {
  return cart.reduce(
    ({ totalBeforeDiscount, quantityDiscount: totalDiscount }, item) => {
      const itemTotal = item.product.price * item.quantity;
      return {
        totalBeforeDiscount: totalBeforeDiscount + itemTotal,
        quantityDiscount: totalDiscount + itemTotal * getMaxApplicableDiscount(item),
      };
    },
    { totalBeforeDiscount: 0, quantityDiscount: 0 }
  );
};

// 쿠폰 유무, 타입에 따른 할인액 계산 내부함수
const _calculateCouponDiscountValue = (
  selectedCoupon: Coupon | null,
  totalBeforeDiscount: number,
  totalDiscount: number
) => {
  if (!selectedCoupon) return 0;
  else if (selectedCoupon.discountType === DISCOUNT_TYPE.AMOUNT) return selectedCoupon.discountValue;
  else return (totalBeforeDiscount - totalDiscount) * (selectedCoupon.discountValue / 100); // DISCOUNT_TYPE.PERCENTAGE
};

export const calculateCartTotal = (cart: CartItem[], selectedCoupon: Coupon | null) => {
  // 빈 장바구니 예외처리 -> 할인 쿠폰이 음수값이 적용 가능함
  if (!cart.length) return { totalBeforeDiscount: 0, totalAfterDiscount: 0, totalDiscount: 0 };

  // 쿠폰 적용 전 할인된 총액, 기본 할인 액
  const { totalBeforeDiscount, quantityDiscount } = _calculateCartTotalWithoutCoupon(cart);

  // 쿠폰 적용 후 할인된 총액
  const couponDiscountValue = _calculateCouponDiscountValue(selectedCoupon, totalBeforeDiscount, quantityDiscount);

  // 최종 할인 금액, 쿠폰 적용 할인 금액
  const totalDiscount = quantityDiscount + couponDiscountValue;
  const totalAfterDiscount = totalBeforeDiscount - totalDiscount;
  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount,
  };
};

export const updateCartItemQuantity = (cart: CartItem[], productId: string, newQuantity: number): CartItem[] => {
  // 0이면 제거해야한다.
  if (newQuantity === 0) {
    return cart.filter(({ product }) => product.id !== productId);
  }

  // 재고가 충분히 있다면 새로운 수량으로 변경
  return cart.map((item) => {
    if (item.product.id !== productId) return item;

    const quantity = item.product.stock >= newQuantity ? newQuantity : item.product.stock;
    return { ...item, quantity };
  });
};

// 장바구니에 추가할때 새배열 함수, 재고 확인 로직 포함
export const addToCartCheckStock = (cart: CartItem[], product: Product) => {
  const newCart = [...cart];
  const idx = newCart.findIndex((item) => item.product.id === product.id);

  // 있는 경우 재고 확인 후 추가
  if (idx !== -1) {
    const item = newCart[idx];
    const quantity = Math.min(item.quantity + 1, product.stock);
    newCart[idx] = { ...item, quantity };
    return newCart;
  }

  return [...newCart, { product, quantity: 1 }];
};
