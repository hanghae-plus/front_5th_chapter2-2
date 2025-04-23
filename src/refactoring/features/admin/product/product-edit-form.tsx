import { Product } from "../../../entities";
import { useEditProductAction } from "../../../hooks/product/useEditProductAction";
import { useProductStore } from "../../../store/product-store";
import { DiscountEditForm } from "../discount/discount-edit-form";

interface Props {
  editingProduct: Product;
  product: Product;
}

export const ProductEditForm = (props: Props) => {
  const { editingProduct, product } = props;

  const { handleEditComplete, handleProductNameUpdate, handlePriceUpdate } = useEditProductAction();
  const { handleStockUpdate } = useProductStore();

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
      {/* 할인 정보 수정 부분 */}
      <DiscountEditForm editingProduct={editingProduct} product={product} />
      <button
        onClick={handleEditComplete}
        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
      >
        수정 완료
      </button>
    </div>
  );
};
