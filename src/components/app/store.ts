import { configureStore } from "@reduxjs/toolkit";
import { useSelector, useDispatch, useStore } from "react-redux";

import { cartsApi } from "@/components/entities/cart";
import { storiesApi } from "@/components/entities/stories";
import { productsApi } from "@/components/entities/products";
import { novaPoshtaApi } from "@/components/entities/novaposhta";
import { ingredientsApi } from "@/components/entities/ingredients";

import { rootReducer } from "./reducer";

export const makeStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(
				cartsApi.middleware,
				storiesApi.middleware,
				productsApi.middleware,
				novaPoshtaApi.middleware,
				ingredientsApi.middleware,
			),
	});
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
