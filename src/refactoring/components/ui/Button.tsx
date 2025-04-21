import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/cn";

const buttonVariants = cva("rounded", {
	variants: {
		color: {
			blue: "bg-blue-500 text-white p-2 hover:bg-blue-600",
			white: "bg-white text-blue-600 px-4 py-2 hover:bg-blue-100",
			green: "bg-green-500 text-white px-4 py-2 mb-4 hover:bg-green-600",
			red: "bg-red-500 text-white px-4 py-2 mb-4 hover:bg-red-600",
			gray: "bg-gray-300 text-gray-800 px-2 py-1 mr-1 hover:bg-gray-400",
		},
	},
	defaultVariants: {
		color: "blue",
	},
});

interface ButtonProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
		VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, color, children, ...props }, ref) => (
		<button
			className={cn(buttonVariants({ color, className }))}
			ref={ref}
			{...props}
		>
			{children}
		</button>
	)
);
