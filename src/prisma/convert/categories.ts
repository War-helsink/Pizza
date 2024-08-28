import type { CategoryPrisma } from "@/@types/prisma";
import type { Category } from "@/@types/entities";
import { productsConvert } from "./products";

export const categoriesConvert: (categories: CategoryPrisma[]) => Category[] = (
	categories,
) => {
	return categories.map((category) => categoryConvert(category));
};

export const categoryConvert: (category: CategoryPrisma) => Category = (
	category,
) => {
	const { translations, products, ...args } = category;

	return {
		name: translations ? translations[0].name : "",
		products: products ? productsConvert(products) : undefined,
		...args,
	};
};
