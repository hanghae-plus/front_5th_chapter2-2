import { Product, Discount } from "../../types.ts";

/**
 * 할인 정보 기반으로 가격 계산
 * @param product
 * @param quantity
 * @returns
 */
export const calculateDiscountedPrice = (
  product: Product,
  quantity: number
): number => {
  if (!product || quantity <= 0) {
    return 0;
  }

  const applicableDiscounts = [...product.discounts]
    .filter((discount) => discount.quantity <= quantity)
    .sort((a, b) => b.quantity - a.quantity);

  const bestDiscount = applicableDiscounts[0];

  if (bestDiscount) {
    return product.price * quantity * (1 - bestDiscount.rate);
  }

  // 할인 없을 경우 원가 반환
  return product.price * quantity;
};

/**
 * 할인 정보 기반으로 가격 계산
 * @param product
 * @param quantity
 * @returns
 */
export const isInStock = (product: Product, quantity: number): boolean => {
  return product.stock >= quantity;
};

/**
 *   재고가 부족한 경우 최대 구매 가능 수량 계산
 * */
export const getMaxPurchasableQuantity = (product: Product): number => {
  return product.stock;
};

// 할인 정보 표시용 문자열 생성
export const formatDiscountInfo = (discount: Discount): string => {
  return `${discount.quantity}개 이상 구매 시 ${discount.rate * 100}% 할인`;
};
