import React from "react";

import { CartItem } from "../../types";
import CartItemCard from "./CartItemCard";

interface CartItemProps {
    items: CartItem[];
    onUpdateQuantity: (productId: string, newQuantity: number) => void;
    onRemove: (productId: string) => void;
}

const CartItemList = ({ items, onUpdateQuantity, onRemove }: CartItemProps) => {
    return (
        <>
            <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
            <div className="space-y-2">
                {items.map((item) => {
                    return (
                        <CartItemCard
                            item={item}
                            onUpdateQuantity={onUpdateQuantity}
                            onRemove={onRemove}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default CartItemList;
