import { useState } from "react";
import { useProducts } from "#src/refactoring/hooks";
import ProductForm from "./ProductForm";
import Product from "./Product";

const ProductManagement: React.FC = () => {
  const { products } = useProducts();

  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const toggleNewProductForm = () => {
    setShowNewProductForm((prev) => !prev);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <button
        onClick={toggleNewProductForm}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? "취소" : "새 상품 추가"}
      </button>
      {showNewProductForm && <ProductForm toggleNewProductForm={toggleNewProductForm} />}
      <ul className="space-y-2">
        {products.map((product, index) => (
          <Product key={product.id} data-testid={`product-${index + 1}`} product={product} />
        ))}
      </ul>
    </div>
  );
};

export default ProductManagement;
