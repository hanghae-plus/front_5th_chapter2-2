import { useEffect, useState } from 'react';
import { Product } from '../../types.ts';
import { getProducts, updateProduct, addProduct } from '../apis/productApi.ts';

export const useProducts = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handlerGetProducts = () => {
    getProducts().then((res) => {
      setData(res);
    });
  };

  const handleUpdateProduct = (product: Product) => {
    setLoading(true);
    try {
      updateProduct(product).then(() => {
        setData(data.map((p) => (p.id === product.id ? product : p)));
        setLoading(false);
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = (product: Product) => {
    setLoading(true);
    try {
      addProduct(product).then(() => {
        setData([...data, product]);
        setLoading(false);
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handlerGetProducts();
  }, []);

  return {
    products: data || [], // null일 경우 빈 배열 반환
    loading,
    error,
    updateProduct: handleUpdateProduct,
    addProduct: handleAddProduct,
  };
};
