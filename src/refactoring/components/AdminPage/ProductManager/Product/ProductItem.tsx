import type { Product } from '../../../../../types.ts';
import { useAdmin } from '../../../../hooks';
import { ProductEditForm } from './ProductEditForm.tsx';
import { ProductDiscountView } from '../ProductDiscount/ProductDiscountView.tsx';

export function ProductItem({ product, index }: { product: Product; index: number }) {
  const { openProductIds, editingProduct, toggleProductAccordion } = useAdmin();

  function handleClickToggleAccordion() {
    toggleProductAccordion(product.id);
  }

  return (
    <div data-testid={`product-${index + 1}`} className="bg-white p-4 rounded shadow">
      <button
        data-testid="toggle-button"
        className="w-full text-left font-semibold"
        onClick={handleClickToggleAccordion}
      >
        {product.name} - {product.price}원 (재고: {product.stock})
      </button>

      {openProductIds.has(product.id) && (
        <div className="mt-2">
          {editingProduct && editingProduct.id === product.id ? (
            <ProductEditForm product={product} />
          ) : (
            <div>
              <ProductDiscountView product={product} />

              <ProductButtonEdit product={product} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ProductButtonEdit({ product }: { product: Product }) {
  const { handleEditProduct } = useAdmin();

  function handleClickEditProduct() {
    handleEditProduct(product);
  }

  return (
    <button
      data-testid="modify-button"
      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
      onClick={handleClickEditProduct}
    >
      수정
    </button>
  );
}
