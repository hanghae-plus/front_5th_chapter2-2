import { Product } from "../../../../types";
import { Input } from "../../../components/Input";

interface NewProductFormTypeProps {
  product: Omit<Product, "id">;
  onChange: (field: keyof Omit<Product, "id">, value: string | number) => void;
  onSubmit: () => void;
}

export const NewProductForm = ({
  product,
  onChange,
  onSubmit,
}: NewProductFormTypeProps) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
      <Input id="productName">
        <Input.Label>상품명</Input.Label>
        <Input.Field
          id="productName"
          type="text"
          value={product.name}
          onChange={(e) => onChange("name", e.target.value)}
        />
      </Input>
      <Input id="productPrice">
        <Input.Label>가격</Input.Label>
        <Input.Field
          id="productPrice"
          type="number"
          value={product.price}
          onChange={(e) => onChange("price", e.target.value)}
        />
      </Input>
      <Input id="productStock">
        <Input.Label>재고</Input.Label>
        <Input.Field
          id="productStock"
          type="number"
          value={product.stock}
          onChange={(e) => onChange("stock", e.target.value)}
        />
      </Input>
      <button
        onClick={onSubmit}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        추가
      </button>
    </div>
  );
};
