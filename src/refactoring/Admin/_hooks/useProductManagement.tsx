import { Product } from '../../../types';
import useProductAccordion from './useProductAccordion';
import useDiscountManagement from './useDiscountManagement';
import useProductEditing from './useProductEditing';

interface UseProductManagementProps {
  //   products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
}
const useProductManagement = ({ onProductUpdate }: UseProductManagementProps) => {
  const { openProductIds, toggleProductAccordion } = useProductAccordion();
  const {
    editingProduct,
    handleEditComplete,
    handleEditProduct,
    handlePropertyUpdate,
    setEditingProduct,
  } = useProductEditing({ onProductUpdate });
  const { handleAddDiscount, handleRemoveDiscount, newDiscount, setNewDiscount } =
    useDiscountManagement({ editingProduct, setEditingProduct });

  return {
    openProductIds,
    toggleProductAccordion,
    editingProduct,
    handleEditProduct,
    handleProductNameUpdate: (productId: string, value: string) =>
      handlePropertyUpdate(productId, 'name', value),
    handlePriceUpdate: (productId: string, value: number) =>
      handlePropertyUpdate(productId, 'price', value),
    handleStockUpdate: (productId: string, value: number) =>
      handlePropertyUpdate(productId, 'stock', value),
    handleAddDiscount,
    handleRemoveDiscount,
    handleEditComplete,
    newDiscount,
    setNewDiscount,
  };
};

export default useProductManagement;
