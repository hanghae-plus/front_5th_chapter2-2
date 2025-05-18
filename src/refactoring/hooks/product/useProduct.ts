import { Product } from "../../../types";
import { useLocalStorage } from "../common/useLocalStorage";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useLocalStorage<Product[]>(
    "products",
    initialProducts
  );

  const addProduct = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  return {
    products,
    updateProduct,
    addProduct,
  };
};
