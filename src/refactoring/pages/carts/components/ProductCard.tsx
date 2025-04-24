import { AddToCartButton, DiscountInfo, ProductStockState } from '.';
import { CartItem, Product } from '../../../../types';

export type ProductCardProps = {
  product: Product;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  getRemainingStock: (args: { cart: CartItem[]; product: Product }) => number;
  getMaxDiscount: (discounts: { quantity: number; rate: number }[]) => number;
};

export const ProductCard = ({
  product,
  cart,
  addToCart,
  getRemainingStock,
  getMaxDiscount,
}: ProductCardProps) => {
  const remainingStock = getRemainingStock({ cart, product });

  return (
    <div
      key={product.id}
      data-testid={`product-${product.id}`}
      className="bg-white p-3 rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">{product.name}</span>
        <span className="text-gray-600">{product.price.toLocaleString()}원</span>
      </div>

      <ProductStockState
        product={product}
        remainingStock={remainingStock}
        getMaxDiscount={getMaxDiscount}
      />

      <DiscountInfo discounts={product.discounts} />

      <AddToCartButton product={product} remainingStock={remainingStock} onAddToCart={addToCart} />
    </div>
  );
};
