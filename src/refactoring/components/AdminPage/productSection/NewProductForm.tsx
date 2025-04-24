import { useState, ChangeEvent } from 'react';
import type { Product } from '../../../../types';
import LabeledInput from '../../../ui/LabeledInput';

import { DEFAULT_FORM } from '../../../constants';

interface NewProductFormProps {
  onSubmit: (product: Product) => void;
}

export default function NewProductForm({ onSubmit }: NewProductFormProps) {
  const [form, setForm] = useState(DEFAULT_FORM);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isNumeric = ['price', 'stock'].includes(name);
    const newValue = isNumeric ? parseInt(value) : value;

    setForm((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = () => {
    if (!form.name) return;
    onSubmit({ ...form, id: Date.now().toString() });
    setForm(DEFAULT_FORM);
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <LabeledInput
        id="new-name"
        name="name"
        label="상품명"
        value={form.name}
        onChange={handleChange}
      />
      <LabeledInput
        id="new-price"
        name="price"
        label="가격"
        type="number"
        value={form.price}
        onChange={handleChange}
      />
      <LabeledInput
        id="new-stock"
        name="stock"
        label="재고"
        type="number"
        value={form.stock}
        onChange={handleChange}
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        추가
      </button>
    </div>
  );
}
