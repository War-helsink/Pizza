import type {
	Product,
	ProductWithItems,
	ProductWithIngredients,
} from "@/@types/entities";

export interface ProductsGroupListProps {
	title: string;
	categoryId: number;

	items: (ProductWithItems & ProductWithIngredients)[];
	className?: string;
}

export interface ChooseProductFormProps {
	imageUrl: string;
	name: string;
	price: number;
	loading?: boolean;
	onSubmit?: VoidFunction;
	className?: string;
}

export interface ChooseProductModalProps {
	product: Product;
	className?: string;
}
