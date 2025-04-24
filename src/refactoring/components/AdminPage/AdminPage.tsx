import { Coupon, Product } from '../../../types.ts';
import {
  useAdminNewProduct,
  useProductAccordion,
  useAdminProduct,
  useAdminDiscount,
  useAdminCoupon,
} from '../../hooks';
import { NewProductForm } from './NewProductForm.tsx';
import { ProductDetail } from './Product';
import { CouponForm, CouponList } from './Coupon';

const DISCOUNT_TYPE_OPTIONS = ['amount', 'percentage'];

interface AdminPageProps {
  products: Product[];
  coupons: Coupon[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
  onCouponAdd: (newCoupon: Coupon) => void;
}

export const AdminPage = ({
  products,
  coupons,
  onProductUpdate,
  onProductAdd,
  onCouponAdd,
}: AdminPageProps) => {
  const { openProductIds, toggleProductAccordion } = useProductAccordion();
  const {
    editingProduct,
    editProduct,
    updateProductName,
    updateProductPrice,
    updateProductStock,
    editComplete,
  } = useAdminProduct({ products, onProductUpdate });

  const { newDiscount, addDiscount, removeDiscount, updateDiscount } = useAdminDiscount({
    products,
    onProductUpdate,
    onUpdateEditingProduct: editProduct,
  });

  const {
    newCoupon,
    updateCouponName,
    updateCouponCode,
    updateCouponDiscountType,
    updateCouponDiscountValue,
    addCoupon,
  } = useAdminCoupon({ onCouponAdd });

  const {
    newProduct,
    showNewProductForm,
    toggleNewProductForm,
    updateProductName: updateNewProductName,
    updateProductPrice: updateNewProductPrice,
    updateProductStock: updateNewProductStock,
    addNewProduct,
  } = useAdminNewProduct({ onProductAdd });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
          <button
            onClick={toggleNewProductForm}
            className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
          >
            {showNewProductForm ? '취소' : '새 상품 추가'}
          </button>

          <NewProductForm
            newProduct={newProduct}
            showNewProductForm={showNewProductForm}
            updateProductName={updateNewProductName}
            updateProductPrice={updateNewProductPrice}
            updateProductStock={updateNewProductStock}
            addNewProduct={addNewProduct}
          />

          <div className="space-y-2">
            {products.map((product, index) => (
              <div
                key={product.id}
                data-testid={`product-${index + 1}`}
                className="bg-white p-4 rounded shadow"
              >
                <button
                  data-testid="toggle-button"
                  onClick={() => toggleProductAccordion(product.id)}
                  className="w-full text-left font-semibold"
                >
                  {product.name} - {product.price}원 (재고: {product.stock})
                </button>

                {openProductIds.has(product.id) && (
                  <ProductDetail
                    product={product}
                    editingProduct={editingProduct}
                    editProduct={editProduct}
                    updateProductName={updateProductName}
                    updateProductPrice={updateProductPrice}
                    updateProductStock={updateProductStock}
                    editComplete={editComplete}
                    newDiscount={newDiscount}
                    addDiscount={addDiscount}
                    removeDiscount={removeDiscount}
                    updateDiscount={updateDiscount}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
          <div className="bg-white p-4 rounded shadow">
            <CouponForm
              newCoupon={newCoupon}
              updateCouponName={updateCouponName}
              updateCouponCode={updateCouponCode}
              updateCouponDiscountType={updateCouponDiscountType}
              updateCouponDiscountValue={updateCouponDiscountValue}
              addCoupon={addCoupon}
              discountTypeOptions={DISCOUNT_TYPE_OPTIONS}
            />
            <CouponList coupons={coupons} />
          </div>
        </div>
      </div>
    </div>
  );
};
