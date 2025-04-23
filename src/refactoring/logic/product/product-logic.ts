import { Product } from "../../entities";

/**
 * 기존 배열에 새로운 상품을 추가하여 새 배열을 반환
 */
export const addProduct = (products: Product[], newProduct: Product): Product[] => {
  return [...products, newProduct];
};

/**
 * 기존 상품 배열에서 특정 상품을 업데이트하여 새 배열을 반환
 */

export const updateProduct = (products: Product[], updatedProduct: Product): Product[] => {
  return products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
};

/**
 * 특정 상품의 재고(stock)를 변경한 새 상품 객체를 반환
 */
export const handleStockUpdate = (products: Product[], productId: string, newStock: number) => {
  const updatedProduct = products.find((p) => p.id === productId);
  return updatedProduct ? { ...updatedProduct, stock: newStock } : null;
};

/**
 * 고유 ID를 부여한 새 상품 객체를 생성
 */

export const createProductWithId = (product: Omit<Product, "id">): Product => ({
  ...product,
  id: Date.now().toString(),
});
