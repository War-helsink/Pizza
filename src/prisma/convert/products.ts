import type { ProductPrisma, ProductItemPrisma } from "@/@types/prisma";
import type {
	Product,
	ProductItem,
	ProductItemVariantType,
} from "@/@types/entities";
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
		items: items ? productItemsConvert(items) : [],
		ingredients: ingredients ? ingredientsConvert(ingredients) : [],
		...args,
	};
};

export const productItemsConvert: (
	productItems: ProductItemPrisma[],
) => ProductItem[] = (productItems) => {
	return productItems.map((productItem) => productItemConvert(productItem));
};

export const productItemConvert: <T extends keyof ProductItemVariantType = "base">(productItem: ProductItemPrisma) => ProductItem<T> = (productItem) => {
	const { prices, product, ...args } = productItem;

	if (product) {
		return {
			...args,
			price: prices ? prices[0].price : 0,
			product: productConvert(product),
		};
	}

	return {
		price: prices ? prices[0].price : 0,
		...args,
	} as any;
};
