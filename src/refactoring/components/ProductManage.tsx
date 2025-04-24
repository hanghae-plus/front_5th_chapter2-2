import { Product } from '../../types';
import { useDiscount } from '../hooks/useDiscount';
import { useProductEdit } from '../hooks/useProductEdit';
import { getTitle, isEditingProduct } from '../utils/productUtils';
import NewProductForm from './NewProductForm';
import ProductAccordion from './ProductAccordion';
import ProductEditForm from './ProductEditForm';
import ProductDiscountsCard from './ProductDiscountsCard';

interface Props {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
}

export default function ProductManage({
  products,
  onProductUpdate,
  onProductAdd,
}: Props) {
  const productEditor = useProductEdit(onProductUpdate, products);
  const { editingProduct, setEditingProduct, updateProduct } = productEditor;

  const productDiscounter = useDiscount(
    products,
    editingProduct,
    setEditingProduct,
    onProductUpdate,
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <NewProductForm onProductAdd={onProductAdd} />
      <div className="space-y-2">
        {products.map((product, index) => (
          <div
            key={product.id}
            data-testid={`product-${index + 1}`}
            className="bg-white p-4 rounded shadow"
          >
            <ProductAccordion id={product.id} title={getTitle(product)}>
              {isEditingProduct(editingProduct, product.id) ? (
                <ProductEditForm
                  product={product}
                  productEditor={{ ...productEditor, editingProduct }}
                  productDiscounter={productDiscounter}
                />
              ) : (
                <ProductDiscountsCard
                  product={product}
                  handleEditProduct={updateProduct}
                />
              )}
            </ProductAccordion>
          </div>
        ))}
      </div>
    </div>
  );
}
