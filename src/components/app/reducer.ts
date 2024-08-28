import { combineReducers } from "@reduxjs/toolkit";

import { categoriesReducer } from "@/components/entities/categories";
import { usersApi } from "@/components/entities/users";
import { storiesApi } from "@/components/entities/stories";
import { productsApi } from "@/components/entities/products";
import { ingredientsApi } from "@/components/entities/ingredients";

export const rootReducer = combineReducers({
	category: categoriesReducer,
	[usersApi.reducerPath]: usersApi.reducer,
	[storiesApi.reducerPath]: storiesApi.reducer,
	[productsApi.reducerPath]: productsApi.reducer,
	[ingredientsApi.reducerPath]: ingredientsApi.reducer,
});
