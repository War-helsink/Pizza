import type { Ingredient, ProductItem } from "@/@types/entities";

export interface ChoosePizzaFormProps {
	imageUrl: string;
	name: string;
	ingredients: Ingredient[];
	items: ProductItem[];
	isLoading?: boolean;
	onSubmit?: (itemId: number, ingredients: number[]) => void;
	className?: string;
}
