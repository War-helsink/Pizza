import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cartConvert } from "@/prisma/convert";

import type { CartPrisma } from "@/@types/prisma";
import type { Cart } from "@/@types/entities";
import { getCartDetails } from "@/libs/get-cart-details";
import { setItems, setTotalAmount } from "../model/slice";
import type {
	AddCartItemParams,
	UpdateItemQuantityParams,
	RemoveCartItemParams,
} from "../model/types";

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
		updateItemQuantity: builder.query<Cart, UpdateItemQuantityParams>({
			query: ({ id, quantity }) => {
				return {
					url: `cart/${id}`,
					method: "PATCH",
					params: {
						quantity,
					},
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
		removeCartItem: builder.query<Cart, RemoveCartItemParams>({
			query: ({ id }) => {
				return {
					url: `cart/${id}`,
					method: "DELETE",
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
		addCartItem: builder.query<Cart, AddCartItemParams>({
			query: ({ values }) => {
				return {
					url: "cart",
					method: "POST",
					params: values,
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

export const {
	useGetCartItemsQuery,
	useLazyAddCartItemQuery,
	useLazyRemoveCartItemQuery,
	useLazyUpdateItemQuantityQuery,
} = cartsApi;
