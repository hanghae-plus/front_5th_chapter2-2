import { useState } from 'react';
import NewProduct from './NewProduct';
import { Product } from '../../../types';
import { Card, H2 } from '../shared';
import ProductAccordion from './ProductAccordion';
interface ManageProductProps {
  products: Product[];
  onProductAdd: (product: Product) => void;
  onProductUpdate: (updatedProduct: Product) => void;
}
const ManageProduct = ({
  products,
  onProductAdd,
  onProductUpdate,
}: ManageProductProps) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  const handleEditComplete = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  return (
    <div>
      <H2>상품 관리</H2>
      <NewProduct onProductAdd={onProductAdd} />
      <div className="space-y-2">
        {products.map((product, index) => (
          <Card key={product.id} data-testid={`product-${index + 1}`}>
            <ProductAccordion
              product={product}
              editingProduct={editingProduct}
              handleEditProduct={handleEditProduct}
              handleEditComplete={handleEditComplete}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageProduct;
