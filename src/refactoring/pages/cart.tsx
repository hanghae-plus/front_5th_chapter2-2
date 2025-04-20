import { useState } from "react";

import { ProductList } from "../components/cart";
import type { Product, CouponItem, CartItem } from "../types";

interface CartPageProps {
  products: Product[];
  coupons: CouponItem[];
}

const CartPage = ({ products, coupons }: CartPageProps) => {
  console.log(products, coupons);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default CartPage;
