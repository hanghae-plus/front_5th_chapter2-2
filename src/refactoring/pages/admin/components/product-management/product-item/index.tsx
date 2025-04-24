import { Product } from "@r/model/product/types";
import { ViewToggle } from "@r/shared/ui/view-toggle";
import { ProductDetail } from "./product-detail";

interface ProductAccordionProps extends React.HTMLProps<HTMLDivElement> {
  product: Product;
}

export const ProductAccordion: React.FC<ProductAccordionProps> = ({
  product,
  ...props
}) => {
  return (
    <div className="bg-white p-4 rounded shadow" {...props}>
      <ViewToggle>
        <ViewToggle.Trigger
          data-testid="toggle-button"
          className="w-full text-left font-semibold"
        >
          {product.name} - {product.price}원 (재고: {product.stock})
        </ViewToggle.Trigger>
        <ViewToggle.OnShow>
          <div className="mt-2">
            <ProductDetail product={product} />
          </div>
        </ViewToggle.OnShow>
      </ViewToggle>
    </div>
  );
};
