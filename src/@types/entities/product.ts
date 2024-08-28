import type { Ingredient } from "./ingredient";

export interface ProductBase {
	id: number;
	name: string;
	imageUrl: string;

	categoryId: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface ProductWithIngredients extends ProductBase {
	ingredients: Ingredient[];
}

export interface ProductWithItems extends ProductBase {
	items: ProductItem[];
}

export type Product =
	| ProductBase
	| ProductWithIngredients
	| ProductWithItems
	| (ProductWithItems & ProductWithIngredients);

export interface ProductItemBase {
	id: number;
	size: number | null;
	price: number;
	pizzaType: number | null;
	productId: number;
}

export interface ProductItem extends ProductItemBase {
	product?: Product;
}
