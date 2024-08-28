import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Story } from "@/@types/entities";

export const storiesApi = createApi({
	reducerPath: "storiesApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
	endpoints: (builder) => ({
		getStories: builder.query<Story[], null>({
			query: () => {
				return {
					url: "stories",
				};
			},
		}),
	}),
});

export const { useGetStoriesQuery } = storiesApi;
