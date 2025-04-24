import { useState } from 'react';
import { Product } from '../../../types';
import ProductAdd from './ProductAdd';
import ProductEdit from './ProductEdit';
import useProductAccordion from '../_hooks/useProductAccordion';

interface ProductManageProps {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
}
const ProductManage = (props: ProductManageProps) => {
  const { products, onProductUpdate, onProductAdd } = props;
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const { openProductIds, toggleProductAccordion } = useProductAccordion();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <button
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600">
        {showNewProductForm ? '취소' : '새 상품 추가'}
      </button>
      {/* 새 상품 추가 */}
      {showNewProductForm && (
        <ProductAdd onProductAdd={onProductAdd} setShowNewProductForm={setShowNewProductForm} />
      )}

      {/* 상품 목록 */}
      <div className="space-y-2">
        {products.map((product, index) => (
          <div
            key={product.id}
            data-testid={`product-${index + 1}`}
            className="bg-white p-4 rounded shadow">
            {/* 상품 정보, 클릭 시 수정 */}
            <button
              data-testid="toggle-button"
              onClick={() => toggleProductAccordion(product.id)}
              className="w-full text-left font-semibold">
              {product.name} - {product.price}원 (재고: {product.stock})
            </button>

            {/* 상품 수정 */}
            {openProductIds.has(product.id) && (
              <ProductEdit onProductUpdate={onProductUpdate} product={product} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManage;
