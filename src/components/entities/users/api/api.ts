import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { User } from "@/@types/entities";
import type { UserParams } from "../model/types";

export const usersApi = createApi({
	reducerPath: "usersApi",
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

export const { useGetUserQuery, usePostUserQuery } = usersApi;
