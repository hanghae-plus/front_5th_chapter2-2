import { useState } from "react";
import { Discount, Product } from "../../types";

interface handleProps {
  products: Product[];
  productId: string;
  editingProduct: Product | null;
  onProductUpdate: (updatedProduct: Product) => void;
  setEditingProduct: React.Dispatch<React.SetStateAction<Product | null>>;
}

export const useDiscount = () => {
  const [newDiscount, setNewDiscount] = useState<Discount>({
    quantity: 0,
    rate: 0,
  });

  /** 할인을 추가합니다. */
  const handleAddDiscount = ({
    products,
    productId,
    editingProduct,
    onProductUpdate,
    setEditingProduct,
  }: handleProps) => {
    const updatedProduct = products.find((p) => p.id === productId);

    if (updatedProduct && editingProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: [...updatedProduct.discounts, newDiscount],
      };

      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
      setNewDiscount({ quantity: 0, rate: 0 });
    }
  };

  return { newDiscount, setNewDiscount, handleAddDiscount };
};
