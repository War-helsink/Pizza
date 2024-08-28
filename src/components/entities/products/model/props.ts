import type { Product, Ingredient } from "@/@types/entities";

export interface ProductCardProps {
	id: number;
	name: string;
	price: number;
	imageUrl: string;
	ingredients: Ingredient[];
	className?: string;
}

export interface ProductFormProps {
	isPizza: boolean;
	product: Product;
	onSubmit?: VoidFunction;
}
