import { useState } from "react";

import { useProducts } from "../../../4_features/product/hooks";
import { ProductManagementPanelProps } from "../types";
import { NewProductForm } from "./new-product-form";
import { ProductFormData } from "../../../6_shared/types";
import { ProductList } from "./product-list";

export const ProductManagementPanel = ({
  title = "상품 관리",
}: ProductManagementPanelProps) => {
  const { addProduct } = useProducts();
  const [showNewProductForm, setShowNewProductForm] = useState(false);

  const handleSubmit = (newProduct: ProductFormData) => {
    addProduct(newProduct);
    setShowNewProductForm(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <button
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? "취소" : "새 상품 추가"}
      </button>

      {showNewProductForm && <NewProductForm onSubmit={handleSubmit} />}

      <ProductList />
    </div>
  );
};
