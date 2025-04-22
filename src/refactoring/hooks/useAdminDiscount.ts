import { useState, useCallback } from 'react';
import { Discount, Product } from '../../types';

interface UseAdminDiscountParams {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
  onUpdateEditingProduct: (updatedProduct: Product) => void;
}

export const useAdminDiscount = ({
  products,
  onProductUpdate,
  onUpdateEditingProduct,
}: UseAdminDiscountParams) => {
  const [newDiscount, setNewDiscount] = useState<Discount>({ quantity: 0, rate: 0 });

  const addDiscount = useCallback(
    (productId: string) => {
      const updatedProduct = products.find((p) => p.id === productId);

      if (!updatedProduct) return;

      const newProduct = {
        ...updatedProduct,
        discounts: [...updatedProduct.discounts, newDiscount],
      };

      onProductUpdate(newProduct);
      onUpdateEditingProduct(newProduct);

      setNewDiscount({ quantity: 0, rate: 0 });
    },
    [products, newDiscount, onProductUpdate, onUpdateEditingProduct],
  );

  const removeDiscount = useCallback(
    (productId: string, index: number) => {
      const updatedProduct = products.find((p) => p.id === productId);

      if (!updatedProduct) return;

      const newProduct = {
        ...updatedProduct,
        discounts: updatedProduct.discounts.filter((_, i) => i !== index),
      };

      onProductUpdate(newProduct);
      onUpdateEditingProduct(newProduct);
    },
    [products, onProductUpdate, onUpdateEditingProduct],
  );

  const updateDiscount = useCallback(
    ({ e, isRate }: { e: React.ChangeEvent<HTMLInputElement>; isRate: boolean }) => {
      const parsedValue = parseInt(e.target.value);

      if (isNaN(parsedValue)) {
        return;
      }

      if (isRate) {
        setNewDiscount((prev) => ({ ...prev, rate: parsedValue / 100 }));

        return;
      }

      setNewDiscount((prev) => ({ ...prev, quantity: parsedValue }));
    },
    [],
  );

  return {
    newDiscount,
    addDiscount,
    removeDiscount,
    updateDiscount,
  };
};
