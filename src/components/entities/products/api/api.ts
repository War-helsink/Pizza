import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { productConvert } from "@/prisma/convert";
import type { ProductPrisma } from "@/@types/prisma";
import type { Product } from "@/@types/entities";

import type { ProductsSearchParams } from "../model/types";

export const productsApi = createApi({
	reducerPath: "productsApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
	endpoints: (builder) => ({
		getProductsSearch: builder.query<Product[], ProductsSearchParams>({
			query: ({ keywords }) => {
				return {
					url: "products/search",
					params: {
						keywords,
					},
				};
			},
			transformResponse: (products: ProductPrisma[]) => {
				return products.map((product) => productConvert(product));
			},
		}),
	}),
});

export const { useLazyGetProductsSearchQuery, useGetProductsSearchQuery } =
	productsApi;
