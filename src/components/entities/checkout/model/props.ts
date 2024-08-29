import type { CartItemProps } from "@/components/entities/cart";

export interface CheckoutItemProps extends CartItemProps {
	onClickCountButton?: (type: "plus" | "minus") => void;
	onClickRemove?: () => void;
	className?: string;
}

export interface CheckoutItemSkeletonProps {
	className?: string;
}

export interface CheckoutItemDetailsProps {
	title?: React.ReactNode;
	value?: React.ReactNode;
	className?: string;
}
