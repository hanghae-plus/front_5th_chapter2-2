import { Product } from '../../types.ts';
import { useLocalStorage } from './useLocalStorage.ts';

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useLocalStorage('products', initialProducts);

  const updateProduct = (updateProduct: Product) => {
    setProducts(
      products.map((product) => {
        if (product.id === updateProduct.id) {
          return updateProduct;
        }
        return product;
      }),
    );
  };

  const addProduct = (addProduct: Product) => {
    setProducts((prev) => [...prev, addProduct]);
  };
  return {
    products,
    updateProduct,
    addProduct,
  };
};
