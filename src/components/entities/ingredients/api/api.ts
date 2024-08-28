import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ingredientsConvert } from "@/prisma/convert";

import type { IngredientPrisma } from "@/@types/prisma";
import type { Ingredient } from "@/@types/entities";

export const ingredientsApi = createApi({
	reducerPath: "ingredientsApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
	endpoints: (builder) => ({
		getIngredients: builder.query<Ingredient[], null>({
			query: () => {
				return {
					url: "ingredients",
				};
			},
			transformResponse: (ingredients: IngredientPrisma[]) => {
				return ingredientsConvert(ingredients);
			},
		}),
	}),
});

export const { useGetIngredientsQuery } = ingredientsApi;
