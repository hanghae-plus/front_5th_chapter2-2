import React, { useState } from 'react';
import { CartItem, Coupon, Product } from '../types';
import { Button, SelectField } from '../component/common';
import { CartPageProps } from '../types/props/CartItemCardProps';
import { getAppliedDiscount,getMaxDiscount,getRemainingStock, calculateTotal,addProductToCart,removeProductFromCart } from '../utils';

export const CartPage = ({ products, coupons }: CartPageProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

 
const addToCart = (product: Product) => {
  const remaining = getRemainingStock(cart,product );
  if (remaining <= 0) return;
  setCart(prev => addProductToCart(prev, product));
};

const removeFromCart = (productId: string) => {
  setCart(prev => removeProductFromCart(prev, productId));
};


  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart(prevCart =>
      prevCart
        .map(item => {
          if (item.product.id === productId) {
            const maxQuantity = item.product.stock;
            const updatedQuantity = Math.max(0, Math.min(newQuantity, maxQuantity));
            return updatedQuantity > 0 ? { ...item, quantity: updatedQuantity } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const applyCoupon = (index: string) => {
    const selected = coupons[parseInt(index)];
    if (selected) setSelectedCoupon(selected);
  };

  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } = calculateTotal(cart, selectedCoupon);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
          <div className="space-y-2">
            {products.map(product => {
              const remainingStock = getRemainingStock(cart, product);
              return (
                <div key={product.id} className="bg-white p-3 rounded shadow">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{product.name}</span>
                    <span className="text-gray-600">{product.price.toLocaleString()}원</span>
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    <span className={`font-medium ${remainingStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      재고: {remainingStock}개
                    </span>
                    {product.discounts.length > 0 && (
                      <span className="ml-2 font-medium text-blue-600">
                        최대 {(getMaxDiscount(product.discounts) * 100).toFixed(0)}% 할인
                      </span>
                    )}
                  </div>
                  {product.discounts.length > 0 && (
                    <ul className="list-disc list-inside text-sm text-gray-500 mb-2">
                      {product.discounts.map((discount, index) => (
                        <li key={index}>
                          {discount.quantity}개 이상: {(discount.rate * 100).toFixed(0)}% 할인
                        </li>
                      ))}
                    </ul>
                  )}
                  <Button
                    onClick={() => addToCart(product)}
                    variant={remainingStock > 0 ? 'primary' : 'secondary'}
                    disabled={remainingStock <= 0}
                    className="w-full"
                  >
                    {remainingStock > 0 ? '장바구니에 추가' : '품절'}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
          <div className="space-y-2">
            {cart.map(item => {
              const appliedDiscount = getAppliedDiscount(item);
              return (
                <div key={item.product.id} className="flex justify-between items-center bg-white p-3 rounded shadow">
                  <div>
                    <span className="font-semibold">{item.product.name}</span>
                    <br />
                    <span className="text-sm text-gray-600">
                      {item.product.price}원 x {item.quantity}
                      {appliedDiscount > 0 && (
                        <span className="text-green-600 ml-1">
                          ({(appliedDiscount * 100).toFixed(0)}% 할인 적용)
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex">
                    <Button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      variant="secondary"
                      className="mr-1 px-2 py-1"
                    >
                      -
                    </Button>
                    <Button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      variant="secondary"
                      className="mr-1 px-2 py-1"
                    >
                      +
                    </Button>
                    <Button
                      onClick={() => removeFromCart(item.product.id)}
                      variant="danger"
                      className="px-2 py-1"
                    >
                      삭제
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-semibold mb-2">쿠폰 적용</h2>
            <SelectField
              label="쿠폰 선택"
              value={coupons.findIndex(c => c.code === selectedCoupon?.code).toString()}
              options={coupons.map((coupon, index) => ({
                label: `${coupon.name} - ${coupon.discountType === 'amount' ? `${coupon.discountValue}원` : `${coupon.discountValue}%`}`,
                value: index.toString(),
              }))}
              onChange={applyCoupon}
            />
            {selectedCoupon && (
              <p className="text-green-600">
                적용된 쿠폰: {selectedCoupon.name} ({selectedCoupon.discountType === 'amount' ? `${selectedCoupon.discountValue}원` : `${selectedCoupon.discountValue}%`} 할인)
              </p>
            )}
          </div>

          <div className="mt-6 bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-semibold mb-2">주문 요약</h2>
            <div className="space-y-1">
              <p>상품 금액: {totalBeforeDiscount.toLocaleString()}원</p>
              <p className="text-green-600">할인 금액: {totalDiscount.toLocaleString()}원</p>
              <p className="text-xl font-bold">
                최종 결제 금액: {totalAfterDiscount.toLocaleString()}원
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};