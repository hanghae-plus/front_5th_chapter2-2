import { useState } from 'react';
import { Product } from '@/types';
import { ProductAddForm } from './ProductAddForm';
import { ProductCard } from './ProductCard';

interface Props {
  products: Product[];
  updateProduct: (updatedProduct: Product) => void;
  addProduct: (newProduct: Product) => void;
}

export const ProductSection = ({ products, updateProduct, addProduct }: Props) => {
  const [showNewProductForm, setShowNewProductForm] = useState(false);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <button
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? '취소' : '새 상품 추가'}
      </button>
      {showNewProductForm && (
        <ProductAddForm
          addProduct={addProduct}
          setShowNewProductForm={setShowNewProductForm}
        />
      )}
      <div className="space-y-2">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            products={products}
            product={product}
            index={index}
            updateProduct={updateProduct}
          />
        ))}
      </div>
    </div>
  );
};
