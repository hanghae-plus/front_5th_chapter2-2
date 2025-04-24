import { Discount, Product } from "../../../../types";

interface DiscountManagerProps {
  editingProduct: Product;
  newDiscount: Discount;
  handleRemoveDiscount: (product: Product, index: number) => Product;
  handleDiscountChange: (field: "quantity" | "rate", value: number) => void;
  handleAddDiscount: (product: Product) => Product;
  setEditingProduct: (product: Product) => void;
}

const DiscountManager = ({
  editingProduct,
  newDiscount,
  handleRemoveDiscount,
  handleDiscountChange,
  handleAddDiscount,
  setEditingProduct,
}: DiscountManagerProps) => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
      {editingProduct.discounts.map((discount, index) => (
        <div key={index} className="flex justify-between items-center mb-2">
          <span>
            {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
          </span>
          <button
            onClick={() => {
              const updated = handleRemoveDiscount(editingProduct, index);
              setEditingProduct(updated);
            }}
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
            handleDiscountChange("quantity", parseInt(e.target.value))
          }
          className="w-1/3 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="할인율 (%)"
          value={newDiscount.rate * 100}
          onChange={(e) =>
            handleDiscountChange("rate", parseInt(e.target.value))
          }
          className="w-1/3 p-2 border rounded"
        />
        <button
          onClick={() => {
            if (editingProduct) {
              const updated = handleAddDiscount(editingProduct);
              setEditingProduct(updated);
            }
          }}
          className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          할인 추가
        </button>
      </div>
    </div>
  );
};

export default DiscountManager;
