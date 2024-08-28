import type { Product } from "./product";

export interface CategoryBase {
	id: number;
	key: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface CategoryWithProducts extends CategoryBase {
	products: Product[];
}

export type Category = CategoryBase | CategoryWithProducts;
