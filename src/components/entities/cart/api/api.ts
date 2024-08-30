import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cartConvert } from "@/prisma/convert";
import type { RootState } from "@/components/app/store";

import type { CartPrisma } from "@/@types/prisma";
import type { Cart } from "@/@types/entities";
import { getCartDetails } from "@/libs/get-cart-details";
import { setAll, setItems, setLoading } from "../model/slice";
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
				dispatch(setLoading(true));

				const result = await queryFulfilled;
				const data = result.data;

				const { items, totalAmount } = getCartDetails(data);

				dispatch(setAll({ items, totalAmount, isLoading: false }));
			},
		}),
		updateItemQuantity: builder.query<Cart, UpdateItemQuantityParams>({
			query: ({ id, quantity }) => {
				return {
					url: `cart/${id}`,
					method: "PATCH",
					body: {
						quantity,
					},
				};
			},
			transformResponse: (cart: CartPrisma) => {
				return cartConvert(cart);
			},
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				dispatch(setLoading(true));

				const result = await queryFulfilled;
				const data = result.data;

				const { items, totalAmount } = getCartDetails(data);

				dispatch(setAll({ items, totalAmount, isLoading: false }));
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
			async onQueryStarted({ id }, { dispatch, queryFulfilled, getState }) {
				const currentItems = (getState() as RootState).cart.items;
				dispatch(setLoading(true));
				dispatch(
					setItems(
						currentItems.map((item) =>
							item.id === id ? { ...item, disabled: true } : item,
						),
					),
				);

				const result = await queryFulfilled;
				const data = result.data;

				const { items, totalAmount } = getCartDetails(data);

				dispatch(setAll({ items, totalAmount, isLoading: false }));
			},
		}),
		addCartItem: builder.query<Cart, AddCartItemParams>({
			query: ({ values }) => {
				return {
					url: "cart",
					method: "POST",
					body: values,
				};
			},
			transformResponse: (cart: CartPrisma) => {
				return cartConvert(cart);
			},
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				dispatch(setLoading(true));

				const result = await queryFulfilled;
				const data = result.data;

				const { items, totalAmount } = getCartDetails(data);

				dispatch(setAll({ items, totalAmount, isLoading: false }));
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
