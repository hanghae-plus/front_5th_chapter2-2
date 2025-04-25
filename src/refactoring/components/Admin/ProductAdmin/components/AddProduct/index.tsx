import { useState } from 'react';
import { Product } from '../../../../../../types.ts';
import { AddProductForm } from './components/AddProductForm';

interface Props {
  onProductAdd: (newProduct: Product) => void;
}

export const AddProduct = ({ onProductAdd }: Props) => {
  const [showNewProductForm, setShowNewProductForm] = useState(false);

  return (
    <div id={'상품 추가 섹션'}>
      <button
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        className='bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600'
      >
        {showNewProductForm ? '취소' : '새 상품 추가'}
      </button>

      {showNewProductForm && (
        <AddProductForm
          onProductAdd={onProductAdd}
          setShowNewProductForm={setShowNewProductForm}
        />
      )}
    </div>
  );
};
