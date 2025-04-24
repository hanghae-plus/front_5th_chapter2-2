import { useState, useCallback } from 'react';
import type { Product } from '@/types';

import ProductListItem from './ProductListItem';

interface ProductListProps {
  products: Product[];
  onUpdate: (product: Product) => void;
}

const ProductList = ({ products, onUpdate }: ProductListProps) => {
  const [openProductId, setOpenProductId] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleToggle = useCallback(
    (id: string) => setOpenProductId((prevId) => (prevId === id ? null : id)),
    [],
  );

  const handleEditStart = useCallback(
    (product: Product) => setEditingProduct(product),
    [],
  );

  const handleEditComplete = useCallback(
    (updated: Product) => {
      onUpdate(updated);
      setEditingProduct(null);
    },
    [onUpdate],
  );

  return (
    <div className="space-y-2">
      {products.map((product, index) => (
        <ProductListItem
          key={product.id}
          index={index}
          product={product}
          isOpen={openProductId === product.id}
          isEditing={editingProduct?.id === product.id}
          onToggle={handleToggle}
          onEditStart={handleEditStart}
          onEditComplete={handleEditComplete}
          onEditCancel={() => setEditingProduct(null)}
          editingProduct={editingProduct}
        />
      ))}
    </div>
  );
};

export default ProductList;
