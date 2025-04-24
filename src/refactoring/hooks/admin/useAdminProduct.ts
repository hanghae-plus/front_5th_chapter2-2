import { useState } from "react";
import { Product, Discount } from "../../../types";

interface Props {
  onProductUpdate: (updatedProduct: Product) => void;
}

export const useAdminProduct = ({ onProductUpdate }: Props) => {
  const [isOpenProductAccordion, setIsOpenProductAccordion] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newDiscount, setNewDiscount] = useState<Discount>({ quantity: 0, rate: 0 });

  const handleToggleAccordion = () => {
    setIsOpenProductAccordion(prev => !prev);
  };

  const handleInitiateProductEdit = (product: Product) => {
    setEditingProduct({...product});
  };

  const handleProductNameUpdate = (newName: string) => {
    setEditingProduct(prev => prev ? {...prev, name: newName} : null);
  };

  const handlePriceUpdate = (newPrice: number) => {
    setEditingProduct(prev => prev ? {...prev, price: newPrice} : null);
  };

  const handleCompleteProductEdit = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  const handleStockUpdate = (newStock: number) => {
    if (editingProduct) {
      const newProduct = { ...editingProduct, stock: newStock };
      setEditingProduct(newProduct);
      onProductUpdate(newProduct);
    }
  };

  const handleAddDiscount = () => {
    if (editingProduct) {
      const newProduct = {
        ...editingProduct,
        discounts: [...editingProduct.discounts, newDiscount]
      };
      setEditingProduct(newProduct);
      onProductUpdate(newProduct);
      setNewDiscount({ quantity: 0, rate: 0 });
    }
  };

  const handleRemoveDiscount = (index: number) => {
    if (editingProduct) {
      const newProduct = {
        ...editingProduct,
        discounts: editingProduct.discounts.filter((_, i) => i !== index)
      };
      setEditingProduct(newProduct);
      onProductUpdate(newProduct);
    }
  };

  return {
    isOpenProductAccordion,
    editingProduct,
    newDiscount,
    setNewDiscount,
    handleToggleAccordion,
    handleInitiateProductEdit,
    handleProductNameUpdate,
    handlePriceUpdate,
    handleStockUpdate,
    handleRemoveDiscount,
    handleAddDiscount,
    handleCompleteProductEdit,
  }
};
