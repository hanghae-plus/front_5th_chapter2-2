import { useState } from "react";
import { Coupon, Discount, Product } from "../../../types.ts";
import { Layout } from "../Layout.tsx";
import NewProductForm from "./NewProductForm.tsx";
import NewCouponForm from "./NewCouponForm.tsx";
import CouponItem from "./CouponItem.tsx";
import EditProductForm from "./EditProductForm.tsx";

interface Props {
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
}: Props) => {
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newDiscount, setNewDiscount] = useState<Discount>({
    quantity: 0,
    rate: 0,
  });
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    name: "",
    code: "",
    discountType: "percentage",
    discountValue: 0,
  });
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    stock: 0,
    discounts: [],
  });

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

  // handleEditProduct 함수 수정
  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  // 수정 완료 핸들러 함수 추가
  const handleEditComplete = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  const handleAddDiscount = (productId: string) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct && editingProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: [...updatedProduct.discounts, newDiscount],
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
      setNewDiscount({ quantity: 0, rate: 0 });
    }
  };

  const handleRemoveDiscount = (productId: string, index: number) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: updatedProduct.discounts.filter((_, i) => i !== index),
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
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
    setNewProduct({
      name: "",
      price: 0,
      stock: 0,
      discounts: [],
    });
    setShowNewProductForm(false);
  };

  return (
    <Layout title="관리자 페이지">
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
            newProduct={newProduct}
            setNewProduct={setNewProduct}
            onAddNewProduct={handleAddNewProduct}
          />
        )}
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
                <div className="mt-2">
                  {editingProduct && editingProduct.id === product.id ? (
                    <EditProductForm
                      editingProduct={editingProduct}
                      setEditingProduct={setEditingProduct}
                      handleRemoveDiscount={handleRemoveDiscount}
                      handleAddDiscount={handleAddDiscount}
                      handleEditComplete={handleEditComplete}
                      products={products}
                      newDiscount={newDiscount}
                      setNewDiscount={setNewDiscount}
                    />
                  ) : (
                    <div>
                      {product.discounts.map((discount, index) => (
                        <div key={index} className="mb-2">
                          <span>
                            {discount.quantity}개 이상 구매 시{" "}
                            {discount.rate * 100}% 할인
                          </span>
                        </div>
                      ))}
                      <button
                        data-testid="modify-button"
                        onClick={() => handleEditProduct(product)}
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
                      >
                        수정
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
        <div className="bg-white p-4 rounded shadow">
          <NewCouponForm
            newCoupon={newCoupon}
            setNewCoupon={setNewCoupon}
            onAddNewCoupon={handleAddCoupon}
          />
          <div>
            <h3 className="text-lg font-semibold mb-2">현재 쿠폰 목록</h3>
            <div className="space-y-2">
              {coupons.map((coupon, index) => (
                <CouponItem key={coupon.code} coupon={coupon} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
