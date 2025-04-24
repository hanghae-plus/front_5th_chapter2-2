import { Product } from "../../../../types";
import { ProductManagementItemEdit } from "./ProductManagementItemEdit";
import { ProductManagementItemView } from "./ProductManagementItemView";
import { Button } from "../../common";
import { useProductManagement } from "../../../contexts/ProductManagementContext";

interface ProductManagementItemProps {
  product: Product;
  index: number;
}

export const ProductManagementItem = ({
  product,
  index,
}: ProductManagementItemProps) => {
  const { isOpen, toggle, editingProduct } = useProductManagement();

  return (
    <div
      key={product.id}
      data-testid={`product-${index + 1}`}
      className="bg-white p-4 rounded shadow"
    >
      <Button
        data-testid="toggle-button"
        width="full"
        text="left-semibold"
        onClick={() => toggle(product.id)}
      >
        {product.name} - {product.price}원 (재고: {product.stock})
      </Button>
      {isOpen(product.id) && (
        <div className="mt-2">
          {editingProduct && editingProduct.id === product.id ? (
            <ProductManagementItemEdit product={product} />
          ) : (
            <ProductManagementItemView product={product} />
          )}
        </div>
      )}
    </div>
  );
};
