import React, { useState } from "react";

import { useProductContext } from "@r/model/product/product-context";
import { Product } from "@r/model/product/types";
import { useForm } from "@r/hooks/use-form";
import { Input } from "@r/shared/ui/input";

interface AddNewProductProps {}

type ProductBody = Omit<Product, "id">;

const initialProductBody: Omit<Product, "id"> = {
  name: "",
  price: 0,
  stock: 0,
  discounts: [],
};

export const AddNewProduct: React.FC<AddNewProductProps> = () => {
  const { addProduct } = useProductContext();

  const [showNewProductForm, setShowNewProductForm] = useState(false);

  const { formValues, handleFormChange, handleFormReset } =
    useForm<ProductBody>(initialProductBody);

  const handleAddNewProduct = () => {
    const productId = Date.now().toString();
    addProduct({ ...formValues, id: productId });
    handleFormReset();
  };

  return (
    <>
      <button
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? "취소" : "새 상품 추가"}
      </button>
      {showNewProductForm && (
        <div className="bg-white p-4 rounded shadow mb-4">
          <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
          <div className="mb-2">
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700"
            >
              상품명
            </label>
            <Input
              id="productName"
              value={formValues.name}
              name="name"
              onChange={handleFormChange}
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
            <Input
              id="productPrice"
              type="number"
              value={formValues.price}
              name="price"
              onChange={handleFormChange}
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
            <Input
              id="productStock"
              type="number"
              value={formValues.stock}
              name="stock"
              onChange={handleFormChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            onClick={() => {
              handleAddNewProduct();
              setShowNewProductForm(false);
            }}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            추가
          </button>
        </div>
      )}
    </>
  );
};
