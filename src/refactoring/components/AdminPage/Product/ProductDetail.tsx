import { Discount, Product } from '../../../../types';
import ProductDiscountList from './ProductDiscountList';
import ProductEditForm from './ProductEditForm';

interface ProductDetailProps {
  product: Product;
  editingProduct: Product | null;
  newDiscount: Discount;
  editComplete: () => void;
  editProduct: (product: Product) => void;
  updateProductName: (productId: string, name: string) => void;
  updateProductPrice: (productId: string, price: number) => void;
  updateProductStock: (productId: string, stock: number) => void;
  addDiscount: (productId: string) => void;
  removeDiscount: (productId: string, index: number) => void;
  updateDiscount: (params: { e: React.ChangeEvent<HTMLInputElement>; isRate: boolean }) => void;
}

const ProductDetail = ({
  product,
  editingProduct,
  editProduct,
  updateProductName,
  updateProductPrice,
  updateProductStock,
  editComplete,
  newDiscount,
  addDiscount,
  removeDiscount,
  updateDiscount,
}: ProductDetailProps) => {
  return (
    <div className="mt-2">
      {editingProduct && editingProduct.id === product.id ? (
        <ProductEditForm
          product={product}
          editingProduct={editingProduct}
          updateProductName={updateProductName}
          updateProductPrice={updateProductPrice}
          updateProductStock={updateProductStock}
          editComplete={editComplete}
          newDiscount={newDiscount}
          addDiscount={addDiscount}
          removeDiscount={removeDiscount}
          updateDiscount={updateDiscount}
        />
      ) : (
        <ProductDiscountList product={product} editProduct={editProduct} />
      )}
    </div>
  );
};

export default ProductDetail;
