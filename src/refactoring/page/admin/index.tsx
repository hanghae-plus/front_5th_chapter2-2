import { useState } from 'react';
import { Coupon, Discount, Product } from '../../features/shared/types/entities.ts';
import { CouponManage, ProductManage } from '../../features/admin/components';
import { useAdminProductHandlers } from '../../features/admin/hooks/useAdminProductHandler.ts';
import { useNewProductFormToggle } from '../../features/admin/hooks/useNewProductFormToggle.ts';
import { useAccordionToggle } from '../../features/admin/hooks/useAccordionToggle.ts';
interface Props {
  products: Product[];
  coupons: Coupon[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
  newCoupon: Coupon;
  setNewCoupon: React.Dispatch<React.SetStateAction<Coupon>>;
  handleAddCoupon: () => void;
}

export const AdminPage = ({
  products,
  coupons,
  onProductUpdate,
  onProductAdd,
  newCoupon,
  setNewCoupon,
  handleAddCoupon,
}: Props) => {
  const { showNewProductForm, setShowNewProductForm, closeNewProductForm } = useNewProductFormToggle();
  const { openProductIds, toggleProductAccordion } = useAccordionToggle();

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newDiscount, setNewDiscount] = useState<Discount>({ quantity: 0, rate: 0 });
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    stock: 0,
    discounts: [],
  });

  const {
    handleProductNameUpdate,
    handlePriceUpdate,
    handleStockUpdate,
    handleAddDiscount,
    handleRemoveDiscount,
    handleEditComplete,
  } = useAdminProductHandlers({
    products,
    editingProduct,
    setEditingProduct,
    onProductUpdate,
  });

  // handleEditProduct 함수 수정
  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  // 새로운 상품 추가
  const handleAddNewProduct = () => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    onProductAdd(productWithId);
    setNewProduct({
      name: '',
      price: 0,
      stock: 0,
      discounts: [],
    });
    closeNewProductForm();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductManage
          products={products}
          openProductIds={openProductIds}
          editingProduct={editingProduct}
          newDiscount={newDiscount}
          newProduct={newProduct}
          showNewProductForm={showNewProductForm}
          toggleProductAccordion={toggleProductAccordion}
          handleEditProduct={handleEditProduct}
          handleProductNameUpdate={handleProductNameUpdate}
          handlePriceUpdate={handlePriceUpdate}
          handleStockUpdate={handleStockUpdate}
          handleAddDiscount={handleAddDiscount}
          handleRemoveDiscount={handleRemoveDiscount}
          handleEditComplete={handleEditComplete}
          handleAddNewProduct={handleAddNewProduct}
          setShowNewProductForm={setShowNewProductForm}
          setNewProduct={setNewProduct}
          setNewDiscount={setNewDiscount}
        />
        <CouponManage
          coupons={coupons}
          newCoupon={newCoupon}
          setNewCoupon={setNewCoupon}
          handleAddCoupon={handleAddCoupon}
        />
      </div>
    </div>
  );
};
