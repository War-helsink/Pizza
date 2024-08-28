import type { CartItemPrisma } from "@/@types/prisma";
import type { CartItem } from "@/@types/entities";

export const calcCartItemTotalPricePrisma = (item: CartItemPrisma): number => {
	const ingredientsPrice = item.ingredients?.reduce(
		(acc, ingredient) => acc + ingredient.prices[0].price,
		0,
	);

	return (ingredientsPrice + item.productItem.prices[0].price) * item.quantity;
};

export const calcCartItemTotalPrice = (item: CartItem): number => {
	const ingredientsPrice = item.ingredients?.reduce(
		(acc, ingredient) => acc + ingredient.price,
		0,
	);

	return (ingredientsPrice + item.productItem.price) * item.quantity;
};
