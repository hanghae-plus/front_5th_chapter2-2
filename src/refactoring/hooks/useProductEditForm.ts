import { useForm } from "react-hook-form";
import { z } from "zod";
import { Discount, Product } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const formSchema = z.object({
	id: z.string(),
	name: z.string(),
	price: z.number(),
	stock: z.number(),
	discounts: z.array(
		z.object({
			quantity: z.number(),
			rate: z.number(),
		}),
	),
});

interface UseProductEditFormProps {
	product: Product;
	onProductUpdate: (updatedProduct: Product) => void;
	onEditComplete: () => void;
}

export const useProductEditForm = ({
	product,
	onProductUpdate,
	onEditComplete,
}: UseProductEditFormProps) => {
	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: {
			id: product.id,
			name: product.name,
			price: product.price,
			stock: product.stock,
			discounts: product.discounts,
		},
		resolver: zodResolver(formSchema),
	});

	const [newDiscount, setNewDiscount] = useState<Discount>({
		quantity: 0,
		rate: 0,
	});

	const { getValues, setValue } = form;

	const handleEditComplete = () => {
		const updatedProduct = getValues();
		onProductUpdate(updatedProduct);
		onEditComplete();
	};

	const handleAddDiscount = () => {
		const currentDiscounts = getValues("discounts");
		setValue("discounts", [...currentDiscounts, newDiscount]);
		setNewDiscount({ quantity: 0, rate: 0 });
	};

	const handleRemoveDiscount = (index: number) => {
		const currentDiscounts = getValues("discounts");
		setValue(
			"discounts",
			currentDiscounts.filter((_, i) => i !== index),
		);
	};

	const handleChangeDiscountQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewDiscount({
      ...newDiscount,
      quantity: parseInt(e.target.value),
    })
	};

	const handleChangeDiscountRate = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewDiscount({
      ...newDiscount,
      rate: parseInt(e.target.value) / 100,
    })
	};

	return {
		form,
		newDiscount,
		setNewDiscount,
		handleEditComplete,
		handleAddDiscount,
		handleRemoveDiscount,
		handleChangeDiscountQuantity,
		handleChangeDiscountRate,
	};
};
