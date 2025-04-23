import { useState } from 'react';
import { Product } from '../../../types';
import { updateProductProperty } from '../../_models/product';

interface UseProductEditingProps {
  onProductUpdate: (updatedProduct: Product) => void;
}
const useProductEditing = (props: UseProductEditingProps) => {
  const { onProductUpdate } = props;
  const [editingProduct, setEditingProduct] = useState<Product | null>(null); // 상품 수정 상태

  // 상품 수정 시작 (액션 함수)
  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  // 상품 업데이트 - 상품명, 가격, 재고 (액션 함수)
  const handlePropertyUpdate = <K extends keyof Product>(
    productId: string,
    property: K,
    value: Product[K]
  ) => {
    setEditingProduct((prev) => {
      if (prev && prev.id === productId) {
        return updateProductProperty(prev, property, value);
      }
      return prev;
    });
  };

  const handleEditComplete = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  return {
    editingProduct,
    setEditingProduct,
    handleEditProduct,
    handlePropertyUpdate,
    handleEditComplete,
  };
};

export default useProductEditing;
