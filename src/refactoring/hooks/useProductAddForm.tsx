import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Product } from "../../types";

interface UseProductAddFormProps {
	onProductAdd: (product: Product) => void;
}

const formSchema = z.object({
	name: z.string(),
	price: z.number(),
	stock: z.number(),
});

export const useProductAddForm = ({ onProductAdd }: UseProductAddFormProps) => {
	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: {
			name: "",
			price: 0,
			stock: 0,
		},
		resolver: zodResolver(formSchema),
	});

	const handleAddNewProduct = () => {
		const productWithId = {
			...form.getValues(),
			discounts: [],
			id: Date.now().toString(),
		};
		onProductAdd(productWithId);
		form.reset();
	};

	return { form, handleAddNewProduct };
};
