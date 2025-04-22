import { Product } from "@r/entities/product";

export interface CartItem {
  product: Product;
  quantity: number;
}
