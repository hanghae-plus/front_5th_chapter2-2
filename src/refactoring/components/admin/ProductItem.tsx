import { useAtomValue, useSetAtom } from "jotai";
import { Product } from "../../../types.ts";
import {
  editingProductAtom,
  openProductIdsAtom,
} from "../../store/products/atom.ts";
import { ProductEditForm } from "./ProductEditForm.tsx";
import { ProductDetails } from "./ProductDetail.tsx";
import { toggleProductAccordionAtom } from "../../store/products/actions.ts";

interface ProductItemProps {
  product: Product;
  index: number;
}

export const ProductItem = ({ product, index }: ProductItemProps) => {
  const editingProduct = useAtomValue(editingProductAtom);
  const openProductIds = useAtomValue(openProductIdsAtom);
  const toggleProductAccordion = useSetAtom(toggleProductAccordionAtom);

  const isEditing = editingProduct?.id === product.id;

  return (
    <div
      data-testid={`product-${index + 1}`}
      className="bg-white p-4 rounded shadow"
    >
      <button
        data-testid="toggle-button"
        onClick={() => toggleProductAccordion}
        className="w-full text-left font-semibold"
      >
        {product.name} - {product.price}원 (재고: {product.stock})
      </button>

      {openProductIds && (
        <div className="mt-2">
          {isEditing ? (
            <ProductEditForm />
          ) : (
            <ProductDetails product={product} />
          )}
        </div>
      )}
    </div>
  );
};
