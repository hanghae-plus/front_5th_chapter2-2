import { useState } from 'react';
import { Product } from '../../../types';
import { createProductWithId } from '../../_models/product';

interface UseNewProductAddProps {
  onProductAdd: (newProduct: Product) => void;
  onFormClose: () => void;
}
const useNewProductAdd = (props: UseNewProductAddProps) => {
  const { onFormClose, onProductAdd } = props;
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    stock: 0,
    discounts: [],
  }); // 새 상품 상태

  // 필드 업데이트를 (액션 함수)
  const updateProductField = <K extends keyof Omit<Product, 'id'>>(
    field: K,
    value: Omit<Product, 'id'>[K]
  ) => {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [field]: value,
    }));
  };

  // 새 상품 추가 액션 함수
  const handleAddNewProduct = () => {
    const productWithId = createProductWithId(newProduct);

    onProductAdd(productWithId);
    resetProductForm();
    onFormClose();
  };

  // 초기화
  const resetProductForm = () => {
    setNewProduct({
      name: '',
      price: 0,
      stock: 0,
      discounts: [],
    });
  };
  return {
    newProduct,
    updateProductField,
    handleAddNewProduct,
    resetProductForm,
  };
};

export default useNewProductAdd;
