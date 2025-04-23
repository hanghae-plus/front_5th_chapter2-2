import { useCallback } from 'react';
import { Product, Discount } from '../../types.ts';
import {
  updateProductName,
  updateProductPrice,
  updateProductStock,
  addDiscount,
  removeDiscount,
} from '../models/admin.ts';

interface AdminProductHandlerProps {
  products: Product[];
  editingProduct: Product | null;
  setEditingProduct: (product: Product | null) => void;
  onProductUpdate: (product: Product) => void;
}

export const useAdminProductHandlers = ({
  products,
  editingProduct,
  setEditingProduct,
  onProductUpdate,
}: AdminProductHandlerProps) => {
  // 새로운 핸들러 함수 추가
  const handleProductNameUpdate = useCallback(
    (productId: string, newName: string) => {
      if (editingProduct && editingProduct.id === productId) {
        const updated = updateProductName(editingProduct, newName);
        setEditingProduct(updated);
      }
    },
    [editingProduct, setEditingProduct],
  );

  // 새로운 핸들러 함수 추가
  const handlePriceUpdate = useCallback(
    (productId: string, newPrice: number) => {
      if (editingProduct && editingProduct.id === productId) {
        const updated = updateProductPrice(editingProduct, newPrice);
        setEditingProduct(updated);
      }
    },
    [editingProduct, setEditingProduct],
  );

  const handleStockUpdate = useCallback(
    (productId: string, newStock: number) => {
      const found = products.find((p) => p.id === productId);
      if (found) {
        const updated = updateProductStock(found, newStock);
        onProductUpdate(updated);
        setEditingProduct(updated);
      }
    },
    [products, setEditingProduct],
  );

  const handleAddDiscount = useCallback(
    (productId: string, discount: Discount) => {
      const found = products.find((p) => p.id === productId);
      if (found && editingProduct) {
        const updated = addDiscount(found, discount);
        onProductUpdate(updated);
        setEditingProduct(updated);
      }
    },
    [products, editingProduct, setEditingProduct],
  );

  const handleRemoveDiscount = useCallback(
    (productId: string, index: number) => {
      const found = products.find((p) => p.id === productId);
      if (found) {
        const updated = removeDiscount(found, index);
        onProductUpdate(updated);
        setEditingProduct(updated);
      }
    },
    [products, setEditingProduct],
  );

  // 수정 완료 핸들러 함수 추가
  const handleEditComplete = useCallback(() => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  }, [editingProduct]);

  return {
    handleProductNameUpdate,
    handlePriceUpdate,
    handleStockUpdate,
    handleAddDiscount,
    handleRemoveDiscount,
    handleEditComplete,
  };
};
