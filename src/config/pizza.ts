export const mapPizzaSize = {
	20: "product.small",
	30: "product.medium",
	40: "product.large",
};

export const mapPizzaType = {
	1: "product.thinCrust",
	2: "product.traditional",
};

export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, key]) => ({
	key,
	value,
}));

export const pizzaTypes = Object.entries(mapPizzaType).map(([value, key]) => ({
	key,
	value,
}));

export type PizzaSize = keyof typeof mapPizzaSize;
export type PizzaType = keyof typeof mapPizzaType;
