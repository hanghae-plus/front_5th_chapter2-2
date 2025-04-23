import { useState } from "react";
import { initialProduct, initialProducts } from "../../data";
import { Product } from "../../entities";
import { useEditProduct } from "../../hooks/product/useEditProduct";

/**
 * 상품 목록을 관리하는 커스텀 훅
 *
 * @param initialProducts - 초기 상품 배열
 * @returns 상품 배열과 조작 함수 (addProduct, updateProduct)
 *
 */

export const useProducts = () => {
  const { updateEditingProduct } = useEditProduct();

  //products
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const initializeProducts = (initialProducts: Product[]) => {
    setProducts(initialProducts);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
    );
  };

  const handleStockUpdate = (productId: string, newStock: number) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = { ...updatedProduct, stock: newStock };
      updateProduct(newProduct);
      updateEditingProduct(newProduct);
    }
  };

  //new product
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>(initialProduct);

  const handleAddNewProduct = () => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    updateProduct(productWithId);
    setNewProduct(initialProduct);
    setShowNewProductForm(false);
  };

  const updateNewProduct = (newProduct: Omit<Product, "id">) => {
    setNewProduct(newProduct);
  };

  // newProductForm
  const [showNewProductForm, setShowNewProductForm] = useState(false);

  const toggleNewProductForm = () => {
    setShowNewProductForm((prev) => !prev);
  };

  return {
    products,
    updateProduct,
    initializeProducts,
    newProduct,
    addProduct,
    updateNewProduct,
    handleAddNewProduct,
    showNewProductForm,
    toggleNewProductForm,
    handleStockUpdate,
  };
};
