import type { CartStateItem } from "@/libs/get-cart-details";

export interface CheckoutCartProps {
	items: CartStateItem[];
	onClickCountButton: (
		id: number,
		quantity: number,
		type: "plus" | "minus",
	) => void;
	removeCartItem: (id: number) => void;
	isLoading?: boolean;
	className?: string;
}

export interface CheckoutPersonalFormProps {
	className?: string;
}

export interface CheckoutAddressFormProps {
	className?: string;
}

export interface CheckoutSidebarProps {
	totalAmount: number;
	isLoading?: boolean;
	className?: string;
}
