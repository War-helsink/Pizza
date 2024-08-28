import type { ProductPrisma, ProductItemPrisma } from "@/@types/prisma";
import type { Product, ProductItem } from "@/@types/entities";
import { ingredientsConvert } from "./ingredients";

export const productsConvert: (products: ProductPrisma[]) => Product[] = (
	products,
) => {
	return products.map((product) => productConvert(product));
};

export const productConvert: (product: ProductPrisma) => Product = (
	product,
) => {
	const { translations, items, ingredients, ...args } = product;

	return {
		name: translations ? translations[0].name : "",
		items: items ? productItemsConvert(items) : undefined,
		ingredients: ingredients ? ingredientsConvert(ingredients) : undefined,
		...args,
	};
};

export const productItemsConvert: (
	productItems: ProductItemPrisma[],
) => ProductItem[] = (productItems) => {
	return productItems.map((productItem) => productItemConvert(productItem));
};

export const productItemConvert: (
	productItem: ProductItemPrisma,
) => ProductItem = (productItem) => {
	const { prices, product, ...args } = productItem;
	return {
		product: product ? productConvert(product) : undefined,
		price: prices ? prices[0].price : 0,
		...args,
	};
};
