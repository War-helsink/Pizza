import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cartConvert } from "@/prisma/convert";

import type { CartPrisma } from "@/@types/prisma";
import type { Cart } from "@/@types/entities";
import { getCartDetails } from "@/libs/get-cart-details";
import { setItems, setTotalAmount } from "../model/slice";

export const cartsApi = createApi({
	reducerPath: "cartsApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
	endpoints: (builder) => ({
		getCartItems: builder.query<Cart, null>({
			query: () => {
				return {
					url: "cart",
				};
			},
			transformResponse: (cart: CartPrisma) => {
				return cartConvert(cart);
			},
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				const result = await queryFulfilled;
				const data = result.data;

				const { items, totalAmount } = getCartDetails(data);

				dispatch(setItems(items));
				dispatch(setTotalAmount(totalAmount));
			},
		}),
	}),
});

export const { useGetCartItemsQuery } = cartsApi;
