import { useState } from 'react';
import { Discount, Product } from '../../types';

export default function useEditProduct({
  products,
  onProductUpdate,
  editingProduct,
  setEditingProduct
}: {
  products: Product[];
  onProductUpdate: (product: Product) => void;
  editingProduct: Product;
  setEditingProduct: (product: Product | null) => void;
}) {
  const [newDiscount, setNewDiscount] = useState<Discount>({ quantity: 0, rate: 0 });

  // 수정 완료 핸들러 함수 추가
  const handleEditComplete = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  const handleAddDiscount = (productId: string) => {
    const updatedProduct = products.find(p => p.id === productId);
    if (updatedProduct && editingProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: [...updatedProduct.discounts, newDiscount]
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
      setNewDiscount({ quantity: 0, rate: 0 });
    }
  };

  const handleRemoveDiscount = (productId: string, index: number) => {
    const updatedProduct = products.find(p => p.id === productId);
    if (updatedProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: updatedProduct.discounts.filter((_, i) => i !== index)
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  return {
    editingProduct,
    newDiscount,
    setNewDiscount,
    handleAddDiscount,
    handleRemoveDiscount,
    handleEditComplete
  };
}
