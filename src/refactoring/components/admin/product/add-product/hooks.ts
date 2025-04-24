import { useState } from "react";
import { Product } from "../../../../../types";

type Props = {
    onProductAdd: (newProduct: Product) => void;
}

export const useAddProduct = ({ onProductAdd }:Props) => {
        const [showNewProductForm, setShowNewProductForm] = useState(false);
        const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
            name: '',
            price: 0,
            stock: 0,
            discounts: []
        });
    
        const handleAddNewProduct = () => {
            const productWithId = { ...newProduct, id: Date.now().toString() };
            onProductAdd(productWithId);
            setNewProduct({
                name: '',
                price: 0,
                stock: 0,
                discounts: []
            });
            setShowNewProductForm(false);
        };

    return { handleAddNewProduct, showNewProductForm, setShowNewProductForm, newProduct, setNewProduct };
}