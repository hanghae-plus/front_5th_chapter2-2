import { Product } from "../../../../types";

export const ProductNameHandler = (
    editingProduct: Product | null,
    setEditingProduct: React.Dispatch<React.SetStateAction<Product | null>>
) => {
    const handleProductNameUpdate = (productId: string, newName: string) => {
        if (editingProduct && editingProduct.id === productId) {
            const updatedProduct = { ...editingProduct, name: newName };
            setEditingProduct(updatedProduct);
        }
    };

    return { handleProductNameUpdate };
};
