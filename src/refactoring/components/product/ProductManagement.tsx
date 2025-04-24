import { useState } from 'react';
import { ProductAccordion, NewProductForm } from '.';
import { Button } from '../ui';
import type { Product } from '@/types';

interface ProductManagementProps {
  products: Product[];
  onProductAdd: (newProduct: Product) => void;
  onProductUpdate: (updatedProduct: Product) => void;
}

export const ProductManagement = ({
  products,
  onProductAdd,
  onProductUpdate,
}: ProductManagementProps) => {
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());
  const [editingProductId, setEditingProductId] = useState<string>('');
  const [showNewProductForm, setShowNewProductForm] = useState(false);

  const toggleProductAccordion = (productId: string) => {
    setOpenProductIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const handleEditComplete = (newProduct: Product) => {
    onProductUpdate(newProduct);
    setEditingProductId('');
  };

  const handleEditProduct = (productId: string) => {
    setEditingProductId(productId);
  };

  const handleAddNewProduct = (newProduct: Product) => {
    onProductAdd(newProduct);
    changeShowNewProductForm();
  };

  const changeShowNewProductForm = () => {
    setShowNewProductForm((prevShowNewProductForm) => !prevShowNewProductForm);
  };

  return (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>상품 관리</h2>
      <Button
        className='px-4 py-2 mb-4'
        variant='solid'
        color='green'
        onClick={changeShowNewProductForm}
      >
        {showNewProductForm ? '취소' : '새 상품 추가'}
      </Button>
      {showNewProductForm && (
        <NewProductForm onAddNewProduct={handleAddNewProduct} />
      )}
      <div className='space-y-2'>
        {products.map((product, index) => (
          <ProductAccordion
            key={`product-${product.id}-accordion`}
            product={product}
            index={index}
            isOpen={openProductIds.has(product.id)}
            isEditing={editingProductId === product.id}
            onProductEdit={handleEditProduct}
            onCompleteEdit={handleEditComplete}
            onProductUpdate={onProductUpdate}
            onToggleButtonClick={toggleProductAccordion}
          />
        ))}
      </div>
    </div>
  );
};
