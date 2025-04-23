import { useProductStore } from "../../../store/product-store";
import { Section } from "../../../ui/section";
import { NewProductForm } from "./new-product-form";
import { ProductList } from "./product-list";

export const ProductManageSection = () => {
  const { showNewProductForm, toggleNewProductForm } = useProductStore();

  return (
    <Section title="상품 관리">
      <button
        onClick={toggleNewProductForm}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? "취소" : "새 상품 추가"}
      </button>
      {showNewProductForm && <NewProductForm />}
      <ProductList />
    </Section>
  );
};
