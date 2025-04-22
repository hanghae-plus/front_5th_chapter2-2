import { CartItem, Coupon, Product } from "../../types";

// early return 으로 조건문 복잡도를 낮춘다
export const getAddedToCart = (cart: CartItem[], product: Product) => {
  const targetIndex = cart.findIndex((item) => item.product.id === product.id);

  if (targetIndex === -1) {
    return [...cart, { product, quantity: 1 }];
  }

  return cart.map((item, index) =>
    index === targetIndex ? { ...item, quantity: item.quantity + 1 } : item
  );
};

export const calculateItemTotal = (item: CartItem) => {
  const price = item.product.price;
  const quantityInCart = item.quantity;

  // discountRate 중 적용되는 큰 값으로 price * discountRate
  const discountRate = getMaxApplicableDiscount(item);

  return price * (1 - discountRate) * quantityInCart;
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const quantityInCart = item.quantity;
  const discountInfos = item.product.discounts;

  const maxDiscountRate = discountInfos.reduce((prevRate, discountInfo) => {
    const { quantity, rate } = discountInfo;
    return quantityInCart >= quantity && rate > prevRate ? rate : prevRate;
  }, 0);
  return maxDiscountRate;
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  const totalBeforeDiscount = cart.reduce((prevPrice, item) => {
    return prevPrice + item.product.price * item.quantity;
  }, 0);

  const totalAfterProductDiscount = cart.reduce((prevSubTotal, item) => {
    return prevSubTotal + calculateItemTotal(item);
  }, 0);

  const couponDiscount = getCouponDiscount(
    selectedCoupon,
    totalAfterProductDiscount
  );
  const productDiscount = totalBeforeDiscount - totalAfterProductDiscount;
  const totalDiscount = productDiscount + couponDiscount;
  const totalAfterDiscount = totalBeforeDiscount - totalDiscount;

  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount,
  };
};

function getCouponDiscount(
  selectedCoupon: Coupon | null,
  totalAfterProductDiscount: number
) {
  if (!selectedCoupon) return 0;

  // 금액 할인인 경우
  switch (selectedCoupon.discountType) {
    case "amount":
      return selectedCoupon.discountValue;
    case "percentage":
      return (totalAfterProductDiscount * selectedCoupon.discountValue) / 100;
    default:
      return 0;
  }
}

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  // 수량이 0인 경우 cart에서 item 삭제
  if (newQuantity === 0) {
    return getRemovedFromCart(cart, productId);
  }

  const newCart = cart.map((item) => {
    if (item.product.id !== productId) return item;
    const productStock = item.product.stock;
    // 수량이 재고보다 큰 경우 재고 수량으로
    const finalQuantity = Math.min(newQuantity, productStock);
    return { ...item, quantity: finalQuantity };
  });

  return newCart;
};

export const getRemovedFromCart = (cart: CartItem[], productId: string) => {
  return cart.filter((item) => item.product.id !== productId);
};
