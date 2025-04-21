import type { Product } from "../../../types";

interface ProductToggleButtonProps {
  product: Product;
  setOpenProductIds: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export const ProductToggleButton = ({
  product,
  setOpenProductIds,
}: ProductToggleButtonProps) => {
  const toggleProductAccordion = (productId: string) => {
    setOpenProductIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  return (
    <button
      type="button"
      data-testid="toggle-button"
      onClick={() => toggleProductAccordion(product.id)}
      className="w-full text-left font-semibold"
    >
      {product.name} - {product.price}원 (재고: {product.stock})
    </button>
  );
};
