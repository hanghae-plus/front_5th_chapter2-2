import { useState } from "react";
import { Product } from "../../types";

interface useNewProductProps {
    onProductAdd: (newProduct: Product) => void;
}

export const useNewProduct = ({onProductAdd}: useNewProductProps) => {
    const [showNewProductForm, setShowNewProductForm] = useState(false);
    const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
        name: "",
        price: 0,
        stock: 0,
        discounts: [],
      });

      const createNewProduct = (productData: Omit<Product, "id">, id: string): Product => {
        return { ...productData, id };
      };

      const handleAddNewProduct = () => {
        const id = Date.now().toString();
        const productWithId = createNewProduct(newProduct, id);
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
        showNewProductForm,
        setShowNewProductForm,
        newProduct,
        setNewProduct,
        handleAddNewProduct,
      };
}