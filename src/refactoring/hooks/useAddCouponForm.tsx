import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Coupon } from "../../types";

const formSchema = z.object({
	name: z.string().min(1),
	code: z.string().min(1),
	discountType: z.enum(["percentage", "amount"]),
	discountValue: z.number().min(0),
});

interface AddCouponFormProps {
	onCouponAdd: (coupon: Coupon) => void;
}

export const useAddCouponForm = ({ onCouponAdd }: AddCouponFormProps) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			code: "",
			discountType: "percentage",
			discountValue: 0,
		},
	});

	const handleAddCoupon = (data: z.infer<typeof formSchema>) => {
		onCouponAdd(data);
		form.reset();
	};

	return { form, handleAddCoupon };
};
