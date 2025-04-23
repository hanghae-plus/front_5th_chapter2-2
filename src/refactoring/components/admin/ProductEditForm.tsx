import { useAtomValue, useSetAtom } from "jotai";
import { formatDiscountInfo } from "../../models/product.ts";
import { DiscountFormSection } from "./DiscountFormSection";
import { editingProductAtom } from "../../store/products/atom.ts";
import {
  handleUpdateEditingFieldAtom,
  handleCancelEditAtom,
  handleRemoveDiscountAtom,
  handleSaveProductAtom,
} from "../../store/products/actions.ts";

export const ProductEditForm = () => {
  const editingProduct = useAtomValue(editingProductAtom);
  const handleUpdateEditingField = useSetAtom(handleUpdateEditingFieldAtom);
  const handleCancelEdit = useSetAtom(handleCancelEditAtom);
  const handleRemoveDiscount = useSetAtom(handleRemoveDiscountAtom);
  const handleSaveProduct = useSetAtom(handleSaveProductAtom);

  if (!editingProduct) return null;

  return (
    <div>
      <div className="mb-4">
        <label className="block mb-1">상품명: </label>
        <input
          type="text"
          value={editingProduct.name}
          onChange={(e) =>
            handleUpdateEditingField({
              field: "name",
              value: e.target.value,
            })
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">가격: </label>
        <input
          type="number"
          value={editingProduct.price}
          onChange={(e) =>
            handleUpdateEditingField({
              field: "price",
              value: parseInt(e.target.value),
            })
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
            handleUpdateEditingField({
              field: "stock",
              value: parseInt(e.target.value),
            })
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
        <DiscountFormSection />
      </div>

      <div className="mt-2 space-x-2">
        <button
          onClick={() => handleSaveProduct()}
          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
        >
          수정 완료
        </button>
        <button
          onClick={() => handleCancelEdit()}
          className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
        >
          취소
        </button>
      </div>
    </div>
  );
};
