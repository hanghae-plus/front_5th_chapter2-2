// EditProductContext.tsx
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Discount, Product } from '../../types';

type EditProductContextType = {
  editingProduct: Product | null;
  setEditingProduct: (product: Product | null) => void;
  newDiscount: Discount;
  setNewDiscount: (discount: Discount) => void;
  handleProductNameUpdate: (productId: string, newName: string) => void;
  handlePriceUpdate: (productId: string, newPrice: number) => void;
  handleStockUpdate: (productId: string, newStock: number) => void;
  handleAddDiscount: (productId: string) => void;
  handleRemoveDiscount: (productId: string, index: number) => void;
  handleEditProduct: (product: Product) => void;
  handleEditComplete: () => void;
};

const EditProductContext = createContext<EditProductContextType | undefined>(undefined);

export const EditProductProvider: React.FC<{
  products: Product[];
  onProductUpdate: (product: Product) => void;
  children: React.ReactNode;
}> = ({ products, onProductUpdate, children }) => {
  const [newDiscount, setNewDiscount] = useState<Discount>({ quantity: 0, rate: 0 });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleProductNameUpdate = useCallback(
    (productId: string, newName: string) => {
      if (editingProduct && editingProduct.id === productId) {
        setEditingProduct({ ...editingProduct, name: newName });
      }
    },
    [editingProduct]
  );

  const handlePriceUpdate = useCallback(
    (productId: string, newPrice: number) => {
      if (editingProduct && editingProduct.id === productId) {
        setEditingProduct({ ...editingProduct, price: newPrice });
      }
    },
    [editingProduct]
  );

  const handleStockUpdate = useCallback(
    (productId: string, newStock: number) => {
      const updated = products.find(p => p.id === productId);
      if (updated) {
        const newProduct = { ...updated, stock: newStock };
        onProductUpdate(newProduct);
        setEditingProduct(newProduct);
      }
    },
    [editingProduct]
  );

  const handleAddDiscount = useCallback(
    (productId: string) => {
      const updated = products.find(p => p.id === productId);
      if (updated && editingProduct) {
        const newProduct = {
          ...updated,
          discounts: [...updated.discounts, newDiscount]
        };
        onProductUpdate(newProduct);
        setEditingProduct(newProduct);
        setNewDiscount({ quantity: 0, rate: 0 });
      }
    },
    [editingProduct, newDiscount]
  );

  const handleRemoveDiscount = useCallback(
    (productId: string, index: number) => {
      const updated = products.find(p => p.id === productId);
      if (updated) {
        const newProduct = {
          ...updated,
          discounts: updated.discounts.filter((_, i) => i !== index)
        };
        onProductUpdate(newProduct);
        setEditingProduct(newProduct);
      }
    },
    [editingProduct]
  );

  const handleEditProduct = useCallback((product: Product) => {
    setEditingProduct(product);
  }, []);

  const handleEditComplete = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  return (
    <EditProductContext.Provider
      value={useMemo(
        () => ({
          editingProduct,
          setEditingProduct,
          newDiscount,
          setNewDiscount,
          handleProductNameUpdate,
          handlePriceUpdate,
          handleStockUpdate,
          handleAddDiscount,
          handleRemoveDiscount,
          handleEditProduct,
          handleEditComplete
        }),
        [editingProduct, newDiscount]
      )}
    >
      {children}
    </EditProductContext.Provider>
  );
};

export const useEditProductContext = () => {
  const context = useContext(EditProductContext);
  if (!context) {
    throw new Error('useEditProductContext must be used within an EditProductProvider');
  }
  return context;
};
