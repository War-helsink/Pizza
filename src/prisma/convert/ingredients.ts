import type { IngredientPrisma } from "@/@types/prisma";
import type { Ingredient } from "@/@types/entities";

export const ingredientsConvert: (
	ingredients: IngredientPrisma[],
) => Ingredient[] = (ingredients) => {
	return ingredients.map((ingredient) => ingredientConvert(ingredient));
};

export const ingredientConvert: (ingredient: IngredientPrisma) => Ingredient = (
	ingredient,
) => {
	const { translations, prices, ...args } = ingredient;
	return {
		name: translations ? translations[0].name : "",
		price: prices ? prices[0].price : 0,
		...args,
	};
};
