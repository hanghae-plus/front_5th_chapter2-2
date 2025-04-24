import { useState } from "react";
import { Product } from "../../../types";


export const useEditProductForm = () => {
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);


    const editProduct = (product: Product) => {
        setEditingProduct({...product});
    };

    const updateProductName = (productId: string, newName: string) => {
        if (editingProduct && editingProduct.id === productId) {
        const updatedProduct = { ...editingProduct, name: newName };
        setEditingProduct(updatedProduct);
        }
    };

    const updateProductPrice = (productId: string, newPrice: number) => {
        if (editingProduct && editingProduct.id === productId) {
        const updatedProduct = { ...editingProduct, price: newPrice };
        setEditingProduct(updatedProduct);
        }
    };


    const editComplete = ( onProductUpdate: (updatedProduct: Product) => void ) => {
        if (editingProduct) {
          onProductUpdate(editingProduct);
          setEditingProduct(null);
        }
    };


    const updateStock = ( 
        productId: string, 
        newStock: number,
        products: Product[],
        onProductUpdate: (updatedProduct: Product) => void,
        ) => {
        const updatedProduct = products.find(p => p.id === productId);

        if (updatedProduct) {
          const newProduct = { ...updatedProduct, stock: newStock };

          onProductUpdate(newProduct);
          setEditingProduct(newProduct);
        }
    };


    return{
        editingProduct,
        setEditingProduct,
        editProduct,
        updateProductName,
        updateProductPrice,
        editComplete,
        updateStock,
    }
}
