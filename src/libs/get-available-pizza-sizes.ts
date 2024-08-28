import type { ProductItem } from "@/@types/entities";

import { pizzaSizes, type PizzaType } from "@/config/pizza";
import type { Variant } from "@/components/shared/ui";

export const getAvailablePizzaSizes = (
	type: PizzaType,
	items: ProductItem[],
): Variant[] => {
	const filteredPizzasByType = items.filter((item) => item.pizzaType === type);

	return pizzaSizes.map((item) => ({
		key: item.key,
		value: item.value,
		disabled: !filteredPizzasByType.some(
			(pizza) => Number(pizza.size) === Number(item.value),
		),
	}));
};
