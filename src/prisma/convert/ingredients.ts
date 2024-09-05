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
	const { translations, ...args } = ingredient;
	return {
		name: translations ? translations[0].name : "",
		...args,
	};
};
