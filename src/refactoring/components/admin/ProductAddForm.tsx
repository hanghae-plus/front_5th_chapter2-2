import { Button } from "../ui/Button";
import { Product } from "../../../types";
import { useProductAddForm } from "../../hooks/useProductAddForm";
import { Controller } from "react-hook-form";

interface ProductAddFormProps {
	onProductAdd: (product: Product) => void;
	onComplete: () => void;
}

export function ProductAddForm({
	onProductAdd,
	onComplete,
}: ProductAddFormProps) {
	const {
		form: { control },
		handleAddNewProduct,
	} = useProductAddForm({
		onProductAdd,
	});

	const handleSubmit = () => {
		handleAddNewProduct();
		onComplete();
	};

	return (
		<form onSubmit={handleSubmit} className="mb-4 rounded bg-white p-4 shadow">
			<h3 className="mb-2 text-xl font-semibold">새 상품 추가</h3>
			<Controller
				control={control}
				name="name"
				render={({ field }) => (
					<div className="mb-2">
						<label
							htmlFor="productName"
							className="block text-sm font-medium text-gray-700"
						>
							상품명
						</label>
						<input
							id="productName"
							type="text"
							value={field.value}
							onChange={field.onChange}
							className="w-full rounded border p-2"
						/>
					</div>
				)}
			/>

			<Controller
				control={control}
				name="price"
				render={({ field }) => (
					<div className="mb-2">
						<label
							htmlFor="productPrice"
							className="block text-sm font-medium text-gray-700"
						>
							가격
						</label>
						<input
							id="productPrice"
							type="number"
							value={field.value}
							onChange={field.onChange}
							className="w-full rounded border p-2"
						/>
					</div>
				)}
			/>

			<Controller
				control={control}
				name="stock"
				render={({ field }) => (
					<div className="mb-2">
						<label
							htmlFor="productStock"
							className="block text-sm font-medium text-gray-700"
						>
							재고
						</label>
						<input
							id="productStock"
							type="number"
							value={field.value}
							onChange={field.onChange}
							className="w-full rounded border p-2"
						/>
					</div>
				)}
			/>

			<Button color="blue" className="w-full">
				추가
			</Button>
		</form>
	);
}
