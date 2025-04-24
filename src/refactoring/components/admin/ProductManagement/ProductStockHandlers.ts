// src/refactoring/components/admin/ProductManagement/productStockHandlers.ts
import { Product } from "../../../../types";

export const ProductStockHandler = (
    products: Product[],
    setEditingProduct: React.Dispatch<React.SetStateAction<Product | null>>,
    onProductUpdate: (updatedProduct: Product) => void
) => {
    const handleStockUpdate = (productId: string, newStock: number) => {
        const updatedProduct = products.find((p) => p.id === productId);
        if (updatedProduct) {
            const newProduct = { ...updatedProduct, stock: newStock };
            onProductUpdate(newProduct);
            setEditingProduct(newProduct);
        }
    };

    return { handleStockUpdate };
};
