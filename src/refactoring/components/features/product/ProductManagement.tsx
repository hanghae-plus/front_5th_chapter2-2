import { useState } from "react";
import { ProductForm } from "./ProductForm";
import { ProductEditForm } from "./ProductEditForm";

export const ProductManagement = () => {
  const [showNewProductForm, setShowNewProductForm] = useState(false);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <button
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? "취소" : "새 상품 추가"}
      </button>
      {showNewProductForm && (
        <ProductForm onSubmitComplete={() => setShowNewProductForm(false)} />
      )}
      <ProductEditForm />
    </div>
  );
};
