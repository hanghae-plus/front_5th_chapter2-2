import React, { useState } from 'react';
import { Coupon, Discount, Product } from '../types';
import { AdminPageProps } from '../types/props/AdminPageProps';
import { Button } from '../component/common';
import { ProductForm, ProductCard } from '../component/product';
import { CouponForm, CouponList } from '../component/coupon';
import { toggleSetItem } from '../utils/set';

export const AdminPage = ({ products, coupons, onProductUpdate, onProductAdd, onCouponAdd }: AdminPageProps) => {
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newDiscount, setNewDiscount] = useState<Discount>({ quantity: 0, rate: 0 });
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    name: '',
    code: '',
    discountType: 'percentage',
    discountValue: 0,
  });
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    stock: 0,
    discounts: [],
  });

  const toggleProductAccordion = (productId: string) => {
    setOpenProductIds(prev => toggleSetItem(prev, productId));
  };

  const handleEditProduct = (product: Product) => setEditingProduct({ ...product });

  const handleProductNameUpdate = (productId: string, newName: string) => {
    if (editingProduct && editingProduct.id === productId) {
      setEditingProduct({ ...editingProduct, name: newName });
    }
  };

  const handlePriceUpdate = (productId: string, newPrice: number) => {
    if (editingProduct && editingProduct.id === productId) {
      setEditingProduct({ ...editingProduct, price: newPrice });
    }
  };

  const handleEditComplete = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  const handleStockUpdate = (productId: string, newStock: number) => {
    const updatedProduct = products.find(p => p.id === productId);
    if (updatedProduct) {
      const newProduct = { ...updatedProduct, stock: newStock };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  const handleAddDiscount = (productId: string) => {
    const updatedProduct = products.find(p => p.id === productId);
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
    const updatedProduct = products.find(p => p.id === productId);
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
    setNewCoupon({ name: '', code: '', discountType: 'percentage', discountValue: 0 });
  };

  const handleAddNewProduct = () => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    onProductAdd(productWithId);
    setNewProduct({ name: '', price: 0, stock: 0, discounts: [] });
    setShowNewProductForm(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
          <Button
            onClick={() => setShowNewProductForm(!showNewProductForm)}
            variant="primary"
            className="mb-4"
          >
            {showNewProductForm ? '취소' : '새 상품 추가'}
          </Button>

          {showNewProductForm && (
            <ProductForm
              product={newProduct}
              onChange={setNewProduct}
              onSubmit={handleAddNewProduct}
              onCancel={() => setShowNewProductForm(false)}
            />
          )}

          <div className="space-y-2">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                isOpen={openProductIds.has(product.id)}
                isEditing={editingProduct?.id === product.id}
                editingProduct={editingProduct}
                newDiscount={newDiscount}
                onToggle={() => toggleProductAccordion(product.id)}
                onEdit={() => handleEditProduct(product)}
                onChangeName={(value) => handleProductNameUpdate(product.id, value)}
                onChangePrice={(value) => handlePriceUpdate(product.id, value)}
                onChangeStock={(value) => handleStockUpdate(product.id, value)}
                onAddDiscount={() => handleAddDiscount(product.id)}
                onRemoveDiscount={(index) => handleRemoveDiscount(product.id, index)}
                onChangeDiscountQuantity={(value) => setNewDiscount({ ...newDiscount, quantity: value })}
                onChangeDiscountRate={(value) => setNewDiscount({ ...newDiscount, rate: value })}
                onEditComplete={handleEditComplete}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
          <div className="bg-white p-4 rounded shadow space-y-4">
            <CouponForm
              coupon={newCoupon}
              onChange={setNewCoupon}
              onSubmit={handleAddCoupon}
            />
            <CouponList coupons={coupons} />
          </div>
        </div>
      </div>
    </div>
  );
};