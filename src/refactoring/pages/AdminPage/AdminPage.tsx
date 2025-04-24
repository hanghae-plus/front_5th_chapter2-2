import { useState } from "react";
import { Coupon, Product } from "../../../types";
import { useForm } from "../../hooks";
import { NewProductForm } from "./components/NewProductForm";
import { ProductEditor } from "./components/ProductEditor";
import { CouponManager } from "./components/CouponManager";

const INITIAL_PRODUCT_STATE = {
  name: "",
  price: 0,
  stock: 0,
  discounts: [],
};

interface Props {
  products: Product[];
  coupons: Coupon[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
  onCouponAdd: (newCoupon: Coupon) => void;
}

const AdminPage = ({
  products,
  coupons,
  onProductUpdate,
  onProductAdd,
  onCouponAdd,
}: Props) => {
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());

  const [newCoupon, setNewCoupon] = useState<Coupon>({
    name: "",
    code: "",
    discountType: "percentage",
    discountValue: 0,
  });
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const {
    values: newProduct,
    handleChange,
    reset,
  } = useForm<Omit<Product, "id">>(INITIAL_PRODUCT_STATE);

  const toggleProductAccordion = (productId: string) => {
    setOpenProductIds((prev) => {
      const newSet = new Set(prev);
      newSet.has(productId) ? newSet.delete(productId) : newSet.add(productId);
      return newSet;
    });
  };

  const handleAddCoupon = () => {
    onCouponAdd(newCoupon);
    setNewCoupon({
      name: "",
      code: "",
      discountType: "percentage",
      discountValue: 0,
    });
  };

  const handleAddNewProduct = () => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    onProductAdd(productWithId);
    reset();
    setShowNewProductForm(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>

          <button
            onClick={() => setShowNewProductForm(!showNewProductForm)}
            className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
          >
            {showNewProductForm ? "취소" : "새 상품 추가"}
          </button>
          {showNewProductForm && (
            <NewProductForm
              product={newProduct}
              onChange={handleChange}
              onSubmit={handleAddNewProduct}
            />
          )}
          <div className="space-y-2">
            {products.map((product, index) => (
              <ProductEditor
                key={product.id}
                index={index}
                product={product}
                isOpen={openProductIds.has(product.id)}
                onToggle={() => toggleProductAccordion(product.id)}
                onUpdate={onProductUpdate}
              />
            ))}
          </div>
        </div>
        <CouponManager
          coupons={coupons}
          newCoupon={newCoupon}
          onChange={setNewCoupon}
          onAdd={handleAddCoupon}
        />
      </div>
    </div>
  );
};

export default AdminPage;
