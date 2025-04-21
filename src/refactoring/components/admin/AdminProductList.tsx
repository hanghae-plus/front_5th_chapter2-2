import { useState } from "react";
import type { Product, Discount } from "../../types";
import { NewProductForm } from "./product/NewProductForm";
import { UpdateProductForm } from "./product/UpdateProductForm";
import { ProductToggleButton } from "./product/ProductToggleButton";
import { ProductList } from "./product/ProductList";

interface AdminProductListProps {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
}

export const AdminProductList = ({
  products,
  onProductUpdate,
  onProductAdd,
}: AdminProductListProps) => {
  const [showNewProductForm, setShowNewProductForm] = useState(false);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <button
        type="button"
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? "취소" : "새 상품 추가"}
      </button>
      {showNewProductForm && (
        <NewProductForm
          onProductAdd={onProductAdd}
          setShowNewProductForm={setShowNewProductForm}
        />
      )}
      <ProductList products={products} onProductUpdate={onProductUpdate} />
    </div>
  );
};
