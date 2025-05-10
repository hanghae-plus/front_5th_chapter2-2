import { Product } from "@r/model/product/types";
import { AddButton } from "./add-button";
import { ApplicableCouponList } from "./applicable-coupon-list";
import { NameAndPrice } from "./name-and-price";
import { StockAndMaxDiscountRate } from "./stock-and-max-discount-rate";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div
      data-testid={`product-${product.id}`}
      className="bg-white p-3 rounded shadow"
    >
      <NameAndPrice product={product} />
      <StockAndMaxDiscountRate product={product} />
      <ApplicableCouponList product={product} />
      <AddButton product={product} />
    </div>
  );
};
