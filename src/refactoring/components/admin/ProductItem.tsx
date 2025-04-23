import { useAtomValue } from "jotai";
import { Product } from "../../../types.ts";
import { editingProductAtom } from "../../store/products/atom.ts";
import { ProductEditForm } from "./ProductEditForm.tsx";
import { ProductDetails } from "./ProductDetail.tsx";

interface ProductItemProps {
  product: Product;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

export const ProductItem = ({
  product,
  index,
  isOpen,
  onToggle,
}: ProductItemProps) => {
  const editingProduct = useAtomValue(editingProductAtom);

  const isEditing = editingProduct?.id === product.id;

  return (
    <div
      data-testid={`product-${index + 1}`}
      className="bg-white p-4 rounded shadow"
    >
      <button
        data-testid="toggle-button"
        onClick={onToggle}
        className="w-full text-left font-semibold"
      >
        {product.name} - {product.price}원 (재고: {product.stock})
      </button>

      {isOpen && (
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
