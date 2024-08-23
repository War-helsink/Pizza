import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { setCategories, setCategoryId } from "../model/slice";
import type { CategoryResponse, Category } from "../model/types";

export const categoriesApi = createApi({
	reducerPath: "categoriesApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
	endpoints: (builder) => ({
		getCategories: builder.query<Category[], null>({
			query: () => {
				return {
					url: "categories",
				};
			},
			transformResponse: (categories: CategoryResponse[]) => {
				const newCategories = categories.map((category) => {
					const { translations, ...args } = category;

					return {
						name: translations[0].name,
						...args,
					};
				});

				return newCategories;
			},
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				const result = await queryFulfilled;
				const data = result.data;

				dispatch(setCategories(data));
				dispatch(setCategoryId(data[0].id));
			},
		}),
	}),
});

export const { useGetCategoriesQuery } = categoriesApi;
