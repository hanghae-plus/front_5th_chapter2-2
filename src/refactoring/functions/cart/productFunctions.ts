import { Product } from "../../../types";

/**
 * 제품 목록에서 특정 제품을 업데이트
 * @param products 기존 제품 목록
 * @param updatedProduct 업데이트할 제품
 * @returns 업데이트된 제품 목록
 */
export const updateProductInList = (products: Product[], updatedProduct: Product): Product[] => {
  return products.map(product => product.id === updatedProduct.id ? updatedProduct : product);
};

/**
 * 제품 목록에 새 제품을 추가
 * @param products 기존 제품 목록
 * @param newProduct 추가할 새 제품
 * @returns 새 제품이 추가된 제품 목록
 */
export const addProductToList = (products: Product[], newProduct: Product): Product[] => {
  return [...products, newProduct];
};

/**
 * 제품 ID로 제품 찾기
 * @param products 제품 목록
 * @param productId 찾을 제품 ID
 * @returns 찾은 제품 또는 undefined
 */
export const findProductById = (products: Product[], productId: string): Product | undefined => {
  return products.find(product => product.id === productId);
};

/**
 * 제품 목록에서 제품 필터링
 * @param products 제품 목록
 * @param filterFn 필터링 함수
 * @returns 필터링된 제품 목록
 */
export const filterProducts = (
  products: Product[], 
  filterFn: (product: Product) => boolean
): Product[] => {
  return products.filter(filterFn);
}; 