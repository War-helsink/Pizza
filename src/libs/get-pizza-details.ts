import { calcTotalPizzaPrice } from "./calc-total-pizza-price";
import type { ProductItem, Ingredient } from '@/@types/entities';
import { type PizzaSize, type PizzaType, mapPizzaType } from "@/config/pizza";

export const getPizzaDetails = (
	type: PizzaType,
	size: PizzaSize,
	items: ProductItem[],
	ingredients: Ingredient[],
	selectedIngredients: Set<number>,
) => {
	const totalPrice = calcTotalPizzaPrice(
		type,
		size,
		items,
		ingredients,
		selectedIngredients,
	);

	return { totalPrice, key: mapPizzaType[type] };
};
