export interface CartItemProps {
	id: number;
	imageUrl: string;
	details: string;
	name: string;
	price: number;
	quantity: number;
	disabled?: boolean;
	className?: string;

	onClickCountButton?: (type: "plus" | "minus") => void;
	onClickRemove?: () => void;
}
