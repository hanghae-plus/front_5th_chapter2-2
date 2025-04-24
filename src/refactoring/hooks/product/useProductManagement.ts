import { Product } from "../../../types";
import { useAccordion } from "../common/useAccordion";
import { useProductEdit } from "./useProductEdit";
import { useProductDiscount } from "./useProductDiscount";
import { useProductCreate } from "./useProductCreate";

interface UseProductManagementProps {
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
}

export const useProductManagement = ({
  onProductUpdate,
  onProductAdd,
}: UseProductManagementProps) => {
  const accordion = useAccordion<string>();
  const productEdit = useProductEdit({ onProductUpdate });
  const discount = useProductDiscount();
  const productCreate = useProductCreate({ onProductAdd });

  const handleDiscountAdd = (productId: string) => {
    if (productEdit.editingProduct?.id === productId) {
      const updatedProduct = discount.handleAddDiscount(
        productEdit.editingProduct
      );
      productEdit.handleFieldUpdate(
        productId,
        "discounts",
        updatedProduct.discounts
      );
      discount.setNewDiscount({ quantity: 0, rate: 0 });
    }
  };

  const handleDiscountRemove = (productId: string, index: number) => {
    if (productEdit.editingProduct?.id === productId) {
      const updatedProduct = discount.handleRemoveDiscount(
        productEdit.editingProduct,
        index
      );
      productEdit.handleFieldUpdate(
        productId,
        "discounts",
        updatedProduct.discounts
      );
    }
  };

  return {
    accordion,
    productEdit,
    discount: {
      ...discount,
      handleDiscountAdd,
      handleDiscountRemove,
    },
    productCreate,
  };
};
