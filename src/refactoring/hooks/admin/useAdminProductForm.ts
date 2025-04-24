import { useState } from "react";
import { Product } from "../../../types";
import { createDefaultProduct, createProductWithId, updateProduct } from "../../models/productForm";

interface Props {
  onProductAdd: (newProduct: Product) => void;
}

const initialProduct = createDefaultProduct();

export const useAdminProductForm = ({ onProductAdd }: Props) => {
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>(initialProduct);

  const handleAddNewProduct = () => {
    const productWithId = createProductWithId(newProduct);
    onProductAdd(productWithId);
    setNewProduct(initialProduct);
  };

  const handleChangeNewProduct = (key: keyof Omit<Product, 'id'>, value: Omit<Product, 'id'>[keyof Omit<Product, 'id'>]) => {
    setNewProduct(prev => updateProduct(prev, { key, value }));
  }

  return {
    newProduct,
    handleChangeNewProduct,
    handleAddNewProduct,
  }
}
