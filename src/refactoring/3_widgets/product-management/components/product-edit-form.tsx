import { ProductEditFormProps } from "../types";
import { DiscountEditor } from "./discount-editor";

export const ProductEditForm: React.FC<ProductEditFormProps> = ({
  product,
  onFieldChange,
  addDiscount,
  removeDiscount,
  onSaveClick,
}) => {
  return (
    <div>
      <div className="mb-4">
        <label className="block mb-1">상품명: </label>
        <input
          data-testid="edit-product-name-input"
          type="text"
          value={product.name}
          onChange={(e) => onFieldChange("name", e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">가격: </label>
        <input
          data-testid="edit-product-price-input"
          type="number"
          value={product.price}
          onChange={(e) => onFieldChange("price", parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">재고: </label>
        <input
          data-testid="edit-product-stock-input"
          type="number"
          value={product.stock}
          onChange={(e) => onFieldChange("stock", parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <DiscountEditor
          discounts={product.discounts}
          addDiscount={addDiscount}
          removeDiscount={removeDiscount}
        />
      </div>
      <button
        onClick={onSaveClick}
        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
      >
        수정 완료
      </button>
    </div>
  );
};
