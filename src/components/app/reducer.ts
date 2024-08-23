import { combineReducers } from "@reduxjs/toolkit";

import { categoriesReducer } from "@/components/entities/categories";
import { userApi } from "@/components/entities/user";
import { categoriesApi } from "@/components/entities/categories";

export const rootReducer = combineReducers({
	category: categoriesReducer,
	[userApi.reducerPath]: userApi.reducer,
	[categoriesApi.reducerPath]: categoriesApi.reducer,
});
