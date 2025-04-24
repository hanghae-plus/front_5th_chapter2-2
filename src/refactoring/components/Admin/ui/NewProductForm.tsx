import React from "react";
import { Product } from "../../../../types";

interface NewProductFormProps {
  newProduct: Product;
  onFieldChange: (field: keyof Product, value: string | number) => void;
  onAddProduct: () => void;
}

const NewProductForm: React.FC<NewProductFormProps> = ({
  newProduct,
  onFieldChange,
  onAddProduct,
}) => {
  const currentNewProduct = newProduct || {
    id: "",
    name: "",
    price: 0,
    stock: 0,
    discounts: [],
  };

  return (
    <>
      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
        <div className="mb-2">
          <label
            htmlFor="productName"
            className="block text-sm font-medium text-gray-700"
          >
            상품명
          </label>
          <input
            id="productName"
            type="text"
            value={currentNewProduct.name}
            onChange={(e) => onFieldChange("name", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="productPrice"
            className="block text-sm font-medium text-gray-700"
          >
            가격
          </label>
          <input
            id="productPrice"
            type="number"
            value={currentNewProduct.price}
            onChange={(e) =>
              onFieldChange("price", parseInt(e.target.value) || 0)
            }
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="productStock"
            className="block text-sm font-medium text-gray-700"
          >
            재고
          </label>
          <input
            id="productStock"
            type="number"
            value={currentNewProduct.stock}
            onChange={(e) =>
              onFieldChange("stock", parseInt(e.target.value) || 0)
            }
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={onAddProduct}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          추가
        </button>
      </div>
    </>
  );
};

export default NewProductForm;
