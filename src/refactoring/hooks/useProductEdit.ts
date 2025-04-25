import { useState } from "react";
import { Product } from "../../types";


interface useProductEditProps {
    products: Product[];
    onProductUpdate: (updatedProduct: Product) => void;
}

export const useProductEdit = ({products, onProductUpdate}: useProductEditProps) => {
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const handleEditProduct = (product: Product) => {
        setEditingProduct({ ...product });
    };

    const handleProductNameUpdate = (productId: string, newName: string) => {
        if (editingProduct && editingProduct.id === productId) {
          const updatedProduct = { ...editingProduct, name: newName };
          setEditingProduct(updatedProduct);
        }
      };

        // 새로운 핸들러 함수 추가
  const handlePriceUpdate = (productId: string, newPrice: number) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, price: newPrice };
      setEditingProduct(updatedProduct);
    }
  };

  const handleEditComplete = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  const handleStockUpdate = (productId: string, newStock: number) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = { ...updatedProduct, stock: newStock };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  return {
    editingProduct,
    setEditingProduct,
    handleEditProduct,
    handleProductNameUpdate,
    handlePriceUpdate,
    handleEditComplete,
    handleStockUpdate
  };
}