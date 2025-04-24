// components/admin/product/ProductManagementSection.tsx
import { Product } from "../../../../types";
import { SectionLayout } from "../../common";
import { ProductManagementProvider } from "../../../contexts/ProductManagementContext";
import { CreateProductFormSection } from "./CreateProductFormSection";
import { ProductManagementItemList } from "./ProductManagementItemList";

interface ProductManagementSectionProps {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
}

export const ProductManagementSection = ({
  products,
  onProductUpdate,
  onProductAdd,
}: ProductManagementSectionProps) => {
  return (
    <ProductManagementProvider
      onProductUpdate={onProductUpdate}
      onProductAdd={onProductAdd}
    >
      <SectionLayout title="상품 관리">
        <CreateProductFormSection />
        <ProductManagementItemList products={products} />
      </SectionLayout>
    </ProductManagementProvider>
  );
};
