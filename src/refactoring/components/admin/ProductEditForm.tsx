import { Product } from "../../../types";
import { Button } from "../ui/Button";
import { Controller } from "react-hook-form";
import { useProductEditForm } from "../../hooks/useProductEditForm";

interface ProductEditFormProps {
	product: Product;
	onProductUpdate: (updatedProduct: Product) => void;
	onEditComplete: () => void;
}

export function ProductEditForm({
	product,
	onProductUpdate,
	onEditComplete,
}: ProductEditFormProps) {
	const {
		form: { control },
		newDiscount,
		handleEditComplete,
		handleAddDiscount,
		handleRemoveDiscount,
		handleChangeDiscountQuantity,
		handleChangeDiscountRate,
	} = useProductEditForm({
		product,
		onProductUpdate,
		onEditComplete,
	});

	return (
		<form onSubmit={handleEditComplete}>
			<Controller
				control={control}
				name="name"
				render={({ field }) => (
					<div className="mb-4">
						<label className="mb-1 block">상품명: </label>
						<input
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
					<div className="mb-4">
						<label className="mb-1 block">가격: </label>
						<input
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
					<div className="mb-4">
						<label className="mb-1 block">재고: </label>
						<input
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
				name="discounts"
				render={({ field }) => (
					<div>
						<h4 className="mb-2 text-lg font-semibold">할인 정보</h4>
						{field.value.map((discount, index) => (
							<div
								key={index}
								className="mb-2 flex items-center justify-between"
							>
								<span>
									{discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
								</span>
								<Button
									type="button"
									color="red"
									className="px-2 py-1"
									onClick={() => handleRemoveDiscount(index)}
								>
									삭제
								</Button>
							</div>
						))}
						<div className="flex space-x-2">
							<input
								type="number"
								placeholder="수량"
								value={newDiscount.quantity}
								onChange={handleChangeDiscountQuantity}
								className="w-1/3 rounded border p-2"
							/>
							<input
								type="number"
								placeholder="할인율 (%)"
								value={newDiscount.rate * 100}
								onChange={handleChangeDiscountRate}
								className="w-1/3 rounded border p-2"
							/>
							<Button
								type="button"
								color="blue"
								className="w-1/3"
								onClick={handleAddDiscount}
							>
								할인 추가
							</Button>
						</div>
					</div>
				)}
			/>

			<Button color="green" onClick={handleEditComplete}>
				수정 완료
			</Button>
		</form>
	);
}
