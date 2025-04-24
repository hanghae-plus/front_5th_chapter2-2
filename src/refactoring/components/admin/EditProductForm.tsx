import { Discount, Product } from "../../../types.ts";
import { useState } from "react";

export default function EditProductForm({
  product,
  onProductUpdate,
}: {
  product: Product;
  onProductUpdate: (product: Product) => void;
}) {
  const [editingProduct, setEditingProduct] = useState<Product>(product);

  const [newDiscount, setNewDiscount] = useState<Discount>({
    quantity: 0,
    rate: 0,
  });

  const handleProductInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleProductDiscountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setNewDiscount((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : Number(value) / 100,
    }));
  };

  const handleAddDiscount = () => {
    setEditingProduct((prev) => ({
      ...prev,
      discounts: [...prev.discounts, newDiscount],
    }));
  };

  const handleDeleteDiscount = (index: number) => {
    setEditingProduct((prev) => ({
      ...prev,
      discounts: prev.discounts.filter((_, i) => i !== index),
    }));
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block mb-1">상품명: </label>
        <input
          type="text"
          name={"name"}
          value={editingProduct.name}
          onChange={handleProductInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">가격: </label>
        <input
          type="number"
          name={"price"}
          value={editingProduct.price}
          onChange={handleProductInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">재고: </label>
        <input
          type="number"
          name={"stock"}
          value={editingProduct.stock}
          onChange={handleProductInputChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* 할인 정보 수정 부분 */}
      <div>
        <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
        {editingProduct.discounts.map((discount, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <span>
              {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
            </span>
            <button
              onClick={() => handleDeleteDiscount(index)}
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
            name={"quantity"}
            value={newDiscount.quantity}
            onChange={handleProductDiscountChange}
            className="w-1/3 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="할인율 (%)"
            name={"rate"}
            value={newDiscount.rate * 100}
            onChange={handleProductDiscountChange}
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
      <button
        onClick={() => onProductUpdate(editingProduct)}
        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
      >
        수정 완료
      </button>
    </div>
  );
}
