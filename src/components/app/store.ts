import { configureStore } from "@reduxjs/toolkit";
import { useSelector, useDispatch, useStore } from "react-redux";

import { userApi } from "@/components/entities/user";
import { categoriesApi } from "@/components/entities/categories";

import { rootReducer } from "./reducer";

export const makeStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(
				userApi.middleware,
				categoriesApi.middleware,
			),
	});
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
