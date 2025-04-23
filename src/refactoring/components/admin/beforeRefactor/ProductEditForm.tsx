import { useState } from "react";
import { formatDiscountInfo } from "../../../models/product.ts";
import DiscountForm from "./DiscountForm";
import { Discount, Product } from "../../../../types.ts";

interface Props {
  editingProduct: Product;
  handleUpdateEditingField: (field: keyof Product, value: any) => void;
  onCancelEdit: () => void;
  onSaveProduct: () => void;
}

const ProductEditForm = ({
  editingProduct,
  handleUpdateEditingField,
  onCancelEdit,
  onSaveProduct,
}: Props) => {
  // useDiscountManagement 대신 직접 구현
  const [newDiscount, setNewDiscount] = useState<Discount>({
    quantity: 0,
    rate: 0,
  });

  const handleAddDiscount = () => {
    handleUpdateEditingField("discounts", [
      ...editingProduct.discounts,
      newDiscount,
    ]);
    setNewDiscount({ quantity: 0, rate: 0 });
  };

  const handleRemoveDiscount = (index: number) => {
    handleUpdateEditingField(
      "discounts",
      editingProduct.discounts.filter((_, i) => i !== index)
    );
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block mb-1">상품명: </label>
        <input
          type="text"
          value={editingProduct.name}
          onChange={(e) => handleUpdateEditingField("name", e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">가격: </label>
        <input
          type="number"
          value={editingProduct.price}
          onChange={(e) =>
            handleUpdateEditingField("price", parseInt(e.target.value))
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">재고: </label>
        <input
          type="number"
          value={editingProduct.stock}
          onChange={(e) =>
            handleUpdateEditingField("stock", parseInt(e.target.value))
          }
          className="w-full p-2 border rounded"
        />
      </div>

      {/* 할인 정보 수정 부분 */}
      <div>
        <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
        {editingProduct.discounts.map((discount, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <span>{formatDiscountInfo(discount)}</span>
            <button
              onClick={() => handleRemoveDiscount(index)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              삭제
            </button>
          </div>
        ))}
        <DiscountForm
          newDiscount={newDiscount}
          setNewDiscount={setNewDiscount}
          onAddDiscount={handleAddDiscount}
        />
      </div>

      <div className="mt-2 space-x-2">
        <button
          onClick={onSaveProduct}
          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
        >
          수정 완료
        </button>
        <button
          onClick={onCancelEdit}
          className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default ProductEditForm;
