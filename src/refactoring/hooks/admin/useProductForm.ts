import { useState } from "react";
import type { Product } from "../../types";
import { useSetAtom } from "jotai";
import { addProductAtom } from "../../state";

interface UseProductFormProps {
  setShowNewProductForm: (show: boolean) => void;
}

export const useProductForm = ({
  setShowNewProductForm,
}: UseProductFormProps) => {
  const onProductAdd = useSetAtom(addProductAtom);

  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    stock: 0,
    discounts: [],
  });

  const handleAddNewProduct = () => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    onProductAdd(productWithId);
    setNewProduct({
      name: "",
      price: 0,
      stock: 0,
      discounts: [],
    });
    setShowNewProductForm(false);
  };

  return {
    newProduct,
    setNewProduct,
    handleAddNewProduct,
  };
};
