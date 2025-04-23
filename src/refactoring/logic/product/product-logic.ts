import { Product } from "../../entities";

/**
 * 기존 배열에 새로운 상품을 추가하여 새 배열을 반환
 */
export const addProduct = (products: Product[], newProduct: Product): Product[] => {
  return [...products, newProduct];
};

export const updateProduct = (products: Product[], updatedProduct: Product): Product[] => {
  return products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
};

export const handleStockUpdate = (products: Product[], productId: string, newStock: number) => {
  const updatedProduct = products.find((p) => p.id === productId);
  return updatedProduct ? { ...updatedProduct, stock: newStock } : null;
};

export const createProductWithId = (product: Omit<Product, "id">): Product => ({
  ...product,
  id: Date.now().toString(),
});
