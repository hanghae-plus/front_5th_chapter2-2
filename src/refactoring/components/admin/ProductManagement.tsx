import { useAtom } from "jotai";
import { showNewProductFormAtom } from "../../store/products/atom.ts";
import { ProductList } from "./ProductList.tsx";
import { NewProductSection } from "./NewProductSection.tsx";

export const ProductManagement = () => {
  const [showNewProductForm] = useAtom(showNewProductFormAtom);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <NewProductSection />
      {!showNewProductForm && <ProductList />}
    </div>
  );
};
