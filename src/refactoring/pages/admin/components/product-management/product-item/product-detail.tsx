import { ViewToggle } from "@r/shared/ui/view-toggle";
import { ProductEditForm } from "./product-edit-form";
import { Product } from "@r/model/product/types";
import { DiscountAndTrigger } from "./discount-and-trigger";

interface Props {
  product: Product;
}

export const ProductDetail: React.FC<Props> = ({ product }) => {
  return (
    <ViewToggle>
      <ViewToggle.OnShow>
        <ProductEditForm product={product} />
      </ViewToggle.OnShow>
      <ViewToggle.OnHide>
        <DiscountAndTrigger product={product} />
      </ViewToggle.OnHide>
    </ViewToggle>
  );
};
