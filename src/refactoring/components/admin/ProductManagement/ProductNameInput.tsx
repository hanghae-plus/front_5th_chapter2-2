import React from "react";

interface ProductNameInputProps {
    productId: string;
    productName: string;
    onNameUpdate: (productId: string, newName: string) => void;
}

// 상품명 input
const ProductNameInput = ({
    productId,
    productName,
    onNameUpdate,
}: ProductNameInputProps) => {
    return (
        <div className="mb-4">
            <label className="block mb-1">상품명: </label>
            <input
                type="text"
                value={productName}
                onChange={(e) => onNameUpdate(productId, e.target.value)}
                className="w-full p-2 border rounded"
            />
        </div>
    );
};

export default ProductNameInput;
