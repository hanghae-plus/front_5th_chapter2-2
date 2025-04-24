// src/refactoring/components/admin/ProductManagement/productPriceHandlers.ts
import { Product } from "../../../../types";

export const ProductPriceHandler = (
    editingProduct: Product | null,
    setEditingProduct: React.Dispatch<React.SetStateAction<Product | null>>
) => {
    const handlePriceUpdate = (productId: string, newPrice: number) => {
        if (editingProduct && editingProduct.id === productId) {
            const updatedProduct = { ...editingProduct, price: newPrice };
            setEditingProduct(updatedProduct);
        }
    };

    return { handlePriceUpdate };
};
