import { combineReducers } from "@reduxjs/toolkit";

import { categoriesReducer } from "@/components/entities/categories";
import { cartsApi, cartsReducer } from "@/components/entities/cart";
import { storiesApi } from "@/components/entities/stories";
import { productsApi } from "@/components/entities/products";
import { novaPoshtaApi } from "@/components/entities/novaposhta";
import { ingredientsApi } from "@/components/entities/ingredients";

export const rootReducer = combineReducers({
	category: categoriesReducer,
	cart: cartsReducer,
	[cartsApi.reducerPath]: cartsApi.reducer,
	[storiesApi.reducerPath]: storiesApi.reducer,
	[productsApi.reducerPath]: productsApi.reducer,
	[novaPoshtaApi.reducerPath]: novaPoshtaApi.reducer,
	[ingredientsApi.reducerPath]: ingredientsApi.reducer,
});
