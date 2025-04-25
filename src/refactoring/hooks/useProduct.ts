import { Product } from '../../types';
import useLocalStorage from './useLocalStorage';

export function useProducts(initialProducts: Product[]) {
  const { value: products, setLocalStorageValue: setProducts } = useLocalStorage<Product[]>(
    'products',
    initialProducts
  );

  const updateProduct = (updated: Product) => {
    const newProducts = products.map(p => (p.id === updated.id ? updated : p));
    setProducts(newProducts);
  };

  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  return {
    products,
    updateProduct,
    addProduct
  };
}
