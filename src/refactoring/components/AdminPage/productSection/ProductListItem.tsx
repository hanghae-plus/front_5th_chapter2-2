import { memo } from 'react';

import type { Product } from '../../../../types';
import ProductCard from './ProductCard';
import ProductEditor from './ProductEditor';

interface Props {
  index: number;
  product: Product;
  isOpen: boolean;
  isEditing: boolean;
  editingProduct: Product | null;
  onToggle: (id: string) => void;
  onEditStart: (product: Product) => void;
  onEditComplete: (product: Product) => void;
  onEditCancel: () => void;
}

const ProductListItem = (props: Props) => {
  const {
    index,
    product,
    isOpen,
    isEditing,
    editingProduct,
    onToggle,
    onEditStart,
    onEditComplete,
    onEditCancel,
  } = props;

  return (
    <div
      data-testid={`product-${index + 1}`}
      className="bg-white p-4 rounded shadow"
    >
      {isEditing && editingProduct ? (
        <ProductEditor
          product={editingProduct}
          onSave={onEditComplete}
          onCancel={onEditCancel}
        />
      ) : (
        <ProductCard
          product={product}
          isOpen={isOpen}
          onToggle={() => onToggle(product.id)}
          onEdit={() => onEditStart(product)}
        />
      )}
    </div>
  );
};

export default memo(ProductListItem);
