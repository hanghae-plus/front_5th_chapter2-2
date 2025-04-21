import { useState } from "react";
import type { Discount, Product } from "../../../types";

interface UpdateProductFormProps {
  products: Product[];
  product: Product;
  onProductUpdate: (updatedProduct: Product) => void;
  editingProduct: Product | null;
  setEditingProduct: (product: Product | null) => void;
}

export const UpdateProductForm = ({
  products,
  product,
  onProductUpdate,
  editingProduct,
  setEditingProduct,
}: UpdateProductFormProps) => {
  //   const [editingProduct, setEditingProduct] = useState<Product | null>(product);
  const [newDiscount, setNewDiscount] = useState<Discount>({
    quantity: 0,
    rate: 0,
  });

  // 수정 완료 핸들러 함수 추가
  const handleEditComplete = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  const handleProductNameUpdate = (productId: string, newName: string) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, name: newName };
      setEditingProduct(updatedProduct);
    }
  };

  const handleStockUpdate = (productId: string, newStock: number) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = { ...updatedProduct, stock: newStock };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  const handlePriceUpdate = (productId: string, newPrice: number) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, price: newPrice };
      setEditingProduct(updatedProduct);
    }
  };

  const handleAddDiscount = (productId: string) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct && editingProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: [...updatedProduct.discounts, newDiscount],
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
      setNewDiscount({ quantity: 0, rate: 0 });
    }
  };

  const handleRemoveDiscount = (productId: string, index: number) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: updatedProduct.discounts.filter((_, i) => i !== index),
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };
  return (
    <div>
      <div className="mb-4">
        {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
        <label className="block mb-1">상품명: </label>
        <input
          type="text"
          value={editingProduct?.name ?? ""}
          onChange={(e) =>
            editingProduct?.id &&
            handleProductNameUpdate(editingProduct.id, e.target.value)
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
        <label className="block mb-1">가격: </label>
        <input
          type="number"
          value={editingProduct?.price ?? ""}
          onChange={(e) =>
            handlePriceUpdate(product.id, Number.parseInt(e.target.value))
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
        <label className="block mb-1">재고: </label>
        <input
          type="number"
          value={editingProduct.stock}
          onChange={(e) =>
            handleStockUpdate(product.id, Number.parseInt(e.target.value))
          }
          className="w-full p-2 border rounded"
        />
      </div>
      {/* 할인 정보 수정 부분 */}
      <div>
        <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
        {editingProduct.discounts.map((discount, index) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            className="flex justify-between items-center mb-2"
          >
            <span>
              {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
            </span>
            <button
              type="button"
              onClick={() => handleRemoveDiscount(product.id, index)}
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
                quantity: Number.parseInt(e.target.value),
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
                rate: Number.parseInt(e.target.value) / 100,
              })
            }
            className="w-1/3 p-2 border rounded"
          />
          <button
            type="button"
            onClick={() => handleAddDiscount(product.id)}
            className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            할인 추가
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={handleEditComplete}
        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
      >
        수정 완료
      </button>
    </div>
  );
};
