import type { Product } from "@/@types/entities";

export interface ProductsGroupListProps {
	title: string;
	categoryId: number;

	items: Product[];
	className?: string;
}

export interface ChooseProductFormProps {
	imageUrl: string;
	name: string;
	price: number;
	isLoading?: boolean;
	onSubmit?: VoidFunction;
	className?: string;
}

export interface ChooseProductModalProps {
	product: Product;
	className?: string;
}
