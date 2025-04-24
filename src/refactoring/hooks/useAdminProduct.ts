import { useState, useCallback } from 'react';
import { Product } from '../../types';

interface UseAdminProductParams {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
}

export const useAdminProduct = ({ products, onProductUpdate }: UseAdminProductParams) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const editProduct = useCallback((product: Product) => {
    setEditingProduct({ ...product });
  }, []);

  const updateProductName = useCallback(
    (productId: string, newName: string) => {
      if (editingProduct && editingProduct.id === productId) {
        const updatedProduct = { ...editingProduct, name: newName };

        setEditingProduct(updatedProduct);
      }
    },
    [editingProduct],
  );

  const updateProductPrice = useCallback(
    (productId: string, newPrice: number) => {
      if (editingProduct && editingProduct.id === productId) {
        const updatedProduct = { ...editingProduct, price: newPrice };

        setEditingProduct(updatedProduct);
      }
    },
    [editingProduct],
  );

  const updateProductStock = useCallback(
    (productId: string, newStock: number) => {
      const updatedProduct = products.find((p) => p.id === productId);

      if (!updatedProduct) return;

      const newProduct = { ...updatedProduct, stock: newStock };

      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    },
    [products, onProductUpdate],
  );

  const editComplete = useCallback(() => {
    if (!editingProduct) return;

    onProductUpdate(editingProduct);
    setEditingProduct(null);
  }, [editingProduct, onProductUpdate]);

  return {
    editingProduct,
    editProduct,
    updateProductName,
    updateProductPrice,
    updateProductStock,
    editComplete,
  };
};
