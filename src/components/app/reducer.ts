import { combineReducers } from "@reduxjs/toolkit";

import { categoriesReducer } from "@/components/entities/categories";
import { cartsApi, cartsReducer } from "@/components/entities/cart";
import { usersApi } from "@/components/entities/users";
import { storiesApi } from "@/components/entities/stories";
import { productsApi } from "@/components/entities/products";
import { ingredientsApi } from "@/components/entities/ingredients";

export const rootReducer = combineReducers({
	category: categoriesReducer,
	cart: cartsReducer,
	[cartsApi.reducerPath]: cartsApi.reducer,
	[usersApi.reducerPath]: usersApi.reducer,
	[storiesApi.reducerPath]: storiesApi.reducer,
	[productsApi.reducerPath]: productsApi.reducer,
	[ingredientsApi.reducerPath]: ingredientsApi.reducer,
});
