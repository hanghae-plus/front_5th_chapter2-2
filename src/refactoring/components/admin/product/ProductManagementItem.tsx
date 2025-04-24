import { Product, Discount } from "../../../../types";
import { ProductManagementItemEdit } from "./ProductManagementItemEdit";
import { ProductManagementItemView } from "./ProductManagementItemView";
import { Button } from "../../common";

interface ProductManagementItemProps {
  product: Product;
  index: number;
  isOpen: (productId: string) => boolean;
  toggle: (productId: string) => void;
  editingProduct: Product | null;
  handleFieldUpdate: <K extends keyof Product>(
    productId: string,
    field: K,
    value: Product[K]
  ) => void;
  handleDiscountRemove: (productId: string, index: number) => void;
  handleDiscountAdd: (productId: string) => void;
  newDiscount: Discount;
  setNewDiscount: (discount: Discount) => void;
  handleEditComplete: () => void;
  handleEditProduct: (product: Product) => void;
}

export const ProductManagementItem = ({
  product,
  index,
  isOpen,
  toggle,
  editingProduct,
  handleFieldUpdate,
  handleDiscountRemove,
  handleDiscountAdd,
  newDiscount,
  setNewDiscount,
  handleEditComplete,
  handleEditProduct,
}: ProductManagementItemProps) => {
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
            <ProductManagementItemEdit
              editingProduct={editingProduct}
              handleFieldUpdate={handleFieldUpdate}
              product={product}
              handleDiscountRemove={handleDiscountRemove}
              handleDiscountAdd={handleDiscountAdd}
              newDiscount={newDiscount}
              setNewDiscount={setNewDiscount}
              handleEditComplete={handleEditComplete}
            />
          ) : (
            <ProductManagementItemView
              product={product}
              handleEditProduct={handleEditProduct}
            />
          )}
        </div>
      )}
    </div>
  );
};
