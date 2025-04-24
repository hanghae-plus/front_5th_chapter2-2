// ToggleButton.tsx
import { ReactNode, useState } from "react";
import { Button, ButtonProps } from "./ui/Button";

interface ToggleButtonProps {
	color: ButtonProps["color"];
	showLabel: string;
	hideLabel: string;
	render: (onToggle: () => void) => ReactNode;
}

export const ToggleButton = ({
	color,
	showLabel,
	hideLabel,
	render,
}: ToggleButtonProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = () => setIsOpen(!isOpen);

	return (
		<div className="mb-4">
			<Button color={color} onClick={handleToggle}>
				{isOpen ? hideLabel : showLabel}
			</Button>
			{isOpen && render(handleToggle)}
		</div>
	);
};
