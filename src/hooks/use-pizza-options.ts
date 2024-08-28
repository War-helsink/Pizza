import type { PizzaSize, PizzaType } from "@/config/pizza";
import { useState, useEffect } from "react";
import type { Variant } from "@/components/shared/ui";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "@/libs/get-available-pizza-sizes";

import type { ProductItem } from "@/@types/entities";

interface ReturnProps {
	size: PizzaSize;
	type: PizzaType;
	selectedIngredients: Set<number>;
	availableSizes: Variant[];
	currentItemId?: number;
	setSize: (size: PizzaSize) => void;
	setType: (size: PizzaType) => void;
	addIngredient: (id: number) => void;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
	const [size, setSize] = useState<PizzaSize>(20);
	const [type, setType] = useState<PizzaType>(1);
	const [selectedIngredients, { toggle: addIngredient }] = useSet(
		new Set<number>([]),
	);

	const availableSizes = getAvailablePizzaSizes(type, items);

	const currentItemId = items.find(
		(item) => item.pizzaType === type && item.size === size,
	)?.id;

	useEffect(() => {
		const isAvailableSize = availableSizes?.find(
			(item) => Number(item.value) === size && !item.disabled,
		);
		const availableSize = availableSizes?.find((item) => !item.disabled);

		if (!isAvailableSize && availableSize) {
			setSize(Number(availableSize.value) as PizzaSize);
		}
	}, [type, size, availableSizes]);

	return {
		size,
		type,
		selectedIngredients,
		availableSizes,
		currentItemId,
		setSize,
		setType,
		addIngredient,
	};
};
