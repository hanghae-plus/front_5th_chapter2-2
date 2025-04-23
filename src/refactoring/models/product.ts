import { Product } from '../../types.ts';

export function updateProductList(
  products: Product[],
  updatedProduct: Product,
): Product[] {
  return products.map((product) =>
    product.id === updatedProduct.id ? updatedProduct : product,
  );
}
