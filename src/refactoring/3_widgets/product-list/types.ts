import { Product, Discount } from "../../6_shared/types";

export interface ProductCardProps {
  product: Product;
}

export interface DiscountListProps {
  discounts: Discount[];
}

export interface AddToCartButtonProps {
  product: Product;
}
