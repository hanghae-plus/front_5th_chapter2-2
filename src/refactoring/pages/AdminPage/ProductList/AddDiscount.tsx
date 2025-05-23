import { useProductContext } from "@/refactoring/provider";
import { Discount, Product } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  product: Product;
  editingProduct: Product;
  setEditingProduct: Dispatch<SetStateAction<Product | null>>;
};

const initialNewDiscount: Discount = {
  quantity: 0,
  rate: 0,
};

export const AddDiscount = ({ product, editingProduct, setEditingProduct }: Props) => {
  const { products, updateProduct: onProductUpdate } = useProductContext();
  const [newDiscount, setNewDiscount] = useState<Discount>(initialNewDiscount);

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

  const handleAddDiscount = (productId: string) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct && editingProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: [...updatedProduct.discounts, newDiscount],
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
      setNewDiscount(initialNewDiscount);
    }
  };

  return (
    <div>
      <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
      {editingProduct.discounts.map((discount, index) => (
        <div key={index} className="flex justify-between items-center mb-2">
          <span>
            {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
          </span>
          <button
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
          onChange={(e) => setNewDiscount({ ...newDiscount, quantity: parseInt(e.target.value) })}
          className="w-1/3 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="할인율 (%)"
          value={newDiscount.rate * 100}
          onChange={(e) => setNewDiscount({ ...newDiscount, rate: parseInt(e.target.value) / 100 })}
          className="w-1/3 p-2 border rounded"
        />
        <button
          onClick={() => handleAddDiscount(product.id)}
          className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          할인 추가
        </button>
      </div>
    </div>
  );
};
