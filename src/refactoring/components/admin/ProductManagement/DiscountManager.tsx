import React from "react";
import { Discount, Product } from "../../../../types";
import AddDiscountForm from "./AddDiscountForm";

interface DiscountManagerProps {
    product: Product;
    editingProduct: Product | null;
    newDiscount: Discount;
    setNewDiscount: React.Dispatch<React.SetStateAction<Discount>>;
    onAddDiscount: (productId: string) => void;
    onRemoveDiscount: (productId: string, index: number) => void;
}

const DiscountManager = ({
    product,
    editingProduct,
    newDiscount,
    setNewDiscount,
    onAddDiscount,
    onRemoveDiscount,
}: DiscountManagerProps) => {
    // 현재 편집 중인 상품의 할인 정보만 표시
    const discounts =
        editingProduct?.id === product.id
            ? editingProduct.discounts
            : product.discounts;

    return (
        <div>
            <h4 className="text-lg font-semibold mb-2">할인 정보</h4>

            {/* 할인 목록 */}
            {discounts.map((discount, index) => (
                <div
                    key={index}
                    className="flex justify-between items-center mb-2"
                >
                    <span>
                        {discount.quantity}개 이상 구매 시 {discount.rate * 100}
                        % 할인
                    </span>
                    <button
                        onClick={() => onRemoveDiscount(product.id, index)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                        삭제
                    </button>
                </div>
            ))}

            {/* 할인 추가 폼 */}
            <AddDiscountForm
                productId={product.id}
                newDiscount={newDiscount}
                setNewDiscount={setNewDiscount}
                onAddDiscount={onAddDiscount}
            />
        </div>
    );
};

export default DiscountManager;
