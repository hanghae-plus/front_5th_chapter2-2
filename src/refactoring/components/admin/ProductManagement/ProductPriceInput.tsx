// src/refactoring/components/admin/ProductManagement/ProductPriceInput.tsx
import React from "react";

interface ProductPriceInputProps {
    productId: string;
    price: number;
    onPriceUpdate: (productId: string, newPrice: number) => void;
}

const ProductPriceInput: React.FC<ProductPriceInputProps> = ({
    productId,
    price,
    onPriceUpdate,
}) => {
    return (
        <div className="mb-4">
            <label className="block mb-1">가격: </label>
            <input
                type="number"
                value={price}
                onChange={(e) =>
                    onPriceUpdate(productId, parseInt(e.target.value))
                }
                className="w-full p-2 border rounded"
            />
        </div>
    );
};

export default ProductPriceInput;
