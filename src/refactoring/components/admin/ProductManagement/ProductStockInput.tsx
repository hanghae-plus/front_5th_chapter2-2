// src/refactoring/components/admin/ProductManagement/ProductStockInput.tsx
import React from "react";

interface ProductStockInputProps {
    productId: string;
    stock: number;
    onStockUpdate: (productId: string, newStock: number) => void;
}

const ProductStockInput: React.FC<ProductStockInputProps> = ({
    productId,
    stock,
    onStockUpdate,
}) => {
    return (
        <div className="mb-4">
            <label className="block mb-1">재고: </label>
            <input
                type="number"
                value={stock}
                onChange={(e) =>
                    onStockUpdate(productId, parseInt(e.target.value))
                }
                className="w-full p-2 border rounded"
            />
        </div>
    );
};

export default ProductStockInput;
