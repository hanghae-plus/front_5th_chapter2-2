import React from "react";
import { Product, CartItem } from "../../../../types";
import ProductCard from "./ProductCard";

interface ProductProps {
    products: Product[];
    cart: CartItem[];
    onAddToCart: (product: Product) => void;
}

const ProductList = ({ products, cart, onAddToCart }: ProductProps) => {
    return (
        <>
            <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
            <div className="space-y-2">
                {products.map((product) => {
                    return (
                        <ProductCard
                            product={product}
                            cart={cart}
                            onAddToCart={onAddToCart}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default ProductList;
