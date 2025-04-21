import { Coupon } from "../../types";
import { Button } from "./ui/Button";
import { useAddCouponForm } from "../hooks/useAddCouponForm";
import { Controller } from "react-hook-form";

interface AddCouponFormProps {
	onCouponAdd: (coupon: Coupon) => void;
}

export function AddCouponForm({ onCouponAdd }: AddCouponFormProps) {
	const {
		form: { control },
		handleAddCoupon,
	} = useAddCouponForm({ onCouponAdd });

	return (
		<form onSubmit={handleAddCoupon} className="mb-4 space-y-2">
			<Controller
				control={control}
				name="name"
				render={({ field }) => (
					<input
						type="text"
						placeholder="쿠폰 이름"
						value={field.value}
						onChange={field.onChange}
						className="w-full rounded border p-2"
					/>
				)}
			/>
			<Controller
				control={control}
				name="code"
				render={({ field }) => (
					<input
						type="text"
						placeholder="쿠폰 코드"
						value={field.value}
						onChange={field.onChange}
						className="w-full rounded border p-2"
					/>
				)}
			/>
			<div className="flex gap-2">
				<Controller
					control={control}
					name="discountType"
					render={({ field }) => (
						<select
							value={field.value}
							onChange={field.onChange}
							className="w-full rounded border p-2"
						>
							<option value="amount">금액(원)</option>
							<option value="percentage">할인율(%)</option>
						</select>
					)}
				/>
				<Controller
					control={control}
					name="discountValue"
					render={({ field }) => (
						<input
							type="number"
							placeholder="할인 값"
							value={field.value}
							onChange={field.onChange}
							className="w-full rounded border p-2"
						/>
					)}
				/>
			</div>
			<Button type="submit" color="green" className="w-full">
				쿠폰 추가
			</Button>
		</form>
	);
}
