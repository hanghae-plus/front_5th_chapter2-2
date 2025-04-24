import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Coupon } from "../../types";

const formSchema = z.object({
	name: z.string(),
	code: z.string(),
	discountType: z.enum(["percentage", "amount"]),
	discountValue: z.number(),
});

interface UseCouponAddFormProps {
	onCouponAdd: (coupon: Coupon) => void;
}

export const useCouponAddForm = ({ onCouponAdd }: UseCouponAddFormProps) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			code: "",
			discountType: "percentage",
			discountValue: 0,
		},
	});

	const handleAddCoupon = () => {
		const data = form.getValues();
		onCouponAdd(data);
		form.reset();
	};

	return { form, handleAddCoupon };
};
