import { useState } from "react";
import { Coupon, Discount, Product } from "../../types.ts";

const EMPTY_PRODUCT: Omit<Product, "id"> = {
  name: "",
  price: 0,
  stock: 0,
  discounts: [],
};

const EMPTY_COUPON: Coupon = {
  name: "",
  code: "",
  discountType: "percentage",
  discountValue: 0,
};

const EMPTY_DISCOUNT: Discount = {
  quantity: 0,
  rate: 0,
};

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
  // 이름 수정하면 좋을 듯...
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

  // 할인정보 + 수정 관련 기능
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

  ////////////////////////////////
  // [수정]
  const handleEditProductClick = (product: Product) => {
    setEditingProduct({ ...product });
  };
  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingProduct((prevProduct) => {
      if (prevProduct === null) return prevProduct;

      const updatedProduct = { ...prevProduct, name: e.target.value };
      return updatedProduct;
    });
  };
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingProduct((prevProduct) => {
      if (prevProduct === null) return prevProduct;

      const updatedProduct = {
        ...prevProduct,
        price: parseInt(e.target.value),
      };
      return updatedProduct;
    });
  };
  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingProduct((prevProduct) => {
      if (prevProduct === null) return prevProduct;

      const updatedProduct = {
        ...prevProduct,
        stock: parseInt(e.target.value),
      };
      return updatedProduct;
    });
  };
  // [할인 추가]
  const handleAddDiscountClick = () => {
    setEditingProduct((prevProduct) => {
      if (prevProduct === null) return prevProduct;

      const updatedProduct = {
        ...prevProduct,
        discounts: [...prevProduct.discounts, newDiscount],
      };
      return updatedProduct;
    });

    resetNewDiscount();
  };
  // [삭제]
  const handleRemoveDiscountClick = (targetIndex: number) => {
    setEditingProduct((prevProduct) => {
      if (prevProduct === null) return prevProduct;

      const updatedProduct = {
        ...prevProduct,
        discounts: prevProduct.discounts.filter(
          (_, index) => index !== targetIndex
        ),
      };
      return updatedProduct;
    });
  };
  // [수정 완료]
  const handleEditCompleteClick = () => {
    if (!editingProduct) return;

    onProductUpdate(editingProduct);
    resetEditingProduct();
  };
  ////////////////////////////////
  // [새 상품 추가] or [취소]
  const toggleShowNewProductForm = () => setShowNewProductForm((show) => !show);

  // [추가]
  const handleAddNewProduct = () => {
    onProductAdd({ ...newProduct, id: Date.now().toString() });
    resetNewProduct();
  };
  const handleNewProductNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewProduct({ ...newProduct, name: e.target.value });
  };

  const handleNewProductPriceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewProduct({ ...newProduct, price: parseInt(e.target.value) });
  };

  const handleNewProductStockChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewProduct({ ...newProduct, stock: parseInt(e.target.value) });
  };
  ////////////////////////////////
  // [쿠폰 추가]
  const handleAddCouponClick = () => {
    onCouponAdd(newCoupon);
    resetNewCoupon;
  };
  const handleCouponNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCoupon({ ...newCoupon, name: e.target.value });
  };
  const handleCouponCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCoupon({ ...newCoupon, code: e.target.value });
  };
  const handleCouponDiscountTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNewCoupon({
      ...newCoupon,
      discountType: e.target.value as "amount" | "percentage",
    });
  };
  const handleCouponDiscountValueChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewCoupon({ ...newCoupon, discountValue: parseInt(e.target.value) });
  };
  ////////////////////////////////
  const handleNewDiscountQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewDiscount({ ...newDiscount, quantity: parseInt(e.target.value) });
  };

  const handleNewDiscountRateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewDiscount({ ...newDiscount, rate: parseInt(e.target.value) / 100 });
  };

  ////////////////////////////////
  const resetEditingProduct = () => {
    setEditingProduct(null);
  };

  const resetNewDiscount = () => {
    setNewDiscount(EMPTY_DISCOUNT);
  };

  const resetNewCoupon = () => {
    setNewCoupon(EMPTY_COUPON);
  };

  const resetNewProduct = () => {
    setNewProduct(EMPTY_PRODUCT);
    setShowNewProductForm(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
          <button
            onClick={toggleShowNewProductForm}
            className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
          >
            {showNewProductForm ? "취소" : "새 상품 추가"}
          </button>
          {showNewProductForm && (
            <div className="bg-white p-4 rounded shadow mb-4">
              <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
              <div className="mb-2">
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium text-gray-700"
                >
                  상품명
                </label>
                <input
                  id="productName"
                  type="text"
                  value={newProduct.name}
                  onChange={handleNewProductNameChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="productPrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  가격
                </label>
                <input
                  id="productPrice"
                  type="number"
                  value={newProduct.price}
                  onChange={handleNewProductPriceChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="productStock"
                  className="block text-sm font-medium text-gray-700"
                >
                  재고
                </label>
                <input
                  id="productStock"
                  type="number"
                  value={newProduct.stock}
                  onChange={handleNewProductStockChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                onClick={handleAddNewProduct}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                추가
              </button>
            </div>
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
                      <div>
                        <div className="mb-4">
                          <label className="block mb-1">상품명: </label>
                          <input
                            type="text"
                            value={editingProduct.name}
                            onChange={handleProductNameChange}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block mb-1">가격: </label>
                          <input
                            type="number"
                            value={editingProduct.price}
                            onChange={handlePriceChange}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block mb-1">재고: </label>
                          <input
                            type="number"
                            value={editingProduct.stock}
                            onChange={handleStockChange}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        {/* 할인 정보 수정 부분 */}
                        <div>
                          <h4 className="text-lg font-semibold mb-2">
                            할인 정보
                          </h4>
                          {editingProduct.discounts.map((discount, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center mb-2"
                            >
                              <span>
                                {discount.quantity}개 이상 구매 시{" "}
                                {discount.rate * 100}% 할인
                              </span>
                              <button
                                onClick={() => handleRemoveDiscountClick(index)}
                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                              >
                                삭제
                              </button>
                            </div>
                          ))}
                          <div className="flex space-x-2">
                            <input
                              type="number"
                              placeholder="수량"
                              value={newDiscount.quantity}
                              onChange={handleNewDiscountQuantityChange}
                              className="w-1/3 p-2 border rounded"
                            />
                            <input
                              type="number"
                              placeholder="할인율 (%)"
                              value={newDiscount.rate * 100}
                              onChange={handleNewDiscountRateChange}
                              className="w-1/3 p-2 border rounded"
                            />
                            <button
                              onClick={handleAddDiscountClick}
                              className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                            >
                              할인 추가
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={handleEditCompleteClick}
                          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
                        >
                          수정 완료
                        </button>
                      </div>
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
                          onClick={() => handleEditProductClick(product)}
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
            <div className="space-y-2 mb-4">
              <input
                type="text"
                placeholder="쿠폰 이름"
                value={newCoupon.name}
                onChange={handleCouponNameChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="쿠폰 코드"
                value={newCoupon.code}
                onChange={handleCouponCodeChange}
                className="w-full p-2 border rounded"
              />
              <div className="flex gap-2">
                <select
                  value={newCoupon.discountType}
                  onChange={handleCouponDiscountTypeChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="amount">금액(원)</option>
                  <option value="percentage">할인율(%)</option>
                </select>
                <input
                  type="number"
                  placeholder="할인 값"
                  value={newCoupon.discountValue}
                  onChange={handleCouponDiscountValueChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                onClick={handleAddCouponClick}
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                쿠폰 추가
              </button>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">현재 쿠폰 목록</h3>
              <div className="space-y-2">
                {coupons.map((coupon, index) => (
                  <div
                    key={index}
                    data-testid={`coupon-${index + 1}`}
                    className="bg-gray-100 p-2 rounded"
                  >
                    {coupon.name} ({coupon.code}):
                    {coupon.discountType === "amount"
                      ? `${coupon.discountValue}원`
                      : `${coupon.discountValue}%`}{" "}
                    할인
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
