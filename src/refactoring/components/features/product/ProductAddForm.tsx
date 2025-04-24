import { ChangeEvent, useState } from "react";
import { Product } from "../../../../types";
import { useProductContext } from "../../../contexts/ProductContext";
import { FormFieldInput } from "../../ui/common/FormFieldInput";

type ProductAddFormProps = {
  onSubmitComplete?: () => void;
};

export const ProductAddForm = ({ onSubmitComplete }: ProductAddFormProps) => {
  const { addProduct } = useProductContext();
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    stock: 0,
    discounts: [],
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parseValue =
      name === "price" || name === "stock" ? parseInt(value) || 0 : value;

    setNewProduct((prev) => ({
      ...prev,
      [name]: parseValue,
    }));
  };

  const handleAddNewProduct = () => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    addProduct(productWithId);
    setNewProduct({
      name: "",
      price: 0,
      stock: 0,
      discounts: [],
    });

    if (onSubmitComplete) {
      onSubmitComplete();
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
      <FormFieldInput
        id="productName"
        label="상품명"
        type="text"
        name="name"
        value={newProduct.name}
        onChange={handleInputChange}
      />
      <FormFieldInput
        id="productPrice"
        label="가격"
        type="number"
        name="price"
        value={newProduct.price}
        onChange={handleInputChange}
      />
      <FormFieldInput
        id="productStock"
        label="재고"
        type="number"
        name="stock"
        value={newProduct.stock}
        onChange={handleInputChange}
      />
      <button
        onClick={handleAddNewProduct}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        추가
      </button>
    </div>
  );
};
