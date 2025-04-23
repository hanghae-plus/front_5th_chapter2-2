import { useAtomValue, useSetAtom } from "jotai";
import { showNewProductFormAtom } from "../../store/products/atom.ts";
import { toggleNewProductFormAtom } from "../../store/products/actions.ts";
import { ProductForm } from "./ProductForm.tsx";

export const NewProductSection = () => {
  const showNewProductForm = useAtomValue(showNewProductFormAtom);
  const toggleNewProductForm = useSetAtom(toggleNewProductFormAtom);

  return (
    <>
      <button
        onClick={() => toggleNewProductForm()}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? "취소" : "새 상품 추가"}
      </button>

      {showNewProductForm && <ProductForm />}
    </>
  );
};
