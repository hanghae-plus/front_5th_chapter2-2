import { Product } from "../../../../types";
import { FormInput } from "./FormInput";
import { Button } from "../../common";

interface CreateProductFormProps {
  formData: Omit<Product, "id">;
  setFormData: React.Dispatch<React.SetStateAction<Omit<Product, "id">>>;
  handleSubmit: () => void;
  showNewProductForm: boolean;
}

export const CreateProductForm = ({
  formData,
  setFormData,
  handleSubmit,
  showNewProductForm,
}: CreateProductFormProps) => {
  if (!showNewProductForm) return null;

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
      <FormInput
        id="productName"
        label="상품명"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <FormInput
        id="productPrice"
        label="가격"
        type="number"
        value={formData.price}
        onChange={(e) =>
          setFormData({ ...formData, price: Number(e.target.value) })
        }
      />
      <FormInput
        id="productStock"
        label="재고"
        type="number"
        value={formData.stock}
        onChange={(e) =>
          setFormData({ ...formData, stock: Number(e.target.value) })
        }
      />
      <Button color="blue" width="full" className="p-2" onClick={handleSubmit}>
        추가
      </Button>
    </div>
  );
};
