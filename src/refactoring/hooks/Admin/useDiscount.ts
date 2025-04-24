import { useState } from "react";
import { Discount, Product } from "../../../types";



export const useDiscount = () =>{
    const [newDiscount, setNewDiscount] = useState<Discount>({ quantity: 0, rate: 0 });

    const addDiscount = (
        productId: string,
        products: Product[],
        onProductUpdate: (updatedProduct: Product) => void,
        editingProduct: Product,
        setEditingProduct: (product: Product) => void
    ) => {

        const updatedProduct = products.find(p => p.id === productId);

        if (updatedProduct && editingProduct) {
          
            const newProduct = {
            ...updatedProduct,
            discounts: [...updatedProduct.discounts, newDiscount]
          };

          onProductUpdate(newProduct);
          setEditingProduct(newProduct);
          setNewDiscount({ quantity: 0, rate: 0 });
        }
    };


    const removeDiscount = (
        productId: string, 
        index: number,
        products: Product[],
        onProductUpdate: (updatedProduct: Product) => void,
        setEditingProduct: (product: Product) => void
    ) => {
        const updatedProduct = products.find(p => p.id === productId);
        
        if (updatedProduct) {
          const newProduct = {
            ...updatedProduct,
            discounts: updatedProduct.discounts.filter((_, i) => i !== index)
          };

          onProductUpdate(newProduct);
          setEditingProduct(newProduct);
        }
    };



    return{       
        newDiscount, 
        setNewDiscount, 
        addDiscount,
        removeDiscount,
    }
}