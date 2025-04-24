import { useForm } from "@r/hooks/use-form";
import { Discount } from "@r/model/discount/types";
import { useDiscounts } from "@r/model/discount/use-discounts";
import { useProductContext } from "@r/model/product/product-context";
import { Product } from "@r/model/product/types";
import { ViewToggle } from "@r/shared/ui/view-toggle";
import { useState } from "react";

interface Props {
  product: Product;
}

const initialDiscount = {
  quantity: 0,
  rate: 0,
};

export const ProductEditForm: React.FC<Props> = ({ product }) => {
  const { updateProduct } = useProductContext();
  const { handleFormChange, formValues, handleFormReset } =
    useForm<Product>(product);
  const { discounts, addDiscount, removeDiscount } = useDiscounts(
    product.discounts
  );

  const [newDiscount, setNewDiscount] = useState<Discount>(initialDiscount);

  // 수정완료 버튼 클릭시 폼을 닫고, 상품 업데이트
  const handleEditComplete = () => {
    updateProduct({ ...formValues, discounts });
    handleFormReset();
  };

  const handleAddDiscount = () => {
    addDiscount(newDiscount);
    setNewDiscount(initialDiscount);
  };

  const handleRemoveDiscount = (index: number) => {
    removeDiscount(index);
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block mb-1">상품명: </label>
        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleFormChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">가격: </label>
        <input
          type="number"
          value={formValues.price}
          name="price"
          onChange={handleFormChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">재고: </label>
        <input
          type="number"
          name="stock"
          value={formValues.stock}
          onChange={handleFormChange}
          className="w-full p-2 border rounded"
        />
      </div>
      {/* 할인 정보 수정 부분 */}
      <div>
        <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
        {discounts.map((discount, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <span>
              {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
            </span>
            <button
              onClick={() => handleRemoveDiscount(index)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              삭제
            </button>
          </div>
        ))}
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="수량"
            value={newDiscount.quantity}
            onChange={(e) =>
              setNewDiscount({
                ...newDiscount,
                quantity: parseInt(e.target.value),
              })
            }
            className="w-1/3 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="할인율 (%)"
            value={newDiscount.rate * 100}
            onChange={(e) =>
              setNewDiscount({
                ...newDiscount,
                rate: parseInt(e.target.value) / 100,
              })
            }
            className="w-1/3 p-2 border rounded"
          />
          <button
            onClick={handleAddDiscount}
            className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            할인 추가
          </button>
        </div>
      </div>
      <ViewToggle.Trigger
        handleClick={handleEditComplete}
        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
      >
        수정 완료
      </ViewToggle.Trigger>
    </div>
  );
};
