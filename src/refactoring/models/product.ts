import { CartItem, Product } from '../../types';

// 재고 계산하기
export const getRemainingStock = (product: Product, cart: CartItem[]) => {
  const cartItem = cart.find((item) => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
};

// 상품이 수정 중인지 여부를 반환
export const isEditingProduct = (
  edigingProduct: Product | null,
  productId: string,
): boolean => edigingProduct !== null && edigingProduct.id === productId;

// 상품 타이틀 반환
export const getTitle = (product: Product) =>
  `${product.name} - ${product.price}원 (재고: ${product.stock})`;
