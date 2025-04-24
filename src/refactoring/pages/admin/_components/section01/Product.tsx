import React, { useState } from "react";
import type { IProduct } from "#src/types";

import ProductView from "./ProductView";
import ProductEditForm from "./ProductEditForm";

interface IProps extends React.HTMLAttributes<HTMLLIElement> {
  product: IProduct;
}

const Product: React.FC<IProps> = ({ product, ...props }) => {
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());
  const toggleProductAccordion = (productId: string) => {
    setOpenProductIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

  // handleEditProduct 함수 수정
  const handleEditProduct = (product: IProduct) => {
    setEditingProduct({ ...product });
  };

  const isEditing = editingProduct && editingProduct.id === product.id;

  return (
    <li key={product.id} className="bg-white p-4 rounded shadow" {...props}>
      <button
        data-testid="toggle-button"
        onClick={() => toggleProductAccordion(product.id)}
        className="w-full text-left font-semibold"
      >
        {product.name} - {product.price}원 (재고: {product.stock})
      </button>
      {openProductIds.has(product.id) && (
        <div className="mt-2">
          {isEditing ? (
            <ProductEditForm product={product} editingProduct={editingProduct} setEditingProduct={setEditingProduct} />
          ) : (
            <ProductView product={product} handleEditProduct={handleEditProduct} />
          )}
        </div>
      )}
    </li>
  );
};

export default Product;
