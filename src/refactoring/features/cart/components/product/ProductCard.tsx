import { ProductCardAddToCartButton } from "./ProductCardAddToCartButton";
import { ProductCardHeader } from "./ProductCardHeader";
import { ProductCardStock } from "./ProductCardStock";
import { ProductMaxDiscountRate } from "./ProductMaxDiscountRate";
import { ProductCardDiscountList } from "./ProductCardDiscountList";

interface ProductCardComposition {
  Header: typeof ProductCardHeader;
  Stock: typeof ProductCardStock;
  MaxDiscountRate: typeof ProductMaxDiscountRate;
  DiscountList: typeof ProductCardDiscountList;
  AddToCartButton: typeof ProductCardAddToCartButton;
}

interface ProductCardProps {
  children: React.ReactNode;
}

export const ProductCard: React.FC<ProductCardProps> &
  ProductCardComposition = ({ children, ...props }) => {
  return (
    <div className="bg-white p-3 rounded shadow" {...props}>
      {children}
    </div>
  );
};

ProductCard.Header = ProductCardHeader;
ProductCard.Stock = ProductCardStock;
ProductCard.MaxDiscountRate = ProductMaxDiscountRate;
ProductCard.DiscountList = ProductCardDiscountList;
ProductCard.AddToCartButton = ProductCardAddToCartButton;
