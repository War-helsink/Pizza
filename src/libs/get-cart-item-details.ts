import { type PizzaSize, type PizzaType, mapPizzaType } from "@/config/pizza";
import type { TFunction } from "i18next";

import type { CartStateItem } from "@/libs/get-cart-details";

export const getCartItemDetails = (
	ingredients: CartStateItem["ingredients"],
	translation: TFunction<"translation", undefined>,
	pizzaType?: PizzaType,
	pizzaSize?: PizzaSize,
): string => {
	const details = [];

	if (pizzaSize && pizzaType) {
		const key = mapPizzaType[pizzaType];
		const textDetails = translation("product.textDetails", {
			size: pizzaSize,
			name: translation(key),
		});

		details.push(textDetails);
	}

	if (ingredients) {
		details.push(...ingredients.map((ingredient) => ingredient.name));
	}

	return details.join(", ");
};
