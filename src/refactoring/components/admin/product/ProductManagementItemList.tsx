import { ProductManagementItem } from "./ProductManagementItem";
import { Product } from "../../../../types";
import { useProductManagement } from "../../../contexts/ProductManagementContext";

interface ProductManagementItemListProps {
  products: Product[];
}

export const ProductManagementItemList = ({
  products,
}: ProductManagementItemListProps) => {
  const {
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
  } = useProductManagement();
  return (
    <div className="space-y-2">
      {products.map((product, index) => (
        <ProductManagementItem
          key={product.id}
          product={product}
          index={index}
          isOpen={isOpen}
          toggle={toggle}
          editingProduct={editingProduct}
          handleFieldUpdate={handleFieldUpdate}
          handleDiscountRemove={handleDiscountRemove}
          handleDiscountAdd={handleDiscountAdd}
          newDiscount={newDiscount}
          setNewDiscount={setNewDiscount}
          handleEditComplete={handleEditComplete}
          handleEditProduct={handleEditProduct}
        />
      ))}
    </div>
  );
};
