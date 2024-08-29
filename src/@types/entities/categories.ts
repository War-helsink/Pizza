import type { Product } from "./product";

export interface CategoryBase {
	id: number;
	key: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface Category extends CategoryBase {
	products: Product[];
}
