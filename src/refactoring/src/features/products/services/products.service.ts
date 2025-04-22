import { Product } from "../../../entities/product/types/product.types";

export const ProductsService = (products: Product[]) => {
  const findProductById = (id: string): Product | undefined => {
    return products.find((product) => product.id === id);
  };

  const addProduct = (
    newProduct: Product,
    updateProducts: (updater: (prevProducts: Product[]) => Product[]) => void
  ): void => {
    updateProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const updateProduct = (
    updatedProduct: Product,
    updateProducts: (updater: (prevProducts: Product[]) => Product[]) => void
  ): void => {
    updateProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      )
    );
  };

  const removeProduct = (
    productId: string,
    updateProducts: (updater: (prevProducts: Product[]) => Product[]) => void
  ): void => {
    updateProducts((prevProducts) =>
      prevProducts.filter((p) => p.id !== productId)
    );
  };

  return {
    findProductById,
    addProduct,
    updateProduct,
    removeProduct,
  };
};
