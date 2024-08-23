import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { User, UserParams } from "../model/types";

export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
	endpoints: (builder) => ({
		getUser: builder.query<User[], null>({
			query: () => {
				return {
					url: "users",
				};
			},
		}),
		postUser: builder.query<User, UserParams>({
			query: (data) => {
				return {
					url: "users",
					method: "post",
					body: data,
				};
			},
		}),
	}),
});

export const { useGetUserQuery, usePostUserQuery } = userApi;
