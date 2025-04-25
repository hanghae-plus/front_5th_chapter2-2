import { Product } from '../../../../types';
import AddNewProductItem from './AddNewProductItem';
import { useToggle } from '../../../hooks/useToggle';
import useMultiToggle from '../../../hooks/useMultiToggle';
import ManageProductItem from './ManageProductItem';

export default function ProductSection({
  products,
  onProductAdd
}: {
  products: Product[];
  onProductAdd: (product: Product) => void;
}) {
  const {
    isOpen: isOpenNewProductForm,
    toggle: toggleNewProductForm,
    set: setNewProductForm
  } = useToggle();
  const { toggleAccordion, isOpen } = useMultiToggle();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <button
        onClick={() => toggleNewProductForm()}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {isOpenNewProductForm ? '취소' : '새 상품 추가'}
      </button>
      {isOpenNewProductForm && (
        <AddNewProductItem onProductAdd={onProductAdd} setShowNewProductForm={setNewProductForm} />
      )}
      <div className="space-y-2">
        {products.map((product, index) => (
          <div
            key={product.id}
            data-testid={`product-${index + 1}`}
            className="bg-white p-4 rounded shadow"
          >
            <button
              data-testid="toggle-button"
              onClick={() => toggleAccordion(product.id)}
              className="w-full text-left font-semibold"
            >
              {product.name} - {product.price}원 (재고: {product.stock})
            </button>
            {isOpen(product.id) && <ManageProductItem product={product} />}
          </div>
        ))}
      </div>
    </div>
  );
}
