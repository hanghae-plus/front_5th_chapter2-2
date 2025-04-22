import { Product } from "@r/entities/product/types";

export interface CartItem {
  product: Product;
  quantity: number;
}
