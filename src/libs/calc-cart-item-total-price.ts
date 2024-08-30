import type { CartItem } from "@/@types/entities";

export const calcCartItemTotalPrice = (item: CartItem): number => {
	const ingredientsPrice = item.ingredients?.reduce(
		(acc, ingredient) => acc + ingredient.price,
		0,
	);

	return (ingredientsPrice + item.productItem.price) * item.quantity;
};
