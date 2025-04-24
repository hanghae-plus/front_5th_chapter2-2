// src/refactoring/contexts/ProductManagementContext.tsx
import { createContext, useContext, ReactNode } from "react";
import { Product } from "../../types";
import { useAccordion } from "../hooks/common/useAccordion";
import { useProductEdit } from "../hooks/product/useProductEdit";
import { useProductDiscount } from "../hooks/product/useProductDiscount";
import { useProductCreate } from "../hooks/product/useProductCreate";

interface ProductManagementContextValue {
  // Accordion 관련
  isOpen: (id: string) => boolean;
  toggle: (id: string) => void;

  // Product Edit 관련
  editingProduct: Product | null;
  handleEditProduct: (product: Product) => void;
  handleEditComplete: () => void;
  handleFieldUpdate: <K extends keyof Product>(
    productId: string,
    field: K,
    value: Product[K]
  ) => void;

  // Discount 관련
  newDiscount: {
    quantity: number;
    rate: number;
  };
  setNewDiscount: (discount: { quantity: number; rate: number }) => void;
  handleDiscountAdd: (productId: string) => void;
  handleDiscountRemove: (productId: string, index: number) => void;

  // Product Create 관련
  showNewProductForm: boolean;
  setShowNewProductForm: (show: boolean) => void;
  newProduct: Omit<Product, "id">;
  setNewProduct: React.Dispatch<React.SetStateAction<Omit<Product, "id">>>;
  handleAddNewProduct: () => void;
}

interface ProductManagementProviderProps {
  children: ReactNode;
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
}

const ProductManagementContext =
  createContext<ProductManagementContextValue | null>(null);

export const ProductManagementProvider = ({
  children,
  onProductUpdate,
  onProductAdd,
}: ProductManagementProviderProps) => {
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

  const value: ProductManagementContextValue = {
    isOpen: accordion.isOpen,
    toggle: accordion.toggle,
    editingProduct: productEdit.editingProduct,
    handleEditProduct: productEdit.handleEditProduct,
    handleEditComplete: productEdit.handleEditComplete,
    handleFieldUpdate: productEdit.handleFieldUpdate,
    newDiscount: discount.newDiscount,
    setNewDiscount: discount.setNewDiscount,
    handleDiscountAdd,
    handleDiscountRemove,
    showNewProductForm: productCreate.showNewProductForm,
    setShowNewProductForm: productCreate.setShowNewProductForm,
    newProduct: productCreate.newProduct,
    setNewProduct: productCreate.setNewProduct,
    handleAddNewProduct: productCreate.handleAddNewProduct,
  };

  return (
    <ProductManagementContext.Provider value={value}>
      {children}
    </ProductManagementContext.Provider>
  );
};

export const useProductManagement = () => {
  const context = useContext(ProductManagementContext);
  if (!context) {
    throw new Error(
      "useProductManagement must be used within a ProductManagementProvider"
    );
  }
  return context;
};
