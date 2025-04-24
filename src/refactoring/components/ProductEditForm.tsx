import { Product } from '../../types';
import { useProductEdit } from '../hooks/useProductEdit';
import { useDiscount } from '../hooks/useDiscount';
import ProductEditDiscountForm from './ProductEditDiscountForm';

interface Props {
  product: Product;
  productEditor: ReturnType<typeof useProductEdit>;
  productDiscounter: ReturnType<typeof useDiscount>;
}

export default function ProductEditForm({
  product,
  productEditor,
  productDiscounter,
}: Props) {
  const {
    editingProduct,
    handleProductNameUpdate,
    handlePriceUpdate,
    handleStockUpdate,
    handleEditComplete,
  } = productEditor;

  return (
    <div>
      <div className="mb-4">
        <label className="block mb-1">상품명: </label>
        <input
          title="상품명"
          type="text"
          value={editingProduct?.name}
          onChange={(e) => handleProductNameUpdate(product.id, e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">가격: </label>
        <input
          title="가격"
          type="number"
          value={editingProduct?.price}
          onChange={(e) =>
            handlePriceUpdate(product.id, parseInt(e.target.value))
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">재고: </label>
        <input
          title="재고"
          type="number"
          value={editingProduct?.stock}
          onChange={(e) =>
            handleStockUpdate(product.id, parseInt(e.target.value))
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <ProductEditDiscountForm
        id={product.id}
        editingProduct={editingProduct}
        productDiscounter={productDiscounter}
      />
      <button
        onClick={handleEditComplete}
        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
      >
        수정 완료
      </button>
    </div>
  );
}
