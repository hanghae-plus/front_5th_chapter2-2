import { Coupon, Product } from '../../types.ts';
import { useCart, useDiscount } from '../hooks';
import CartSummary from './CartSummary.tsx';
import CouponSection from './CouponSection.tsx';

interface Props {
    products: Product[];
    coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
    const {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        applyCoupon,
        calculateTotal,
        calculateRemainingStock,
        selectedCoupon,
    } = useCart();

    const { calculateMaxDiscount, calculateDiscount } = useDiscount();
    const discountSummary = calculateTotal();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">장바구니</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
                    <div className="space-y-2">
                        {products.map((product) => {
                            const remainingStock = calculateRemainingStock(product);
                            return (
                                <div
                                    key={product.id}
                                    data-testid={`product-${product.id}`}
                                    className="bg-white p-3 rounded shadow"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold">{product.name}</span>
                                        <span className="text-gray-600">{product.price.toLocaleString()}원</span>
                                    </div>
                                    <div className="text-sm text-gray-500 mb-2">
                                        <span
                                            className={`font-medium ${remainingStock > 0 ? 'text-green-600' : 'text-red-600'}`}
                                        >
                                            재고: {remainingStock}개
                                        </span>
                                        {product.discounts.length > 0 && (
                                            <span className="ml-2 font-medium text-blue-600">
                                                최대 {(calculateMaxDiscount(product.discounts) * 100).toFixed(0)}% 할인
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
                                    <button
                                        onClick={() => addToCart(product)}
                                        className={`w-full px-3 py-1 rounded ${
                                            remainingStock > 0
                                                ? 'bg-blue-500 text-white hover:bg-blue-600'
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                        disabled={remainingStock <= 0}
                                    >
                                        {remainingStock > 0 ? '장바구니에 추가' : '품절'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>

                    <div className="space-y-2">
                        {cart.map((item) => {
                            const appliedDiscount = calculateDiscount(item);
                            return (
                                <div
                                    key={item.product.id}
                                    className="flex justify-between items-center bg-white p-3 rounded shadow"
                                >
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
                                    <div>
                                        <button
                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                            className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
                                        >
                                            -
                                        </button>
                                        <button
                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                            className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
                                        >
                                            +
                                        </button>
                                        <button
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <CouponSection coupons={coupons} selectedCoupon={selectedCoupon} onChangeCoupon={applyCoupon} />
                    <CartSummary discountSummary={discountSummary} />
                </div>
            </div>
        </div>
    );
};
