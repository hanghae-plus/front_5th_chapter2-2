import { useAdmin } from '../../../../hooks';
import { ProductDiscountManager } from '../ProductDiscount/ProductDiscountManager.tsx';
import type { Product } from '../../../../../types.ts';

export function ProductEditForm({ product }: { product: Product }) {
  const { editingProduct, handleProductNameUpdate, handlePriceUpdate, handleStockUpdate, handleEditComplete } =
    useAdmin();

  if (!editingProduct) {
    return <></>;
  }

  return (
    <div>
      <div className="mb-4">
        <label className="block mb-1">상품명: </label>
        <input
          type="text"
          value={editingProduct.name}
          onChange={(e) => handleProductNameUpdate(product.id, e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">가격: </label>
        <input
          type="number"
          value={editingProduct.price}
          onChange={(e) => handlePriceUpdate(product.id, parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">재고: </label>
        <input
          type="number"
          value={editingProduct.stock}
          onChange={(e) => handleStockUpdate(product.id, parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>

      <ProductDiscountManager product={product} />

      <button
        onClick={handleEditComplete}
        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
      >
        수정 완료
      </button>
    </div>
  );
}
