import { CartItem, Coupon, Discount, Product, TotalPrice } from '../../types';

export const addProductToCart = (cart: CartItem[], product: Product) => {
  const existingItem = cart.find((item) => item.product.id === product.id);

  if (existingItem) {
    return cart.map((item) =>
      item.product.id === product.id
        ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
        : item,
    );
  }
  return [...cart, { product, quantity: 1 }];
};

export const getAppliedDiscountRate = (item: CartItem) => {
  const { discounts } = item.product;
  const { quantity } = item;
  let appliedDiscountRate = 0;

  for (const discount of discounts) {
    if (quantity >= discount.quantity) {
      appliedDiscountRate = Math.max(appliedDiscountRate, discount.rate);
    }
  }

  return appliedDiscountRate;
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const { discounts } = item.product;
  const { quantity } = item;
  let maxDiscount = 0;

  for (const discount of discounts) {
    if (quantity >= discount.quantity) {
      maxDiscount = Math.max(maxDiscount, discount.rate);
    }
  }
  return maxDiscount;
};

export const getMaxDiscount = (discounts: Discount[]) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

export const calculateItemTotal = (item: CartItem) => {
  const { price } = item.product;
  const { quantity } = item;
  const totalPrice = price * quantity;
  const appliedDiscount = getMaxApplicableDiscount(item);

  return totalPrice * (1 - appliedDiscount);
};

const calculateDiscountedPrice = (price: number, coupon: Coupon | null) => {
  let discountedPrice = price;

  if (coupon) {
    const { discountType, discountValue } = coupon;
    if (discountType === 'amount') {
      discountedPrice -= discountValue;
    } else {
      discountedPrice -=
        +(1 - (100 - discountValue) / 100).toFixed(2) * discountedPrice;
    }
  }

  return discountedPrice;
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null,
): TotalPrice => {
  const totalBeforeDiscount = cart.reduce(
    (acc, { product, quantity }: CartItem) => acc + product.price * quantity,
    0,
  );
  const initialDiscountedPrice = cart.reduce(
    (acc, item) => acc + calculateItemTotal(item),
    0,
  );
  const totalAfterDiscount = calculateDiscountedPrice(
    initialDiscountedPrice,
    selectedCoupon,
  );

  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount: totalBeforeDiscount - totalAfterDiscount,
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number,
): CartItem[] => {
  return cart
    .map((item) => {
      if (item.product.id === productId) {
        const maxQuantity = item.product.stock;
        const updatedQuantity = Math.max(0, Math.min(newQuantity, maxQuantity));
        return updatedQuantity > 0
          ? { ...item, quantity: updatedQuantity }
          : null;
      }
      return item;
    })
    .filter((item): item is CartItem => item !== null);
};
