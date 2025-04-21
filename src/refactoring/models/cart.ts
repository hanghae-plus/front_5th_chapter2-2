import { CartItem, Coupon } from "../../types";

export const calculateItemTotal = (item: CartItem) => {
  const price = item.product.price;
  const quantityInCart = item.quantity;

  // let discountRate = 0;
  // const discountInfos = item.product.discounts;
  // discountInfos.forEach((discountInfo) => {
  //   const { quantity, rate } = discountInfo;
  //   if (quantityInCart >= quantity) {
  //     discountRate = rate > discountRate ? rate : discountRate;
  //   }
  // });
  // return price * (1 - discountRate) * quantityInCart;
  return price * quantityInCart;
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const quantityInCart = item.quantity;
  const discountInfos = item.product.discounts;

  let maxDiscountRate = 0;
  discountInfos.forEach((discountInfo) => {
    const { quantity, rate } = discountInfo;
    if (quantityInCart >= quantity) {
      maxDiscountRate = rate > maxDiscountRate ? rate : maxDiscountRate;
    }
  });

  return maxDiscountRate;
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  let totalBeforeDiscount = 0,
    totalAfterDiscount = 0,
    totalDiscount = 0,
    productDiscount = 0,
    couponDiscount = 0;

  cart.forEach((item) => {
    const totalPrice = calculateItemTotal(item);
    const discountRate = getMaxApplicableDiscount(item);
    const discountPrice = totalPrice * discountRate;

    productDiscount += discountPrice;
    totalBeforeDiscount += totalPrice;
  });

  //
  const subTotalAfterDiscount = totalBeforeDiscount - productDiscount;

  if (selectedCoupon?.discountType === "amount") {
    couponDiscount += selectedCoupon?.discountValue;
  }

  if (selectedCoupon?.discountType === "percentage") {
    const discount =
      (subTotalAfterDiscount * selectedCoupon?.discountValue) / 100;
    couponDiscount += discount;
  }

  totalDiscount = productDiscount + couponDiscount;
  totalAfterDiscount = totalBeforeDiscount - totalDiscount;

  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount,
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  // 수량이 0인 경우 cart에서 item 삭제
  if (typeof newQuantity === "number" && newQuantity === 0) {
    return cart.filter((item) => item.product.id !== productId);
  }

  const newCart = cart.map((item) => {
    if (item.product.id !== productId) return item;
    // 수량이 재고보다 큰 경우
    const productStock = item.product.stock;
    if (productStock < newQuantity) return { ...item, quantity: productStock };

    return { ...item, quantity: newQuantity };
  });

  return newCart;
};
