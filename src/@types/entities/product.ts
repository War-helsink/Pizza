import type { Ingredient } from "./ingredient";

export interface ProductBase {
	id: number;
	name: string;
	imageUrl: string;

	categoryId: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface Product extends ProductBase {
	ingredients: Ingredient[];
	items: ProductItem<"base">[];
}

export interface ProductItemVariantType {
	full: ProductItemWithProduct;
	base: ProductItemBase;
}

export interface ProductItemBase {
	id: number;
	size: number | null;
	price: number;
	pizzaType: number | null;
	productId: number;
}

export interface ProductItemWithProduct extends ProductItemBase {
	product: Product;
}

export type ProductItem<T extends keyof ProductItemVariantType = "base"> =
	ProductItemVariantType[T];
